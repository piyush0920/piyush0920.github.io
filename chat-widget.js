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

  // Discover the FastAPI request schema with a bounded timeout. If unavailable,
  // use the existing JSON query contract. Never retry generation automatically.
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

  async function discoverChatContract(signal) {
    if (!chatContractPromise) {
      chatContractPromise = (async () => {
        const fallback = { bodySchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] }, queryParams: [] };
        const controller = new AbortController();
        const abort = () => controller.abort();
        signal?.addEventListener("abort", abort, { once: true });
        if (signal?.aborted) controller.abort();
        const timeout = window.setTimeout(abort, 5000);
        try {
          const response = await fetch(`${CHAT_API_BASE}/openapi.json`, { signal: controller.signal, headers: { Accept: "application/json" } });
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
        } finally {
          window.clearTimeout(timeout);
          signal?.removeEventListener("abort", abort);
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
    const contract = await discoverChatContract(signal);
    const body = buildChatBody(contract.bodySchema, query);
    const requestUrl = new URL(`${CHAT_API_BASE}/chat`);
    for (const parameter of contract.queryParams) {
      const value = valueForMissingField("query", parameter.name, query, contract, body);
      if (value !== undefined && value !== null) requestUrl.searchParams.set(parameter.name, String(value));
    }
    const options = { method: "POST", headers: { Accept: "application/json" }, signal };
    if (contract.bodySchema) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    // One submitted question produces at most one generation request.
    // Validation failures are shown instead of retrying with guessed fields.
    const response = await fetch(requestUrl.toString(), options);
    const data = await readResponseJson(response);
    return { response, data, validationErrors: collectValidationErrors(data) };
  }

  async function readResponseJson(response) {
    try { return await response.json(); } catch { return {}; }
  }

  function apiErrorText(data, status) {
    if (status === 429) return "The assistant is busy. Please wait a moment before trying again.";
    if (status === 422 || collectValidationErrors(data).length) return "The assistant couldn't process that question. You can explore the project pages or contact Piyush directly.";
    return "The assistant is temporarily unavailable. Please try again later, or explore the portfolio pages.";
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
          <div class="ask-ai-title-wrap"><div class="ask-ai-title">Ask Piyush AI</div><div class="ask-ai-subtitle"><span class="ask-ai-online"></span>Portfolio assistant · AI demo</div></div>
          <button class="ask-ai-clear" type="button" aria-label="Clear conversation">Clear</button>
          <button class="ask-ai-close" type="button" aria-label="Close chat">×</button>
        </header>
        <div class="ask-ai-messages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text"></div>
        <form class="ask-ai-composer">
          <textarea class="ask-ai-input" rows="1" maxlength="1200" placeholder="Ask about projects, skills, experience…" aria-label="Your question"></textarea>
          <button class="ask-ai-send" type="submit" aria-label="Send message">${icon("send")}</button>
        </form>
        <div class="ask-ai-footnote">Hosted AI demo · Check details against the portfolio.</div>
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

    function openPanel() { panel.classList.add("open"); launcher.setAttribute("aria-expanded", "true"); if (!busy) input.focus(); }
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
      const article = addMessage("assistant", "Hi, I'm Ask Piyush AI. Ask about Piyush's projects, insurance operations experience or technical skills. Questions are sent to a hosted AI service, and answers may be incomplete.");
      const suggestions = document.createElement("div"); suggestions.className = "ask-ai-suggestions";
      ["Show the analytics and BI projects", "What is Piyush's insurance experience?", "How was this assistant built?"].forEach((label) => {
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
      if (query.length > 1200) { addMessage("assistant", "Please keep your question under 1,200 characters."); return; }
      openPanel();
      addMessage("user", query);
      input.value = ""; input.style.height = "auto";
      if (!API_CONFIGURED) {
        addMessage("assistant", "The assistant is unavailable in this version. Please explore the portfolio pages or contact Piyush directly.");
        return;
      }
      busy = true; send.disabled = true; input.disabled = true; root.querySelector(".ask-ai-clear").disabled = true; form.setAttribute("aria-busy", "true");
      const typing = addTyping();
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 45000);
      try {
        const { response, data, validationErrors = [] } = await postChatQuery(query, controller.signal);
        typing.remove();
        if (!response.ok || validationErrors.length) {
          if (response.status === 429) {
            addMessage("assistant", apiErrorText(data, 429));
          } else {
            addMessage("assistant", apiErrorText(data, response.status === 200 ? 422 : response.status));
          }
        } else {
          const answerText = answerToText(data.answer ?? data.response ?? data.message ?? data.result ?? data);
          const sourceList = Array.isArray(data.sources) ? data.sources.map(source => typeof source === "string" ? source : source?.file_name || source?.source || source?.name || "").filter(Boolean) : [];
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
        window.clearTimeout(timer); busy = false; send.disabled = false; input.disabled = false; root.querySelector(".ask-ai-clear").disabled = false; form.setAttribute("aria-busy", "false"); if (panel.classList.contains("open")) input.focus();
      }
    }

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-chat]");
      if (!trigger) return;
      event.preventDefault();
      openPanel();
      const prompt = trigger.getAttribute("data-chat-prompt");
      if (prompt) {
        input.value = prompt;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    launcher.addEventListener("click", () => panel.classList.contains("open") ? closePanel() : openPanel());
    close.addEventListener("click", closePanel);
    root.querySelector(".ask-ai-clear").addEventListener("click", () => { if (busy) return; messages.replaceChildren(); addWelcome(); input.value = ""; input.focus(); });
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
