# Piyush Sharma — Hybrid Data Analytics × GenAI Portfolio

This is the GitHub Pages version of the portfolio for `piyush0920.github.io`.

## Included
- `index.html` — homepage
- `project.html` — reusable dynamic case-study page (`?project=rag`, `?project=namma`, etc.)
- `style.css` — dark-first purple visual system with light mode
- `script.js` — dynamic content, filters, GitHub metadata, theme persistence, modal resumes, case studies, animations
- `chat-widget.js` — floating Ask Piyush AI widget connected to the deployed FastAPI /chat endpoint
- `assets/resume-data-analytics.pdf` — Data Analytics / Demand Intelligence resume
- `assets/resume-genai.pdf` — GenAI Engineer resume
- `assets/projects/namma-yatri/*.webp` — dashboard screenshots used in the Namma Yatri case study
- `assets/favicon.svg` — site icon
- `assets/og-image.png` — social sharing image
- `robots.txt` and `sitemap.xml` — basic search-engine support

## Publish / update
1. Upload all files and folders to the root of `piyush0920.github.io`.
2. Keep `index.html` in the repository root.
3. Keep the `assets` folder structure unchanged.
4. GitHub Pages should deploy from `main` / root.

## Project URLs
- `project.html?project=rag`
- `project.html?project=namma`
- `project.html?project=forecast`
- `project.html?project=cardio`
- `project.html?project=nyc`
- `project.html?project=car`
- `project.html?project=hybrid-rag`
- `project.html?project=shl-grammar`

## GitHub project metadata
The homepage attempts to fetch public repository stars, forks and primary language from the GitHub API. If the API is unavailable or rate-limited, the cards automatically fall back to a simple repository label.


## Project snapshots

Project cards use optimized WebP snapshots in `assets/projects/cards/`. The Namma Yatri card uses the supplied Overview dashboard page. The Namma Yatri case study retains all five dashboard views.


## Snapshot reliability
The project-card and Namma Yatri case-study images are embedded into `script.js` as WebP data URLs as a fallback. This means the snapshots can still render even if GitHub's web uploader misses nested image folders. The original WebP files are also included under `assets/projects/`.


## Ask Piyush AI widget setup

The widget is included on the home page and case-study pages. Before publishing, open `chat-widget.js` and replace `PASTE_YOUR_CLOUD_RUN_SERVICE_URL_HERE` in `CHAT_API_BASE` with the public Cloud Run service URL (for example, `https://your-service-xxxxx-asia-south1.run.app`). Use the service root URL only; the script appends `/chat`. Do not add or expose the Gemini API key in this repository. The Cloud Run CORS configuration should allow `https://piyush0920.github.io`.


## Recent project visuals and chatbot fix
- `assets/projects/cards/hybrid-rag.webp` — supplied Hybrid RAG architecture diagram, used on the project card and case-study hero.
- `assets/projects/cards/shl-grammar.webp` — supplied SHL speech waveform plot, used on the project card and case-study hero.
- `chat-widget.js` normalizes API response shapes at both fetch and rendering layers, preventing JavaScript objects from appearing as `[object Object]`. `index.html` and `project.html` use versioned script URLs to force browsers to load the fix.

## Configure the Cloud Run API URL
Open `chat-widget.js` and set the `CHAT_API_BASE` fallback to the public Cloud Run service root URL (do not add `/chat` or `/docs`). Do not store a Gemini key in this repository. If you already configured the actual URL in your live GitHub repository, copy that same URL into this package before deploying it.
