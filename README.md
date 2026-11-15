# Piyush Sharma — Data, with context.

A static portfolio connecting **P&C insurance operations, data analytics and business intelligence**, with supporting machine learning and applied AI projects. Built with HTML, CSS and vanilla JavaScript for GitHub Pages. No build step or package installation is required.

## Explore the portfolio

The homepage features Namma Yatri (operational BI), California Traffic Collision (data preparation and validation) and Ask Piyush AI (application delivery). Choose **All 10** or a category filter for the full collection. Each case study explains the problem, approach, relevance and limitations. The proposed insurance reconciliation workbench is not listed as completed work.

## File map

| File | Purpose |
| --- | --- |
| `index.html` | Homepage, experience, credentials and resume chooser |
| `project.html` | Shared case-study page, using `?project=<slug>` |
| `ask-piyush-ai.html` | Assistant introduction and prompts |
| `script.js` | Portfolio data, rendering, filters, navigation, themes and dialog |
| `chat-widget.js` | Chat frontend and hosted-service integration |
| `style.css` | Responsive design, light/dark themes and accessibility styles |
| `assets/projects/cards/` | Conceptual SVG illustrations, not experiment plots |
| `assets/projects/namma-yatri/` | Five dashboard screenshots |
| `assets/resume-data-analytics.pdf`, `assets/resume-genai.pdf` | Original resume files, unchanged |
| `robots.txt`, `sitemap.xml` | Search-engine discovery |

All original filenames, asset paths and project slugs are retained. Edit `portfolioData` in `script.js` for project or experience content; edit `featuredSlugs` to change the homepage selection. Introductory text and credentials are in `index.html`.

Project slugs: `namma`, `collision`, `ask-piyush-ai`, `forecast`, `nyc`, `rag`, `hybrid-rag`, `cardio`, `car`, `shl-grammar`.

## Preview locally

From the repository root:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. Stop the server with Ctrl+C. External fonts are optional; local fallbacks are configured. The assistant needs network access and a compatible backend.

## Replace files in GitHub

1. Keep a backup or use a review branch.
2. Extract the ZIP and upload its **contents** to the root of `piyush0920/piyush0920.github.io`. Replace matching files and retain the `assets/` folder structure. Do not upload only the ZIP or nest the site inside another folder.
3. Review the Git diff, commit and use the existing GitHub Pages configuration. For a new configuration, select the branch containing these files and the repository root.
4. Reload the published site and check filters, case studies, both resume links and chat. CSS and JavaScript references include an updated cache version.

No repository settings, CNAME file, workflow or backend deployment are changed by this package. Preserve repository files not supplied here.

## Chat integration

The frontend retains `https://ask-piyush-ai-44ufu2jwiq-el.a.run.app`. It tries `/openapi.json` with a five-second discovery deadline, then submits once to `/chat`. If discovery is unavailable, it uses the existing JSON fallback `{ "query": "..." }`. The complete interaction has a 45-second timeout. Generation is not automatically retried with guessed fields.

The server must allow the website origin through CORS. Public service URLs belong in frontend code; secrets belong on the server. This package contains no backend source, knowledge files, deployment configuration or evaluation logs. It cannot establish the deployed model version, secret storage, authentication, rate limits, data retention or live API availability.

Messages remain in page memory and can be cleared in the interface. Clearing does not request server-side deletion. Responses are rendered as text and constrained links, not inserted as model-generated HTML. Source labels identify retrieved files and do not guarantee claim-level correctness.

## Accuracy and evidence

- Existing employment titles, dates, education and credentials are retained. Verify them against official records and both resumes before publishing; this edit cannot resolve inconsistent external profiles.
- The website's headline 20% efficiency claim was removed because its baseline and measurement method are not supplied. Quantified results need supporting evidence.
- RAG quality scores were removed from the website; valid sample counts, coverage and judge failures are needed to interpret them. The hybrid RAG case study documents the distinction between intent classification and answer evaluation.
- The forecasting model-selection period is labelled a **validation period**. A separate final test or rolling-origin evaluation is an improvement to make in the underlying project.
- The five Power BI screenshots remain available at full resolution. The editable `.pbix` is absent and has not been reconstructed.
- Concept illustrations are labelled; duplicated hero artwork is not presented as experiment evidence.
- Underlying notebooks and the chatbot backend have not been corrected or rerun by editing this frontend. Those changes require their source, data and runtime.
- Both resume PDFs, the social-preview image and existing visual assets are retained byte-for-byte.

## Review changes

The review sharpened insurance analytics positioning, featured three projects, added case-study relevance and limitations, removed repository popularity counters and replaced embedded dashboard-image duplicates with existing asset paths. It also improved storage-failure handling, menu state, resume-dialog focus management, no-JavaScript fallbacks, metadata, chat clearing and request timeouts.

Project-specific canonical URLs and metadata are updated in the browser. JavaScript-free crawlers and social-preview services may show generic template metadata; individual static project pages would be needed for distinct previews in those services.

Google Fonts loads when reachable. The AI service is contacted only after a question is submitted. No analytics tracker or automatic GitHub statistics requests are included.

## Validation of this edit

Passed: JavaScript syntax checks; original filename and path comparison (28 files); local link, image and anchor checks; SVG and sitemap XML parsing; rendering checks for six filter states and all ten case studies; a blocked-storage theme check; and mocked chat tests for schema discovery, cached contracts, fallback payloads, nested answers, validation failure without automatic retry, and network failure.

All visual assets and both resume PDFs match the supplied ZIP byte-for-byte. The five dashboard images were matched against the original embedded bytes before removing the duplicates. `script.js` decreased from 458,825 to 44,838 bytes (about 90%).

Browser preview access timed out during this review, so rendered desktop/mobile layout, browser keyboard interactions and the deployed chatbot were not verified. Check those in a browser before publishing. External repository contents and live links were not re-audited during this frontend edit.
