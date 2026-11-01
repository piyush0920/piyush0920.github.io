# Piyush Sharma — Data, with context.

A responsive, editorial-style portfolio for **Data Analytics, Business Intelligence, Data Science and applied GenAI**. Built with HTML, CSS and vanilla JavaScript for GitHub Pages.

## Root files (names retained)
- `index.html` — portfolio homepage.
- `project.html` — reusable project case-study page (`?project=namma`, `?project=collision`, `?project=rag`, etc.).
- `ask-piyush-ai.html` — standalone landing page for the portfolio chatbot.
- `style.css` — bespoke editorial visual system with dark and light modes.
- `script.js` — portfolio content, project filters, case studies, theme persistence, resume modal and reveal behaviour.
- `chat-widget.js` — floating Ask Piyush AI interface connected to the deployed FastAPI service.
- `robots.txt`, `sitemap.xml` — search-engine support.

## Assets retained
- `assets/resume-data-analytics.pdf` and `assets/resume-genai.pdf` — two resume versions.
- `assets/projects/` — existing Namma Yatri dashboard views and project-card snapshots.
- `assets/projects/cards/collision.svg` — California Traffic Collision project visual.
- `assets/favicon.svg` and `assets/og-image.png` — site metadata assets.

## Publish on GitHub Pages
Upload the contents of this package to the root of `piyush0920/piyush0920.github.io`, replacing files with the same names. Keep the `assets/` folders intact. GitHub Pages should publish from the `main` branch and repository root.

## Pages
- `https://piyush0920.github.io/`
- `https://piyush0920.github.io/ask-piyush-ai.html`
- Project case studies use `project.html?project=<slug>`.

## Ask Piyush AI
The chat widget uses the existing Cloud Run API at `https://ask-piyush-ai-44ufu2jwiq-el.a.run.app`. It discovers the FastAPI `/chat` request schema through `/openapi.json` and posts to `/chat`. The browser code contains no Gemini API key; the backend key remains in Google Secret Manager. The page's chatbot is RAG-backed by the portfolio knowledge base.

## Certificates
The Maven workshop certificate link is the user-provided Maven wrap-up URL for Charlie's Coffee. The page links directly to Maven instead of copying or rehosting the credential.


## Project thumbnail artwork

The project-card and case-study hero thumbnails are now a coordinated set of custom SVG infographics. Each one is project-specific and follows the California Traffic Collision reference palette (forest/olive, sage, cream and terracotta). The existing dashboard screenshots used inside the Namma Yatri case study gallery remain available as supporting project evidence.
