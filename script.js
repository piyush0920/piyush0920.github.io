const portfolioData = {
  exploring: ["FastAPI", "LangGraph", "LlamaIndex", "Agentic AI", "LoRA / QLoRA", "AWS Bedrock", "Azure OpenAI"],
  skills: [
    { title: "Data Analytics", text: "EDA, data cleaning, profiling, KPI analysis, root-cause analysis, statistical analysis" },
    { title: "Python & SQL", text: "Pandas, NumPy, scikit-learn, MySQL, CTEs, joins, window functions" },
    { title: "Business Intelligence", text: "Power BI, DAX, Power Query, Excel, dimensional modelling, dashboards" },
    { title: "Forecasting & ML", text: "ARIMA, SARIMA, exponential smoothing, regression, classification, evaluation" },
    { title: "GenAI & LLMs", text: "LangChain, RAG, prompt engineering, RAGAS, ROUGE, Ollama, HuggingFace" },
    { title: "Vector Search", text: "ChromaDB, embeddings, sentence-transformers, retrieval workflows" },
    { title: "Optimisation", text: "Linear programming, route optimisation, facility allocation, Excel Solver" },
    { title: "Cloud & Tools", text: "AWS S3/Lambda, GCP, PySpark, GitHub, Jupyter, VS Code, BigQuery" }
  ],
  projects: [
    { slug:"rag", image:"assets/projects/cards/rag.webp", imageAlt:"LangChain RAG chain implementation snapshot", title:"Legal Document RAG Pipeline", category:"GenAI", repo:"RAG_for_legal_documents", description:"Built a retrieval-augmented generation pipeline over a legal document corpus with persistent vector storage, local LLM inference and structured evaluation.", tags:["LangChain","ChromaDB","Ollama","RAGAS"], metrics:["84K+ chunks","Faithfulness 0.71","Context precision 1.0"], visual:"RAG / Retrieval", caseTitle:"A retrieval pipeline built for grounded answers.", subtitle:"A local RAG system covering document ingestion, chunking, embeddings, vector retrieval, LLM generation and evaluation.", stats:["84,844 persisted chunks","4 legal categories","Faithfulness 0.71","Context recall 0.75"], problem:"Create a question-answering workflow that can retrieve relevant legal document context and generate answers with a stronger grounding signal than a standalone LLM.", approach:["Ingested and cleaned a multi-category legal corpus.","Created chunked document representations and sentence-transformer embeddings.","Persisted 84,844 chunks in ChromaDB for retrieval.","Built an LCEL RAG chain with anti-hallucination prompting and Ollama inference.","Evaluated the pipeline with RAGAS and ROUGE."], learnings:"The project became as much an engineering exercise as a modelling exercise: environment configuration, model timeouts, inference-credit constraints and evaluation-library compatibility all had to be debugged end-to-end.", architecture:["Legal documents","↓","Pre-processing","↓","Chunking + metadata","↓","Embeddings","↓","ChromaDB","↓","Retriever","↓","LLM","↓","Grounded answer","↓","RAGAS / ROUGE"], gallery:[["assets/projects/cards/rag.webp","LangChain RAG chain implementation snapshot"]], repoUrl:"https://github.com/piyush0920/RAG_for_legal_documents" },
    { slug:"namma", image:"assets/projects/cards/namma.webp", imageAlt:"Namma Yatri Power BI Overview dashboard snapshot", title:"Namma Yatri Ride-Hailing Dashboard", category:"BI", repo:"Namma-Yatri-Ride-Hailing-Analysis-Power-BI-Dashboard", description:"Designed an end-to-end Power BI analytics solution for ride lifecycle, revenue, demand, geography, cancellation and operational performance.", tags:["Power BI","DAX","Power Query","Data Modelling"], metrics:["45.49% successful rides","67.56% quote→completion","37 Bengaluru zones"], visual:"POWER BI / Operations", caseTitle:"A multi-page operational dashboard for ride-hailing decisions.", subtitle:"A Power BI solution covering the ride lifecycle across Bengaluru zones, from overview metrics to duration-level deep dives.", stats:["45.49% successful ride rate","67.56% quote-to-completion","48.17% customer cancellation","47.25% driver cancellation"], problem:"Turn ride-level operational data into an interactive view of demand, revenue, cancellations and geography that can be explored by assembly, time period and payment method.", approach:["Built a five-table analytical model with role-playing pickup and drop dimensions.","Created DAX measures for trip volume, revenue, cancellation, completion and quote-to-completion rates.","Added cross-page exploration with assembly, time-period and payment-method filters.","Used demand and geography views to identify operational hotspots and demand concentration.","Created a deep-dive view for trip volume across assemblies and ride-duration windows."], learnings:"The dashboard is designed as a decision workflow rather than a collection of charts: start with performance, move into revenue and geography, inspect cancellation behaviour, then use the deep dive to investigate ride duration patterns.", gallery:[
      ["assets/projects/namma-yatri/overview.webp","Overview — performance and revenue view"],["assets/projects/namma-yatri/trip-revenue.webp","Trip & Revenue — payment mix, revenue by time period and trip duration"],["assets/projects/namma-yatri/demand-geography.webp","Demand & Geography — trips and revenue by assembly"],["assets/projects/namma-yatri/cancellation-performance.webp","Cancellation & Performance — assembly and cancellation split"],["assets/projects/namma-yatri/deep-dive.webp","Deep Dive — trips by assembly and duration"]
    ], repoUrl:"https://github.com/piyush0920/Namma-Yatri-Ride-Hailing-Analysis-Power-BI-Dashboard" },
    { slug:"forecast", image:"assets/projects/cards/forecast.webp", imageAlt:"Airline passenger demand forecast chart", title:"Airline Passenger Demand Forecasting", category:"Analytics", repo:"airline-passenger-forecasting", description:"Compared 13 time-series forecasting approaches on 144 monthly observations to support evidence-based model selection for demand planning.", tags:["Python","Statsmodels","SARIMA","Forecasting"], metrics:["13 models","144 monthly observations","120 / 24 train-test split"], visual:"TIME SERIES / Demand", caseTitle:"Forecasting demand with structured model comparison.", subtitle:"A time-series workflow focused on diagnosing seasonality, selecting models and benchmarking forecasts for planning use cases.", stats:["13 models evaluated","144 observations","120-month training set","24-month holdout"], problem:"Build a repeatable forecasting workflow that distinguishes trend, seasonality and autocorrelation, then compares a broad set of candidate models on a held-out period.", approach:["Applied seasonal decomposition to understand trend and seasonal structure.","Used ACF/PACF, Box-Cox transformation and differencing for model diagnosis.","Compared Naive, moving average, regression, exponential smoothing, AR/MA/ARMA/ARIMA and SARIMA approaches.","Selected the final model based on holdout performance using RMSE and MAPE."], learnings:"The useful output is not only a forecast: the workflow documents why a model is considered, what diagnostics support it and how performance is measured against an unseen holdout set.", gallery:[["assets/projects/cards/forecast.webp","Airline passenger demand forecast chart"]], repoUrl:"https://github.com/piyush0920/airline-passenger-forecasting" },
    { slug:"cardio", image:"assets/projects/cards/cardio.webp", imageAlt:"Cardiovascular risk classification model evaluation", title:"Cardiovascular Risk Prediction", category:"ML", repo:"cardio_risk_prediction", description:"Developed and tuned SVM and Decision Tree classifiers with imbalance handling, GridSearchCV and sensitivity-specificity cutoff analysis.", tags:["Python","SVM","Decision Tree","scikit-learn"], metrics:["68,775 records","GridSearchCV","Sensitivity-specificity analysis"], visual:"CLASSIFICATION / Risk", caseTitle:"Classification with an emphasis on usable thresholds.", subtitle:"A supervised-learning workflow combining model tuning, class-imbalance handling and threshold analysis.", stats:["68,775 patient records","SVM + Decision Tree","GridSearchCV tuning","Threshold analysis"], problem:"Build a classification workflow for cardiovascular risk prediction while paying attention to class imbalance and the trade-off between sensitivity and specificity.", approach:["Prepared features and labels for supervised modelling.","Handled class imbalance within the training workflow.","Tuned SVM and Decision Tree models with GridSearchCV.","Examined sensitivity and specificity to reason about decision thresholds.","Used evaluation results to compare model behaviour rather than relying on a single metric."], learnings:"For risk classification, model performance is only part of the problem; threshold behaviour matters because the relative cost of false negatives and false positives changes how a model is used.", gallery:[["assets/projects/cards/cardio.webp","Cardiovascular risk classification model evaluation"]], repoUrl:"https://github.com/piyush0920/cardio_risk_prediction" },
    { slug:"nyc", image:"assets/projects/cards/nyc.webp", imageAlt:"NYC taxi geospatial demand analysis map", title:"NYC Yellow Taxi Analytics", category:"Analytics", repo:"nycTaxiAssignment", description:"Performed end-to-end exploratory and geospatial analysis of NYC Yellow Taxi data to identify demand patterns, operational inefficiencies and geographic hotspots.", tags:["Pandas","NumPy","GeoPandas","EDA"], metrics:["2023 trip data","Temporal analysis","Geospatial analysis"], visual:"GEO / Operations", caseTitle:"Finding where and when supply meets demand.", subtitle:"Exploratory and geospatial analysis translating trip-level data into operational planning insights.", stats:["2023 data","Pickup / drop-off analysis","Geospatial hotspots","Operational recommendations"], problem:"Understand taxi demand across time and geography, identify persistent pickup-to-dropoff imbalances, and translate them into fleet and routing considerations.", approach:["Cleaned and combined monthly trip data.","Analysed demand by hour, day, month and zone.","Examined fare, distance, passenger and payment behaviour.","Used geospatial analysis to identify high-traffic zones and pickup-to-dropoff imbalances.","Translated patterns into fleet rebalancing, peak-capacity, routing and pricing recommendations."], learnings:"The strongest part of the analysis is the move from descriptive EDA to operational interpretation: where the data shows recurring imbalance, there is a planning question worth investigating.", gallery:[["assets/projects/cards/nyc.webp","NYC taxi geospatial demand analysis map"]], repoUrl:"https://github.com/piyush0920/nycTaxiAssignment" },
    { slug:"car", image:"assets/projects/cards/car.webp", imageAlt:"Car price regression analysis chart", title:"Car Price Prediction", category:"ML", repo:"Car_price_predictions", description:"Built a regression workflow covering data preparation, feature engineering, model fitting and regularisation for used-car price prediction.", tags:["Python","Regression","Feature Engineering","Regularisation"], metrics:["Linear regression","Ridge / Lasso","Feature analysis"], visual:"REGRESSION / Pricing", caseTitle:"A structured regression workflow for pricing.", subtitle:"A vehicle-pricing project focused on feature preparation, regression modelling and regularisation.", stats:["Linear regression","Ridge / Lasso","Feature engineering","Model comparison"], problem:"Estimate car prices from vehicle attributes while managing feature scale, multicollinearity and model complexity.", approach:["Prepared and cleaned the vehicle dataset.","Engineered relevant features and examined feature relationships.","Built a baseline linear regression model.","Applied Ridge and Lasso regularisation to control coefficient magnitude and complexity.","Compared model behaviour and tuned regularisation parameters."], learnings:"Regularisation is useful not just as a tuning trick but as a way to make a regression pipeline more stable when predictors overlap or become numerous after feature engineering.", gallery:[["assets/projects/cards/car.webp","Car price regression analysis chart"]], repoUrl:"https://github.com/piyush0920/Car_price_predictions" }
  ],
  experience:[
    {date:"Apr 2026 — Present", role:"Senior Executive — Insurance Operations", company:"Xceedance · P&C Insurance", text:"Expanded ownership of rater development, team training, KPI reporting and cross-functional client coordination after progression from Executive within two years."},
    {date:"Mar 2024 — Apr 2026", role:"Executive — Insurance Operations", company:"Xceedance · P&C Insurance", text:"Designed and maintained Excel-based raters, owned policy-data reconciliation, monitored KPI benchmarks, authored SOPs and improved policy-processing efficiency by approximately 20%."},
    {date:"2025 — Present", role:"Executive Diploma in Data Science & AI", company:"IIIT Bangalore · delivered via upGrad", text:"Developing deeper capability across Python, SQL, statistics, machine learning, NLP, deep learning, GenAI, cloud and advanced data visualisation."}
  ]
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function initTheme(){
  const saved=localStorage.getItem('theme')||'dark';
  document.documentElement.setAttribute('data-theme',saved);
  const btn=$('#theme-toggle'); if(btn) btn.textContent=saved==='dark'?'☀':'☾';
  btn?.addEventListener('click',()=>{
    const next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next); localStorage.setItem('theme',next); btn.textContent=next==='dark'?'☀':'☾';
  });
}

