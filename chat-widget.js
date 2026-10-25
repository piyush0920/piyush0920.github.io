/* Ask Piyush AI — floating portfolio chatbot.
   Set CHAT_API_BASE to the public Cloud Run service URL (without a trailing slash). */
(() => {
  const CHAT_API_BASE = (window.ASK_PIYUSH_AI_API_URL || "https://ask-piyush-ai-44ufu2jwiq-el.a.run.app").replace(/\/+$/, "");
  const API_CONFIGURED = /^https:\/\//i.test(CHAT_API_BASE) && !CHAT_API_BASE.includes("https://ask-piyush-ai-44ufu2jwiq-el.a.run.app");

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
        addMessage("assistant", "The chat widget is installed, but the Cloud Run API URL hasn't been configured yet. Set `CHAT_API_BASE` near the top of `chat-widget.js` to your service URL, then redeploy the portfolio site.");
        return;
      }
      busy = true; send.disabled = true; input.disabled = true;
      const typing = addTyping();
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 60000);
      try {
        const response = await fetch(`${CHAT_API_BASE}/chat`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }), signal: controller.signal
        });
        let data = {};
        try { data = await response.json(); } catch { /* Non-JSON error response */ }
        typing.remove();
        if (!response.ok) {
          if (response.status === 429) addMessage("assistant", data.detail || "The chat is receiving too many requests right now. Please wait a little and try again.");
          else addMessage("assistant", data.detail || `The chat service returned an error (${response.status}). Please try again in a moment.`);
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
