# Piyush Sharma — Hybrid Data Analytics × GenAI Portfolio

This is the GitHub Pages version of the portfolio for `piyush0920.github.io`.

## Included
- `index.html` — homepage
- `project.html` — reusable dynamic case-study page (`?project=rag`, `?project=namma`, etc.)
- `style.css` — dark-first purple visual system with light mode
- `script.js` — dynamic content, filters, GitHub metadata, theme persistence, modal resumes, case studies, animations
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

## GitHub project metadata
The homepage attempts to fetch public repository stars, forks and primary language from the GitHub API. If the API is unavailable or rate-limited, the cards automatically fall back to a simple repository label.


## Project snapshots

Project cards use optimized WebP snapshots in `assets/projects/cards/`. The Namma Yatri card uses the supplied Overview dashboard page. The Namma Yatri case study retains all five dashboard views.


## Snapshot reliability
The project-card and Namma Yatri case-study images are embedded into `script.js` as WebP data URLs as a fallback. This means the snapshots can still render even if GitHub's web uploader misses nested image folders. The original WebP files are also included under `assets/projects/`.