function observeReveals(){
  if(!('IntersectionObserver' in window)){ $$('.reveal').forEach(x=>x.classList.add('visible')); return; }
  const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}}),{threshold:.1});
  $$('.reveal:not(.visible)').forEach(el=>ob.observe(el));
}

function renderSkills(){
  const root=$('#skills-grid'); if(!root) return;
  root.innerHTML=portfolioData.skills.map(s=>`<article class="skill-card reveal"><h3>${s.title}</h3><p>${s.text}</p></article>`).join('');
  const tags=$('#exploring-tags'); if(tags) tags.innerHTML=portfolioData.exploring.map(t=>`<span class="exploring-tag">${t}</span>`).join('');
}

function projectVisual(project){
  return `<a class="project-visual" href="project.html?project=${project.slug}" aria-label="Open ${project.title} case study">
    <img src="${project.image}" alt="${project.imageAlt || project.title + ' project snapshot'}" loading="lazy" decoding="async">
    <div class="project-image-shade"></div>
    <div class="project-visual-inner">
      <span class="mini-label">${project.visual}</span>
      <div class="mini-metrics">${project.metrics.slice(0,3).map(m=>`<span class="mini-metric">${m}</span>`).join('')}</div>
    </div>
  </a>`;
}

function renderFilters(){
  const root=$('#project-filters'); if(!root) return;
  const cats=['All',...new Set(portfolioData.projects.map(p=>p.category))];
  root.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?'active':''}" data-category="${c}">${c}</button>`).join('');
  $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{ $$('.filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderProjects(btn.dataset.category); }));
}

function renderProjects(category='All'){
  const root=$('#projects-grid'); if(!root) return;
  const list=category==='All'?portfolioData.projects:portfolioData.projects.filter(p=>p.category===category);
  root.innerHTML=list.map((p,i)=>`<article class="project-card reveal">${projectVisual(p)}<div class="project-body"><div class="project-number">0${portfolioData.projects.indexOf(p)+1} · ${p.category.toUpperCase()}</div><h3>${p.title}</h3><p>${p.description}</p><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="project-meta"><span class="repo-meta" data-repo="${p.repo}">GitHub · loading…</span><span>${p.metrics[0]}</span></div><div class="project-actions"><a class="project-link" href="project.html?project=${p.slug}">View case study ↗</a><a class="project-link" href="${p.repoUrl}" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></article>`).join('');
  observeReveals(); fetchRepoStats();
}

async function fetchRepoStats(){
  const nodes=$$('[data-repo]');
  await Promise.all(nodes.map(async node=>{
    try{
      const repo=portfolioData.projects.find(p=>p.repo===node.dataset.repo);
      const r=await fetch(`https://api.github.com/repos/piyush0920/${repo.repo}`,{headers:{Accept:'application/vnd.github+json'}});
      if(!r.ok) throw new Error('api');
      const data=await r.json();
      const lang=data.language?` · ${data.language}`:'';
      node.textContent=`★ ${data.stargazers_count} · ${data.forks_count} forks${lang}`;
    }catch{node.textContent='GitHub repository';}
  }));
}

function renderExperience(){
  const root=$('#experience-list'); if(!root) return;
  root.innerHTML=portfolioData.experience.map(e=>`<article class="timeline-item reveal"><time>${e.date}</time><div><h3>${e.role}</h3><strong>${e.company}</strong><p>${e.text}</p></div></article>`).join('');
}

function initNavigation(){
  const toggle=$('.menu-toggle'), nav=$('.nav-links');
  toggle?.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'))});
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
}

function initResumeModal(){
  const modal=$('#resume-modal'); if(!modal) return;
  const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
  $('#resume-menu')?.addEventListener('click',open); $('.modal-close')?.addEventListener('click',close); $('.modal-backdrop')?.addEventListener('click',close); document.addEventListener('keydown',e=>e.key==='Escape'&&close());
}

function caseStudy(project){
  const gallery=project.gallery?.length?`<div class="gallery">${project.gallery.map(([src,cap])=>`<figure><img loading="lazy" decoding="async" src="${src}" alt="${cap}"><figcaption>${cap}</figcaption></figure>`).join('')}</div>`:'';
  const arch=project.architecture?`<div class="architecture"><pre>${project.architecture.join('\n')}</pre></div>`:'';
  const heroImage=project.image?`<figure class="case-hero-image reveal"><img decoding="async" src="${project.image}" alt="${project.imageAlt || project.title + ' project snapshot'}"><figcaption>${project.visual}</figcaption></figure>`:'';
  return `<section class="case-study container"><div class="case-top reveal"><div><p class="eyebrow">PROJECT CASE STUDY · ${project.category.toUpperCase()}</p><h1>${project.caseTitle}</h1><p class="case-subtitle">${project.subtitle}</p></div><div class="case-actions"><a class="btn primary" href="${project.repoUrl}" target="_blank" rel="noreferrer">Open GitHub ↗</a><a class="btn secondary" href="index.html#projects">All projects</a></div></div>${heroImage}<div class="case-stats reveal">${project.stats.map(s=>{const parts=s.split(/\s(?=[0-9])/);return `<div class="case-stat"><strong>${s}</strong><span>${project.category} project</span></div>`}).join('')}</div><div class="case-grid"><div><section class="case-section reveal"><h2>The problem</h2><p>${project.problem}</p></section><section class="case-section reveal"><h2>Approach</h2><div class="case-list">${project.approach.map(a=>`<div>${a}</div>`).join('')}</div></section>${arch}<section class="case-section reveal"><h2>What I learned</h2><p>${project.learnings}</p></section>${gallery}<section class="case-section reveal"><h2>Repository</h2><p>The complete project, notebooks and supporting files are available on GitHub.</p><p style="margin-top:.7rem"><a class="project-link" href="${project.repoUrl}" target="_blank" rel="noreferrer">github.com/piyush0920/${project.repo} ↗</a></p></section></div><aside class="case-sidebar reveal"><div class="side-card"><span class="label">STACK</span><div class="case-tags">${project.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div><div class="side-card"><span class="label">PROJECT SIGNAL</span><p>${project.metrics.join(' · ')}</p></div></aside></div></section>`;
}

function renderCaseStudy(){
  const root=$('#case-study'); if(!root) return;
  const slug=new URLSearchParams(location.search).get('project');
  const project=portfolioData.projects.find(p=>p.slug===slug);
  if(!project){root.innerHTML=`<section class="fallback container"><p class="eyebrow">PROJECT NOT FOUND</p><h2>Let's get you back to the work.</h2><p>The requested project could not be found.</p><a class="btn primary" href="index.html#projects">View projects ↗</a></section>`; return;}
  document.title=`${project.title} | Piyush Sharma`;
  root.innerHTML=caseStudy(project); observeReveals();
}

function init(){
  initTheme(); initNavigation();
  $('#year')?.append(document.createTextNode(new Date().getFullYear()));
  if(document.body.dataset.page==='home'){
    renderSkills(); renderFilters(); renderProjects(); renderExperience(); initResumeModal();
  } else if(document.body.dataset.page==='project') renderCaseStudy();
  observeReveals();
}

document.addEventListener('DOMContentLoaded',init);
