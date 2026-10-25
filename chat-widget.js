/* Ask Piyush AI — floating portfolio chatbot.
   Set CHAT_API_BASE to the public Cloud Run service URL (without a trailing slash). */
(() => {
  const CHAT_API_BASE = "https://ask-piyush-ai-44ufu2jwiq-el.a.run.app".replace(/\/+$/, "");
  const API_CONFIGURED = /^https:\/\//i.test(CHAT_API_BASE);

  const icon = (name) => name === "chat"
    ? '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.2-.67L4 20l1.53-4.12A7.5 7.5 0 1 1 20 11.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-7 7 7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function appendInline(parent, text) {
    const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)|(\*\*(.+?)\*\*)/g;
    let last = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > last) parent.append(document.createTextNode(text.slice(last, match.index)));
      if (match[1] && match[2]) {
        const a = document.createElement("a");
        a.href = match[2]; a.textContent = match[1]; a.target = "_blank"; a.rel = "noopener noreferrer";
        parent.append(a);
      } else if (match[3]) {
        let url = match[3];
        const trailing = (url.match(/[.,!?;:)\]]+$/) || [""])[0];
        url = url.slice(0, url.length - trailing.length);
        if (url) {
          const a = document.createElement("a");
          a.href = url; a.textContent = url; a.target = "_blank"; a.rel = "noopener noreferrer";
          parent.append(a);
        }
        if (trailing) parent.append(document.createTextNode(trailing));
      } else if (match[4]) {
        const strong = document.createElement("strong");
        strong.textContent = match[5]; parent.append(strong);
      }
      last = pattern.lastIndex;
    }
    if (last < text.length) parent.append(document.createTextNode(text.slice(last)));
  }

  // Normalise the API's answer into readable text. Some API response shapes
  // wrap the answer in an object; String(object) would display "[object Object]".
  function answerToText(value, depth = 0) {
    if (depth > 8 || value === null || value === undefined) return "";

    if (typeof value === "string") {
      const trimmed = value.trim();
      // Some wrappers serialize a JSON response into a string. Unwrap that too.
      if ((trimmed.startsWith("{") && trimmed.endsWith("}")) ||
          (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed && typeof parsed === "object") {
            const extracted = answerToText(parsed, depth + 1);
            if (extracted) return extracted;
          }
        } catch { /* Ordinary prose, not serialized JSON. */ }
      }
      return value;
    }

    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) {
      return value.map(item => answerToText(item, depth + 1)).filter(Boolean).join("\n");
    }

    if (typeof value === "object") {
      for (const key of ["answer", "text", "content", "message", "output", "response", "result", "data", "detail"]) {
        if (value[key] !== undefined && value[key] !== null) {
          const extracted = answerToText(value[key], depth + 1);
          if (extracted) return extracted;
        }
      }
      // Never stringify the whole object: that is what creates [object Object].
      const primitiveFields = Object.entries(value)
        .filter(([, item]) => item !== null && item !== undefined &&
          ["string", "number", "boolean"].includes(typeof item))
        .map(([key, item]) => `${key}: ${String(item)}`);
      return primitiveFields.join("\n");
    }

    return "";
  }

  function renderAnswer(container, answer) {
    const normalized = answerToText(answer);
    const safeText = normalized || "I couldn't find a readable answer just now.";
    const lines = safeText.replace(/\r/g, "").split("\n");
    let block = null;
    let blockType = "";
    lines.forEach((line) => {
      const bullet = line.match(/^\s*(?:[-*•])\s+(.+)$/);
      if (!line.trim()) { block = null; blockType = ""; return; }
      if (bullet) {
        if (blockType !== "ul") { block = document.createElement("ul"); container.append(block); blockType = "ul"; }
        const li = document.createElement("li"); appendInline(li, bullet[1]); block.append(li); return;
      }
      if (blockType !== "p") { block = document.createElement("p"); container.append(block); blockType = "p"; }
      else block.append(document.createElement("br"));
      appendInline(block, line.replace(/^\s+/, ""));
    });
  }

  // Discover and honor the deployed FastAPI request contract. We build all required
  // body fields (not just one guessed field), support query parameters, and use
  // validation details to adapt if the live API schema differs from the cached copy.
  let chatContractPromise = null;

  function resolveOpenApiSchema(schema, spec, depth = 0) {
    if (!schema || depth > 10) return {};
    if (schema.$ref) {
      const name = schema.$ref.split("/").pop().replace(/~1/g, "/").replace(/~0/g, "~");
      return resolveOpenApiSchema(spec.components?.schemas?.[name], spec, depth + 1);
    }
    let merged = { ...schema };
    if (Array.isArray(schema.allOf)) {
      merged = { ...schema, type: schema.type || "object", properties: { ...(schema.properties || {}) }, required: [...(schema.required || [])] };
      for (const part of schema.allOf) {
        const resolved = resolveOpenApiSchema(part, spec, depth + 1);
        Object.assign(merged.properties, resolved.properties || {});
        merged.required.push(...(resolved.required || []));
      }
      merged.required = [...new Set(merged.required)];
    }
    for (const key of ["oneOf", "anyOf"]) {
      if (Array.isArray(schema[key])) {
        const resolved = schema[key].map(part => resolveOpenApiSchema(part, spec, depth + 1))
          .find(part => part && (part.properties || part.type));
        if (resolved) return { ...merged, ...resolved };
      }
    }
    return merged;
  }

  async function discoverChatContract() {
    if (!chatContractPromise) {
      chatContractPromise = (async () => {
        const fallback = { bodySchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] }, queryParams: [] };
        try {
          const response = await fetch(`${CHAT_API_BASE}/openapi.json`, { headers: { Accept: "application/json" } });
          if (!response.ok) return fallback;
          const spec = await response.json();
          const operation = spec.paths?.["/chat"]?.post;
          if (!operation) return fallback;
          const rawBodySchema = operation.requestBody?.content?.["application/json"]?.schema;
          const bodySchema = rawBodySchema ? resolveOpenApiSchema(rawBodySchema, spec) : null;
          const queryParams = Array.isArray(operation.parameters)
            ? operation.parameters.filter(p => p?.in === "query" && p?.required).map(p => ({ name: p.name, schema: resolveOpenApiSchema(p.schema || {}, spec) }))
            : [];
          // If schema metadata is incomplete, prefer the documented JSON `query` body
          // contract rather than sending an empty POST.
          if (!bodySchema && queryParams.length === 0) return fallback;
          return { bodySchema: bodySchema || null, queryParams };
        } catch {
          return fallback;
        }
      })();
    }
    return chatContractPromise;
  }

  const queryFieldNames = ["query", "question", "message", "prompt", "input", "text", "user_query", "user_message", "user_input"];

  function defaultForSchema(name, schema = {}, query = "", queryField = false) {
    if (queryField) return query;
    if (schema.default !== undefined) return schema.default;
    if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum[0];
    const n = String(name || "").toLowerCase();
    if (/(top_k|topk|limit|num_results|k)$/.test(n)) return 4;
    if (/^(history|messages|documents|context|items)$/.test(n)) return [];
    if (schema.type === "integer" || schema.type === "number") return schema.minimum ?? 0;
    if (schema.type === "boolean") return false;
    if (schema.type === "array") return [];
    if (schema.type === "object") return {};
    if (schema.type === "string") return "";
    return null;
  }

  function preferredQueryField(properties = {}, required = []) {
    for (const name of queryFieldNames) {
      if (Object.prototype.hasOwnProperty.call(properties, name)) return name;
    }
    const requiredStrings = required.filter(name => properties[name]?.type === "string");
    if (requiredStrings.length === 1) return requiredStrings[0];
    const stringFields = Object.keys(properties).filter(name => properties[name]?.type === "string");
    if (stringFields.length === 1) return stringFields[0];
    return required[0] || stringFields[0] || Object.keys(properties)[0] || "query";
  }

  function buildChatBody(schema, query, depth = 0) {
    if (!schema || depth > 8) return { query };
    if (schema.type === "string") return query;
    const properties = schema.properties || {};
    const required = Array.isArray(schema.required) ? schema.required : [];
    const queryField = preferredQueryField(properties, required);
    const objectChildren = Object.keys(properties).filter(key => properties[key]?.type === "object");
    // Some wrappers nest the actual request model under a required object field.
    if (!queryField || (queryField === required[0] && properties[queryField]?.type === "object" && !Object.keys(properties).some(key => queryFieldNames.includes(key)))) {
      const nestedField = objectChildren.find(key => required.includes(key)) || objectChildren[0];
      if (nestedField) {
        const body = {};
        for (const key of required) {
          body[key] = key === nestedField
            ? buildChatBody(properties[key], query, depth + 1)
            : defaultForSchema(key, properties[key] || {}, query, false);
        }
        body[nestedField] = buildChatBody(properties[nestedField], query, depth + 1);
        return body;
      }
    }
    const keys = new Set([...required, queryField]);
    const body = {};
    for (const key of keys) {
      const childSchema = properties[key] || {};
      const isQueryField = key === queryField || queryFieldNames.includes(key);
      body[key] = childSchema.type === "object"
        ? buildChatBody(childSchema, query, depth + 1)
        : defaultForSchema(key, childSchema, query, isQueryField);
    }
    if (!Object.keys(body).length) body.query = query;
    return body;
  }

  function collectValidationErrors(data) {
    const pools = [data?.detail, data?.answer, data?.error, data?.response, data?.result];
    for (const candidate of pools) {
      if (Array.isArray(candidate) && candidate.some(item => item && typeof item === "object" && (item.type || item.msg || item.loc))) return candidate;
      if (candidate && typeof candidate === "object" && (candidate.type || candidate.msg || candidate.loc)) return [candidate];
      if (candidate && typeof candidate === "object" && Array.isArray(candidate.detail)) return candidate.detail;
    }
    return [];
  }

  function valueForMissingField(location, field, query, contract, body) {
    const schema = contract.bodySchema?.properties?.[field] || {};
    const name = String(field || "").toLowerCase();
    const likelyQuery = queryFieldNames.includes(name) || /(query|question|prompt|message|input|text)/.test(name);
    if (location === "body") {
      if (likelyQuery) return query;
      if (Object.prototype.hasOwnProperty.call(body, field)) return body[field];
      return defaultForSchema(field, schema, query, false);
    }
    const parameter = contract.queryParams.find(p => p.name === field);
    if (likelyQuery) return query;
    return defaultForSchema(field, parameter?.schema || {}, query, false);
  }

  async function postChatQuery(query, signal) {
    const contract = await discoverChatContract();
    let body = buildChatBody(contract.bodySchema, query);
    let params = {};
    for (const parameter of contract.queryParams) {
      params[parameter.name] = valueForMissingField("query", parameter.name, query, contract, body);
    }
    let lastResult = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      const requestUrl = new URL(`${CHAT_API_BASE}/chat`);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) requestUrl.searchParams.set(key, String(value));
      });
      const options = { method: "POST", headers: { Accept: "application/json" }, signal };
      if (contract.bodySchema) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }
      const response = await fetch(requestUrl.toString(), options);
      const data = await readResponseJson(response);
      const validationErrors = collectValidationErrors(data);
      lastResult = { response, data, validationErrors };

      // Some wrapper handlers incorrectly serialize a validation error with HTTP 200.
      const looksLikeMissingField = validationErrors.some(error => error?.type === "missing" && error?.msg === "Field required");
      if (response.ok && !looksLikeMissingField) return lastResult;
      if (response.status !== 422 && !looksLikeMissingField) return lastResult;

      let changed = false;
      for (const error of validationErrors) {
        if (!error || error.type !== "missing" || !Array.isArray(error.loc)) continue;
        const location = error.loc[0];
        const field = error.loc[1];
        if (location === "body" && typeof field === "string") {
          const value = valueForMissingField("body", field, query, contract, body);
          if (body && typeof body === "object" && body[field] !== value) { body[field] = value; changed = true; }
        } else if (location === "query" && typeof field === "string") {
          const value = valueForMissingField("query", field, query, contract, body);
          if (params[field] !== value) { params[field] = value; changed = true; }
        }
      }
      // If the response omits locations, try a short list of common field names
      // while preserving already supplied fields. FastAPI ignores extra model keys by default.
      if (!changed && attempt < 4) {
        if (contract.bodySchema && typeof body === "object" && body !== null) {
          // When an error wrapper omits `loc`, try alternate common query-field
          // names without replacing fields already present in the payload.
          const nextField = queryFieldNames.find(name => body[name] !== query) || `query_${attempt + 1}`;
          if (body[nextField] !== query) { body[nextField] = query; changed = true; }
        } else if (!contract.bodySchema) {
          const nextField = queryFieldNames.find(name => params[name] !== query) || `query_${attempt + 1}`;
          if (params[nextField] !== query) { params[nextField] = query; changed = true; }
        }
      }
      if (!changed) break;
    }
    return lastResult || { response: { ok: false, status: 0 }, data: {}, validationErrors: [] };
  }

  async function readResponseJson(response) {
    try { return await response.json(); } catch { return {}; }
  }

  function apiErrorText(data, status) {
    const errors = collectValidationErrors(data);
    if (errors.length) {
      const messages = errors.map(error => {
        const loc = Array.isArray(error?.loc) ? error.loc.filter(part => part !== "body").join(" → ") : "";
        const message = typeof error?.msg === "string" ? error.msg : "Invalid request";
        return loc ? `${message} (${loc})` : message;
      });
      return `The chat API rejected the request${status ? ` (${status})` : ""}: ${messages.join("; ")}.`;
    }
    if (typeof data?.detail === "string") return data.detail;
    return `The chat service returned an error${status ? ` (${status})` : ""}. Please try again in a moment.`;
  }

  function init() {
    if (document.getElementById("ask-piyush-ai-widget")) return;
    const root = document.createElement("div");
    root.id = "ask-piyush-ai-widget";
    root.innerHTML = `
      <button class="ask-ai-launcher" type="button" aria-label="Open Ask Piyush AI chat" aria-expanded="false" aria-controls="ask-ai-panel">
        ${icon("chat")}<span class="ask-ai-launcher-label">Ask Piyush AI</span>
      </button>
      <section id="ask-ai-panel" class="ask-ai-panel" role="dialog" aria-label="Ask Piyush AI" aria-modal="false">
        <header class="ask-ai-header">
          <div class="ask-ai-avatar" aria-hidden="true">PS<span>.</span></div>
          <div class="ask-ai-title-wrap"><div class="ask-ai-title">Ask Piyush AI</div><div class="ask-ai-subtitle"><span class="ask-ai-online"></span>Portfolio assistant · RAG-powered</div></div>
          <button class="ask-ai-close" type="button" aria-label="Close chat">×</button>
        </header>
        <div class="ask-ai-messages" aria-live="polite" aria-relevant="additions text"></div>
        <form class="ask-ai-composer">
          <textarea class="ask-ai-input" rows="1" maxlength="1200" placeholder="Ask about projects, skills, experience…" aria-label="Your question"></textarea>
          <button class="ask-ai-send" type="submit" aria-label="Send message">${icon("send")}</button>
        </form>
        <div class="ask-ai-footnote">Answers are based on Piyush's portfolio knowledge base.</div>
      </section>`;
    document.body.append(root);

    const launcher = root.querySelector(".ask-ai-launcher");
    const panel = root.querySelector(".ask-ai-panel");
    const close = root.querySelector(".ask-ai-close");
    const messages = root.querySelector(".ask-ai-messages");
    const form = root.querySelector(".ask-ai-composer");
    const input = root.querySelector(".ask-ai-input");
    const send = root.querySelector(".ask-ai-send");
    let busy = false;

    function openPanel() { panel.classList.add("open"); launcher.setAttribute("aria-expanded", "true"); window.setTimeout(() => input.focus(), 60); }
    function closePanel() { panel.classList.remove("open"); launcher.setAttribute("aria-expanded", "false"); launcher.focus(); }
    function scrollBottom() { messages.scrollTop = messages.scrollHeight; }

    function addMessage(role, answer, sources = []) {
      const article = document.createElement("article");
      article.className = `ask-ai-message ${role}`;
      const bubble = document.createElement("div");
      bubble.className = "ask-ai-bubble";
      renderAnswer(bubble, answer);
      article.append(bubble);
      if (role === "assistant" && Array.isArray(sources) && sources.length) {
        const sourceBox = document.createElement("div"); sourceBox.className = "ask-ai-sources";
        sourceBox.append(document.createTextNode("Sources "));
        [...new Set(sources)].forEach((source) => {
          const tag = document.createElement("span"); tag.className = "ask-ai-source-tag"; tag.textContent = String(source); sourceBox.append(tag);
        });
        article.append(sourceBox);
      }
      messages.append(article); scrollBottom(); return article;
    }

    function addWelcome() {
      const article = addMessage("assistant", "Hi, I'm Ask Piyush AI. Ask me about Piyush's projects, professional experience, technical skills, or personal interests.");
      const suggestions = document.createElement("div"); suggestions.className = "ask-ai-suggestions";
      ["List Piyush's projects", "Explain the Hybrid RAG project", "What are Piyush's skills?"].forEach((label) => {
        const button = document.createElement("button"); button.className = "ask-ai-suggestion"; button.type = "button"; button.textContent = label;
        button.addEventListener("click", () => sendQuery(label)); suggestions.append(button);
      });
      article.append(suggestions); scrollBottom();
    }

    function addTyping() {
      const article = document.createElement("article"); article.className = "ask-ai-message assistant"; article.setAttribute("aria-label", "Assistant is responding");
      const bubble = document.createElement("div"); bubble.className = "ask-ai-bubble ask-ai-typing";
      bubble.innerHTML = "<span></span><span></span><span></span>"; article.append(bubble); messages.append(article); scrollBottom(); return article;
    }

    async function sendQuery(value) {
      const query = String(value || "").trim();
      if (!query || busy) return;
      openPanel();
      addMessage("user", query);
      input.value = ""; input.style.height = "auto";
      if (!API_CONFIGURED) {
        addMessage("assistant", "The chat API URL is not configured in this version of the portfolio. Please refresh the page or check the deployed chat-widget.js file.");
        return;
      }
      busy = true; send.disabled = true; input.disabled = true;
      const typing = addTyping();
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 60000);
      try {
        const { response, data, validationErrors = [] } = await postChatQuery(query, controller.signal);
        typing.remove();
        if (!response.ok || validationErrors.some(error => error?.type === "missing" && error?.msg === "Field required")) {
          if (response.status === 429) {
            addMessage("assistant", typeof data.detail === "string" ? data.detail : "The chat is receiving too many requests right now. Please wait a little and try again.");
          } else {
            addMessage("assistant", apiErrorText(data, response.status === 200 ? 422 : response.status));
          }
        } else {
          const answerText = answerToText(data.answer ?? data.response ?? data.message ?? data.result ?? data);
          const sourceList = Array.isArray(data.sources) ? data.sources : [];
          addMessage(
            "assistant",
            answerText || "I couldn't find a readable response. Please try rephrasing your question.",
            sourceList
          );
        }
      } catch (error) {
        typing.remove();
        addMessage("assistant", error && error.name === "AbortError" ? "That request took too long. Please try again." : "I couldn't connect to the chat service. Please try again shortly.");
      } finally {
        window.clearTimeout(timer); busy = false; send.disabled = false; input.disabled = false; input.focus();
      }
    }

    launcher.addEventListener("click", () => panel.classList.contains("open") ? closePanel() : openPanel());
    close.addEventListener("click", closePanel);
    form.addEventListener("submit", (event) => { event.preventDefault(); sendQuery(input.value); });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); }
    });
    input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = `${Math.min(input.scrollHeight, 100)}px`; });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && panel.classList.contains("open")) closePanel(); });
    addWelcome();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
