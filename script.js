/* Portfolio content and interface. No build step or runtime dependencies. */
const portfolioData = {
  "exploring": [
    "Insurance data models",
    "Reconciliation controls",
    "SQL validation",
    "UAT & acceptance criteria",
    "Retrieval evaluation"
  ],
  "skills": [
    {
      "title": "P&C Operations & Controls",
      "text": "Policy-data reconciliation, Excel-based raters, KPI reporting, process controls, SOP documentation and stakeholder coordination"
    },
    {
      "title": "Analytics & BI",
      "text": "SQL, Power BI, DAX, Power Query, Advanced Excel, KPI reporting, dimensional modelling, dashboard design and data storytelling"
    },
    {
      "title": "Python & Data Engineering",
      "text": "Python, Pandas, NumPy, PySpark, Spark SQL, SQLite, data cleaning, ETL, joins and validation"
    },
    {
      "title": "Statistics & Analysis",
      "text": "Descriptive statistics, hypothesis testing, correlation, sampling, outlier analysis and analytical reasoning"
    },
    {
      "title": "Machine Learning",
      "text": "scikit-learn, classification, regression, SVM, Decision Trees, Ridge / Lasso, feature engineering and GridSearchCV"
    },
    {
      "title": "Forecasting",
      "text": "ARIMA, SARIMA, Holt-Winters, Exponential Smoothing, Statsmodels, seasonal diagnostics, RMSE and MAPE"
    },
    {
      "title": "NLP & Language Models",
      "text": "CRF, named entity recognition, contextual feature engineering, prompt design and model evaluation"
    },
    {
      "title": "Generative AI & Retrieval",
      "text": "LangChain, RAG, ChromaDB, Hugging Face sentence-transformer embeddings, Ollama, Gemini, RAGAS and ROUGE"
    },
    {
      "title": "Cloud & Application Delivery",
      "text": "FastAPI, Docker, Google Cloud Run, Artifact Registry, Secret Manager, AWS S3, Git and GitHub"
    }
  ],
  "projects": [
    {
      "slug": "namma",
      "image": "assets/projects/cards/namma.svg",
      "imageAlt": "Namma Yatri Ride-Hailing Dashboard conceptual project illustration",
      "title": "Namma Yatri Ride-Hailing Dashboard",
      "category": "BI",
      "repo": "Namma-Yatri-Ride-Hailing-Analysis-Power-BI-Dashboard",
      "description": "Designed an end-to-end Power BI analytics solution for ride lifecycle, revenue, demand, geography, cancellation and operational performance.",
      "tags": [
        "Power BI",
        "DAX",
        "Power Query",
        "Data Modelling"
      ],
      "metrics": [
        "5 dashboard views",
        "Ride lifecycle KPIs",
        "37 Bengaluru zones"
      ],
      "visual": "POWER BI / Operations",
      "caseTitle": "A multi-page operational dashboard for ride-hailing decisions.",
      "subtitle": "A Power BI solution covering the ride lifecycle across Bengaluru zones, from overview metrics to duration-level deep dives.",
      "stats": [
        "5 dashboard views",
        "5-table analytical model",
        "37 Bengaluru zones",
        "DAX + Power Query"
      ],
      "problem": "Turn ride-level operational data into an interactive view of demand, revenue, cancellations and geography that can be explored by assembly, time period and payment method.",
      "approach": [
        "Built a five-table analytical model with role-playing pickup and drop dimensions.",
        "Created DAX measures for trip volume, revenue, cancellation, completion and quote-to-completion rates.",
        "Added cross-page exploration with assembly, time-period and payment-method filters.",
        "Used demand and geography views to identify operational hotspots and demand concentration.",
        "Created a deep-dive view for trip volume across assemblies and ride-duration windows."
      ],
      "learnings": "The dashboard is designed as a decision workflow rather than a collection of charts: start with performance, move into revenue and geography, inspect cancellation behaviour, then use the deep dive to investigate ride duration patterns.",
      "gallery": [
        [
          "assets/projects/namma-yatri/overview.webp",
          "Overview — performance and revenue view"
        ],
        [
          "assets/projects/namma-yatri/trip-revenue.webp",
          "Trip & Revenue — payment mix, revenue by time period and trip duration"
        ],
        [
          "assets/projects/namma-yatri/demand-geography.webp",
          "Demand & Geography — trips and revenue by assembly"
        ],
        [
          "assets/projects/namma-yatri/cancellation-performance.webp",
          "Cancellation & Performance — assembly and cancellation split"
        ],
        [
          "assets/projects/namma-yatri/deep-dive.webp",
          "Deep Dive — trips by assembly and duration"
        ]
      ],
      "repoUrl": "https://github.com/piyush0920/Namma-Yatri-Ride-Hailing-Analysis-Power-BI-Dashboard",
      "relevance": "Shows how I turn an operational process into measurable stages, investigate exceptions and communicate performance through BI. The same analytical habits apply to policy-processing workflows.",
      "limitations": "This package includes five dashboard screenshots. The editable Power BI (.pbix) file is not included. Rate definitions and denominators should be checked in the project documentation before comparing percentages."
    },
    {
      "slug": "collision",
      "image": "assets/projects/cards/collision.svg",
      "imageAlt": "California Traffic Collision ETL & Analysis conceptual project illustration",
      "title": "California Traffic Collision ETL & Analysis",
      "category": "Analytics",
      "repo": "California-Traffic-Collision-ETL-and-Analysis",
      "description": "Built a large-scale PySpark and SQL workflow to prepare, join and analyse California traffic collision data, with quality checks and temporal, weather and county-level analysis.",
      "tags": [
        "PySpark",
        "Spark SQL",
        "SQLite",
        "AWS S3"
      ],
      "metrics": [
        "1M+ records",
        "Multi-source ETL",
        "Temporal + county trends"
      ],
      "visual": "PUBLIC SAFETY / DATA ENGINEERING",
      "caseTitle": "Turning collision records into analysis-ready data.",
      "subtitle": "A PySpark and SQL pipeline for preparing large collision datasets and exploring severity, location, weather and time-based patterns.",
      "stats": [
        "1M+ records handled",
        "PySpark + Spark SQL",
        "Data quality checks",
        "AWS S3 export"
      ],
      "problem": "Large, related traffic datasets need consistent preparation before their patterns can be analysed. The goal was to establish a repeatable ETL workflow and use the prepared data to explore collision severity and operational trends.",
      "approach": [
        "Inspected the source datasets and their available identifiers and fields.",
        "Prepared and standardised data types, column names and missing-value representations.",
        "Used PySpark and Spark SQL to transform and combine large datasets, with checks around join retention and data quality.",
        "Applied exploratory analysis to collision severity, weather, county, weekday and monthly patterns.",
        "Used IQR-based checks for selected age and vehicle-year variables, and documented missing-value treatment.",
        "Exported processed outputs for downstream use, including an AWS S3 upload workflow."
      ],
      "learnings": "The project reinforced that large-scale ETL is not only about making joins run: key selection, row-retention checks, missing values and validation after each transformation determine whether the resulting analysis is trustworthy.",
      "architecture": [
        "Source collision datasets",
        "↓",
        "Schema review + data preparation",
        "↓",
        "PySpark transformations + Spark SQL",
        "↓",
        "Join validation + quality checks",
        "↓",
        "Severity / weather / county / time analysis",
        "↓",
        "Processed outputs → AWS S3"
      ],
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/California-Traffic-Collision-ETL-and-Analysis",
      "relevance": "Shows data preparation, identifier checks and join validation across related records: useful foundations for reliable policy and transaction reporting.",
      "limitations": "This portfolio package does not contain the source datasets or notebooks. Record counts and implementation details are described from the existing project record; this website is not an independent rerun of the analysis."
    },
    {
      "slug": "ask-piyush-ai",
      "image": "assets/projects/cards/ask-piyush-ai.svg",
      "imageAlt": "Ask Piyush AI — Portfolio RAG Assistant conceptual project illustration",
      "title": "Ask Piyush AI — Portfolio RAG Assistant",
      "category": "GenAI",
      "repo": "piyush0920.github.io",
      "description": "Connected a portfolio chat interface to a hosted FastAPI service for semantic retrieval and Gemini-generated answers with source labels.",
      "tags": [
        "FastAPI",
        "ChromaDB",
        "Gemini API",
        "Docker",
        "Google Cloud Run"
      ],
      "metrics": [
        "30/30 benchmark requests succeeded",
        "1.68 s warm median latency",
        "6.22 s warm p95 latency"
      ],
      "visual": "GENAI / PORTFOLIO ASSISTANT",
      "caseTitle": "A personal portfolio assistant grounded in retrieved knowledge.",
      "subtitle": "A deployed RAG chatbot that lets visitors ask natural-language questions about my projects, professional experience, technical skills and interests.",
      "stats": [
        "FastAPI chat API",
        "ChromaDB semantic retrieval",
        "Gemini answer generation",
        "Docker + Cloud Run",
        "30/30 successful benchmark requests",
        "1.68 s warm p50 · 6.22 s p95"
      ],
      "problem": "A static portfolio makes visitors browse several pages to learn about a person's work. The goal was to provide a conversational interface that answers common questions while grounding responses in maintained portfolio knowledge instead of relying on model memory alone.",
      "approach": [
        "Organised profile, professional experience and project details into Markdown knowledge files.",
        "Indexed document chunks in a persistent ChromaDB collection for semantic retrieval.",
        "Built a FastAPI endpoint that retrieves relevant chunks and passes the context to Gemini for answer generation.",
        "Returned source labels with the answer so the UI can show which knowledge files were used.",
        "Containerized the application with Docker and deployed it to Google Cloud Run; stored the Gemini key in Secret Manager rather than in frontend code.",
        "Added a website chat widget with suggested prompts, source labels, loading states and request error handling."
      ],
      "learnings": "This project connected retrieval, generation, deployment and frontend integration into one working application. It also highlighted that retrieval proximity is not the same as evidence: a reliable assistant needs to handle unsupported questions carefully, keep source attribution meaningful and match its frontend request format to the API contract.",
      "architecture": [
        "Portfolio visitor question",
        "↓",
        "Website chat widget",
        "↓",
        "FastAPI /chat endpoint",
        "↓",
        "ChromaDB semantic retrieval",
        "↓",
        "Profile · experience · project chunks",
        "↓",
        "Gemini generation",
        "↓",
        "Answer + source labels",
        "↓",
        "Docker → Artifact Registry → Cloud Run"
      ],
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/piyush0920.github.io",
      "relevance": "Demonstrates delivery from a knowledge base to a usable interface, including retrieval, API integration and error handling.",
      "limitations": "This repository package contains the frontend integration. The backend, knowledge files, deployment configuration and logs are not included here. Source labels identify retrieved files; they do not establish that every generated claim is correct.",
      "repoLabel": "Frontend source",
      "benchmarkReportUrl": "assets/ask-piyush-ai-benchmark-report.html",
      "benchmarkSummary": "30-question live API benchmark: 100% HTTP success, 1.68 s warm p50 and 6.22 s warm p95. Speed and availability only; answer quality was not scored."
    },
    {
      "slug": "forecast",
      "image": "assets/projects/cards/forecast.svg",
      "imageAlt": "Airline Passenger Demand Forecasting conceptual project illustration",
      "title": "Airline Passenger Demand Forecasting",
      "category": "Analytics",
      "repo": "airline-passenger-forecasting",
      "description": "Compared 13 time-series approaches on 144 monthly observations, using a chronological validation period to study demand forecasting.",
      "tags": [
        "Python",
        "Statsmodels",
        "SARIMA",
        "Forecasting"
      ],
      "metrics": [
        "13 candidate models",
        "144 monthly observations",
        "120 / 24 train-validation split"
      ],
      "visual": "TIME SERIES / Demand",
      "caseTitle": "Forecasting demand with structured model comparison.",
      "subtitle": "A time-series workflow focused on diagnosing seasonality, selecting models and benchmarking forecasts for planning use cases.",
      "stats": [
        "13 candidate models",
        "144 observations",
        "120-month training set",
        "24-month validation period"
      ],
      "problem": "Build a forecasting workflow that diagnoses trend, seasonality and autocorrelation, then compares candidate models on a chronological validation period.",
      "approach": [
        "Applied seasonal decomposition to understand trend and seasonal structure.",
        "Used ACF/PACF, Box-Cox transformation and differencing for model diagnosis.",
        "Compared Naive, moving average, regression, exponential smoothing, AR/MA/ARMA/ARIMA and SARIMA approaches.",
        "Compared models on a 24-month validation period using RMSE and MAPE."
      ],
      "learnings": "Model comparison is useful only when the evaluation design is clear. A chronological split respects event order, and a separate final test or rolling-origin backtest is needed after selecting a model.",
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/airline-passenger-forecasting",
      "relevance": "Demonstrates seasonal diagnostics and chronological validation for demand planning. Applying it to insurance volumes would require an appropriate insurance dataset.",
      "limitations": "The 24-month holdout was used for model comparison. Selecting a model on that period makes it a validation set, not a final independent test. A separate final period or rolling-origin evaluation would strengthen the result."
    },
    {
      "slug": "nyc",
      "image": "assets/projects/cards/nyc.svg",
      "imageAlt": "NYC Yellow Taxi Analytics conceptual project illustration",
      "title": "NYC Yellow Taxi Analytics",
      "category": "Analytics",
      "repo": "nycTaxiAssignment",
      "description": "Performed end-to-end exploratory and geospatial analysis of NYC Yellow Taxi data to identify demand patterns, operational inefficiencies and geographic hotspots.",
      "tags": [
        "Pandas",
        "NumPy",
        "GeoPandas",
        "EDA"
      ],
      "metrics": [
        "2023 trip data",
        "Temporal analysis",
        "Geospatial analysis"
      ],
      "visual": "GEO / Operations",
      "caseTitle": "Finding where and when supply meets demand.",
      "subtitle": "Exploratory and geospatial analysis translating trip-level data into operational planning insights.",
      "stats": [
        "2023 data",
        "Pickup / drop-off analysis",
        "Geospatial hotspots",
        "Operational recommendations"
      ],
      "problem": "Understand taxi demand across time and geography, identify persistent pickup-to-dropoff imbalances, and translate them into fleet and routing considerations.",
      "approach": [
        "Cleaned and combined monthly trip data.",
        "Analysed demand by hour, day, month and zone.",
        "Examined fare, distance, passenger and payment behaviour.",
        "Used geospatial analysis to identify high-traffic zones and pickup-to-dropoff imbalances.",
        "Translated patterns into fleet rebalancing, peak-capacity, routing and pricing recommendations."
      ],
      "learnings": "The strongest part of the analysis is the move from descriptive EDA to operational interpretation: where the data shows recurring imbalance, there is a planning question worth investigating.",
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/nycTaxiAssignment",
      "relevance": "Demonstrates segmentation by time and geography, with operational questions built around demand and service patterns.",
      "limitations": "Exploratory associations support investigation; operational recommendations have not been validated through a live fleet experiment in this portfolio."
    },
    {
      "slug": "rag",
      "image": "assets/projects/cards/rag.svg",
      "imageAlt": "Legal Document RAG Pipeline conceptual project illustration",
      "title": "Legal Document RAG Pipeline",
      "category": "GenAI",
      "repo": "RAG_for_legal_documents",
      "description": "Built a legal-document retrieval prototype with persistent vector storage, local LLM inference and sampled evaluation.",
      "tags": [
        "LangChain",
        "ChromaDB",
        "Ollama",
        "RAGAS"
      ],
      "metrics": [
        "84,844 indexed chunks",
        "Local retrieval pipeline",
        "Sampled evaluation"
      ],
      "visual": "RAG / Retrieval",
      "caseTitle": "A retrieval pipeline built for grounded answers.",
      "subtitle": "A local RAG system covering document ingestion, chunking, embeddings, vector retrieval, LLM generation and evaluation.",
      "stats": [
        "84,844 persisted chunks",
        "4 legal categories",
        "ChromaDB retrieval",
        "Sampled RAGAS evaluation"
      ],
      "problem": "Create a question-answering workflow that can retrieve relevant legal document context and generate answers with a stronger grounding signal than a standalone LLM.",
      "approach": [
        "Ingested and cleaned a multi-category legal corpus.",
        "Created chunked document representations and sentence-transformer embeddings.",
        "Persisted 84,844 chunks in ChromaDB for retrieval.",
        "Built an LCEL RAG chain with context-grounding instructions and Ollama inference.",
        "Evaluated the pipeline with RAGAS and ROUGE."
      ],
      "learnings": "The project became as much an engineering exercise as a modelling exercise: environment configuration, model timeouts, inference-credit constraints and evaluation-library compatibility all had to be debugged end-to-end.",
      "architecture": [
        "Legal documents",
        "↓",
        "Pre-processing",
        "↓",
        "Chunking + metadata",
        "↓",
        "Embeddings",
        "↓",
        "ChromaDB",
        "↓",
        "Retriever",
        "↓",
        "LLM",
        "↓",
        "Grounded answer",
        "↓",
        "RAGAS / ROUGE"
      ],
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/RAG_for_legal_documents",
      "relevance": "Explores retrieval from a document collection. A policy-document use case would need its own source controls, evaluation set and review workflow.",
      "limitations": "The project documentation describes sampled evaluation and judge failures. Aggregate RAG scores are omitted here because evaluation coverage and valid sample counts are needed to interpret them. Retrieval and generation require separate checks."
    },
    {
      "slug": "hybrid-rag",
      "image": "assets/projects/cards/hybrid-rag.svg",
      "imageAlt": "Hybrid RAG: Fine-Tuned for Customer Support conceptual project illustration",
      "title": "Hybrid RAG: Fine-Tuned for Customer Support",
      "category": "GenAI",
      "repo": "Hybrid-RAG-Fine-tuned-for-Customer-Support-",
      "description": "Compared baseline intent prediction, naive RAG and a fine-tuned hybrid RAG flow to retrieve support SOPs and generate grounded answers.",
      "tags": [
        "RAG",
        "Intent Routing",
        "ChromaDB",
        "SOP Retrieval"
      ],
      "metrics": [
        "Baseline vs. RAG",
        "Intent-guided retrieval",
        "Grounded responses"
      ],
      "visual": "CUSTOMER SUPPORT / HYBRID RAG",
      "caseTitle": "Routing customer questions to grounded support answers.",
      "subtitle": "A comparative customer-support architecture combining intent prediction with SOP retrieval and grounded response generation.",
      "stats": [
        "Baseline, Naive RAG, Hybrid RAG",
        "Intent-guided search",
        "SOP retrieval with ChromaDB",
        "Grounded response generation"
      ],
      "problem": "Customer-support questions benefit from responses that find the right documented procedure rather than generating unsupported guidance. This project compares ways to combine intent prediction and retrieval in a support workflow.",
      "approach": [
        "Built a baseline model for intent and category prediction.",
        "Implemented a naive RAG path that retrieves a relevant Standard Operating Procedure (SOP) and generates a grounded response.",
        "Developed a hybrid flow using a fine-tuned intent router to map the predicted intent to a search query.",
        "Retrieved relevant SOP content from ChromaDB before final response generation.",
        "Compared the baseline, naive RAG, and hybrid approaches."
      ],
      "learnings": "The project explores how intent-aware routing can guide retrieval toward relevant procedures and how the final response can stay grounded in SOP content. Performance claims should be taken from the project's own evaluation results.",
      "architecture": [
        "Customer Query",
        "↓",
        "Baseline · Intent + Category Prediction",
        "↓",
        "Naive RAG · Retrieve SOP → Grounded Answer",
        "↓",
        "Hybrid RAG · Fine-tuned Intent Router",
        "↓",
        "Intent → Search Query → ChromaDB SOP Retrieval",
        "↓",
        "Grounded Response Generation",
        "↓",
        "Evaluation / Comparison"
      ],
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/Hybrid-RAG-Fine-tuned-for-Customer-Support-",
      "relevance": "Explores retrieving documented procedures for support questions, a pattern relevant to teams working with maintained SOPs.",
      "limitations": "Intent labels and generated prose were compared with text-overlap metrics in the original evaluation. Those outputs are not directly comparable. Intent accuracy or macro F1 and a separate answer-quality benchmark are the next evaluation priorities."
    },
    {
      "slug": "cardio",
      "image": "assets/projects/cards/cardio.svg",
      "imageAlt": "Cardiovascular Risk Prediction conceptual project illustration",
      "title": "Cardiovascular Risk Prediction",
      "category": "ML",
      "repo": "cardio_risk_prediction",
      "description": "Developed and tuned SVM and Decision Tree classifiers with imbalance handling, GridSearchCV and sensitivity-specificity cutoff analysis.",
      "tags": [
        "Python",
        "SVM",
        "Decision Tree",
        "scikit-learn"
      ],
      "metrics": [
        "68,775 records",
        "GridSearchCV",
        "Sensitivity-specificity analysis"
      ],
      "visual": "CLASSIFICATION / Risk",
      "caseTitle": "Classification with an emphasis on usable thresholds.",
      "subtitle": "A supervised-learning workflow combining model tuning, class-imbalance handling and threshold analysis.",
      "stats": [
        "68,775 patient records",
        "SVM + Decision Tree",
        "GridSearchCV tuning",
        "Threshold analysis"
      ],
      "problem": "Build a classification workflow for cardiovascular risk prediction while paying attention to class imbalance and the trade-off between sensitivity and specificity.",
      "approach": [
        "Prepared features and labels for supervised modelling.",
        "Handled class imbalance within the training workflow.",
        "Tuned SVM and Decision Tree models with GridSearchCV.",
        "Examined sensitivity and specificity to reason about decision thresholds.",
        "Used evaluation results to compare model behaviour rather than relying on a single metric."
      ],
      "learnings": "For risk classification, model performance is only part of the problem; threshold behaviour matters because the relative cost of false negatives and false positives changes how a model is used.",
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/cardio_risk_prediction",
      "relevance": "Demonstrates classification and threshold trade-offs. This is a learning project using health data, rather than insurance underwriting experience.",
      "limitations": "An educational classification exercise. This portfolio does not establish clinical validation, calibration across populations or suitability for deployment."
    },
    {
      "slug": "car",
      "image": "assets/projects/cards/car.svg",
      "imageAlt": "Car Price Prediction conceptual project illustration",
      "title": "Car Price Prediction",
      "category": "ML",
      "repo": "Car_price_predictions",
      "description": "Built a regression workflow covering data preparation, feature engineering, model fitting and regularisation for used-car price prediction.",
      "tags": [
        "Python",
        "Regression",
        "Feature Engineering",
        "Regularisation"
      ],
      "metrics": [
        "Linear regression",
        "Ridge / Lasso",
        "Feature analysis"
      ],
      "visual": "REGRESSION / Pricing",
      "caseTitle": "A structured regression workflow for pricing.",
      "subtitle": "A vehicle-pricing project focused on feature preparation, regression modelling and regularisation.",
      "stats": [
        "Linear regression",
        "Ridge / Lasso",
        "Feature engineering",
        "Model comparison"
      ],
      "problem": "Estimate car prices from vehicle attributes while managing feature scale, multicollinearity and model complexity.",
      "approach": [
        "Prepared and cleaned the vehicle dataset.",
        "Engineered relevant features and examined feature relationships.",
        "Built a baseline linear regression model.",
        "Applied Ridge and Lasso regularisation to control coefficient magnitude and complexity.",
        "Compared model behaviour and tuned regularisation parameters."
      ],
      "learnings": "Regularisation is useful not just as a tuning trick but as a way to make a regression pipeline more stable when predictors overlap or become numerous after feature engineering.",
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/Car_price_predictions",
      "relevance": "Demonstrates regression, feature preparation and regularisation. This vehicle-price exercise does not establish actuarial pricing experience.",
      "limitations": "Performance depends on the dataset, split and preprocessing. The portfolio does not make a production-accuracy claim; inspect the repository for the experiment setup."
    },
    {
      "slug": "shl-grammar",
      "image": "assets/projects/cards/shl-grammar.svg",
      "imageAlt": "SHL Grammar Scoring conceptual project illustration",
      "title": "SHL Grammar Scoring",
      "category": "ML",
      "repo": "SHL_Assessment",
      "description": "Built a machine-learning workflow for an SHL grammar-scoring assessment, focused on predicting grammar-quality scores and preparing assessment-ready predictions.",
      "tags": [
        "Python",
        "Machine Learning",
        "Feature Engineering",
        "Regression"
      ],
      "metrics": [
        "Grammar-score prediction",
        "Model evaluation",
        "Submission workflow"
      ],
      "visual": "SPEECH / GRAMMAR SCORING",
      "caseTitle": "Predicting grammar quality from assessment responses.",
      "subtitle": "A machine-learning assessment project focused on preparing data, evaluating predictive approaches and generating grammar-score predictions.",
      "stats": [
        "Grammar-score prediction",
        "Data preparation",
        "Model evaluation",
        "Submission-format predictions"
      ],
      "problem": "The SHL grammar-scoring task requires a model to estimate grammar quality from the provided assessment data. The workflow must support consistent data preparation, model validation, and predictions in the required submission format.",
      "approach": [
        "Inspected and prepared the assessment training and test data.",
        "Developed a predictive workflow for grammar-score estimation.",
        "Evaluated candidate approaches using the assessment validation process.",
        "Prepared prediction outputs in the format required by the assessment."
      ],
      "learnings": "The project covers an end-to-end assessment workflow, from data preparation and evaluation to producing the final prediction file. Specific model choices and performance metrics should be taken from verified experiment outputs.",
      "architecture": [
        "Assessment Data",
        "↓",
        "Data Preparation",
        "↓",
        "Feature Engineering",
        "↓",
        "Model Training / Validation",
        "↓",
        "Grammar Score Prediction",
        "↓",
        "Submission Output"
      ],
      "gallery": [],
      "repoUrl": "https://github.com/piyush0920/SHL_Assessment",
      "relevance": "Demonstrates a prediction workflow with assessment-format outputs and validation considerations.",
      "limitations": "Model choices and performance should be assessed from saved experiment outputs. No numerical accuracy claim is made on this page."
    }
  ],
  "experience": [
    {
      "date": "Apr 2026 — Present",
      "role": "Senior Executive — Insurance Operations",
      "company": "Xceedance · P&C Insurance",
      "text": "Expanded ownership of rater development, team training, KPI reporting and cross-functional client coordination after progression from Executive within two years."
    },
    {
      "date": "Mar 2024 — Apr 2026",
      "role": "Executive — Insurance Operations",
      "company": "Xceedance · P&C Insurance",
      "text": "Designed and maintained Excel-based raters, reconciled policy data, monitored operational KPIs and authored SOPs to improve consistency and support more efficient policy processing."
    }
  ]
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const featuredSlugs = new Set(['namma', 'collision', 'ask-piyush-ai']);

function initTheme() {
  let saved = 'dark';
  try { if (localStorage.getItem('theme') === 'light') saved = 'light'; } catch { /* Storage can be disabled. */ }
  const button = $('#theme-toggle');
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    if (!button) return;
    button.textContent = theme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    button.title = button.getAttribute('aria-label');
    $('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#11160f' : '#f2f0e7');
  }
  apply(saved);
  button?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch { /* Theme still works for this visit. */ }
  });
}

function observeReveals() {
  // Content remains visible if scripts, observers or external services fail.
  $$('.reveal').forEach(element => element.classList.add('visible'));
}

function renderSkills() {
  const root = $('#skills-grid');
  if (!root) return;
  root.innerHTML = portfolioData.skills.map(skill => `<article class="skill-card reveal"><h3>${escapeHTML(skill.title)}</h3><p>${escapeHTML(skill.text)}</p></article>`).join('');
  const tags = $('#exploring-tags');
  if (tags) tags.innerHTML = portfolioData.exploring.map(tag => `<span class="exploring-tag">${escapeHTML(tag)}</span>`).join('');
}

function renderFilters() {
  const root = $('#project-filters');
  if (!root) return;
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', 'Filter projects');
  const categories = ['Featured', 'All', 'BI', 'Analytics', 'ML', 'GenAI'];
  root.innerHTML = categories.map((category, index) => `<button type="button" class="filter ${index === 0 ? 'active' : ''}" aria-pressed="${index === 0}" aria-controls="projects-grid" data-category="${category}">${category === 'All' ? `All ${portfolioData.projects.length}` : category}</button>`).join('');
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    root.querySelectorAll('button').forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    renderProjects(button.dataset.category);
  });
}

function renderProjects(category = 'Featured') {
  const root = $('#projects-grid');
  if (!root) return;
  const projects = portfolioData.projects.filter(project => category === 'All' || (category === 'Featured' ? featuredSlugs.has(project.slug) : project.category === category));
  root.innerHTML = projects.map(project => `<article class="project-card reveal">
    <a class="project-visual project-visual--${project.slug}" href="project.html?project=${project.slug}" aria-label="Open ${escapeHTML(project.title)} case study"><img src="${project.image}" alt="${escapeHTML(project.imageAlt)}" width="1200" height="675" loading="lazy" decoding="async"></a>
    <div class="project-body"><div class="project-number">${String(portfolioData.projects.indexOf(project) + 1).padStart(2, '0')} · ${escapeHTML(project.category.toUpperCase())}</div><h3><a href="project.html?project=${project.slug}">${escapeHTML(project.title)}</a></h3><p>${escapeHTML(project.description)}</p><div class="tags">${project.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div><div class="project-meta"><span>${project.slug === 'namma' ? 'Dashboard screenshots' : 'Project source linked'}</span><span>${escapeHTML(project.metrics[0])}</span></div><div class="project-actions"><a class="project-link" href="project.html?project=${project.slug}">View case study ↗</a><a class="project-link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.repoLabel || 'GitHub')} ↗</a></div></div>
  </article>`).join('');
  const status = $('#project-results');
  if (status) status.textContent = category === 'Featured' ? `Showing ${projects.length} featured projects. Choose All ${portfolioData.projects.length} to explore the full collection.` : `Showing ${projects.length} ${category === 'All' ? 'projects' : category + ' projects'}.`;
  observeReveals();
}

function renderExperience() {
  const root = $('#experience-list');
  if (root) root.innerHTML = portfolioData.experience.map(item => `<article class="timeline-item reveal"><p class="timeline-date">${escapeHTML(item.date)}</p><div><h3>${escapeHTML(item.role)}</h3><strong>${escapeHTML(item.company)}</strong><p>${escapeHTML(item.text)}</p></div></article>`).join('');
}

function initNavigation() {
  const toggle = $('.menu-toggle');
  const nav = $('.nav-links');
  if (!toggle || !nav) return;
  function setOpen(open, restoreFocus = false) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
}

function initResumeModal() {
  const modal = $('#resume-modal');
  const trigger = $('#resume-menu');
  if (!modal || !trigger) return;
  const dialog = modal.querySelector('[role="dialog"]');
  let previousFocus;
  let previousOverflow;
  let siblings = [];
  function close() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
    siblings.forEach(([element, inert]) => { element.inert = inert; });
    previousFocus?.focus();
  }
  trigger.addEventListener('click', () => {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    siblings = [...document.body.children].filter(element => element !== modal && !['SCRIPT', 'STYLE'].includes(element.tagName)).map(element => [element, element.inert]);
    siblings.forEach(([element]) => { element.inert = true; });
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    dialog.querySelector('button').focus();
  });
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.querySelector('.modal-backdrop').addEventListener('click', close);
  modal.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
}

function renderArchitecture(project) {
  if (!project.architecture) return '';
  if (project.slug === 'hybrid-rag') return `<section class="case-section"><h2>Three approaches compared</h2><div class="comparison-grid"><article><h3>Baseline</h3><p>Query → intent and category prediction</p></article><article><h3>Naive RAG</h3><p>Query → SOP retrieval → answer generation</p></article><article><h3>Hybrid RAG</h3><p>Query → fine-tuned intent router → SOP retrieval → answer generation</p></article></div></section>`;
  const steps = project.architecture.filter(step => step !== '↓');
  return `<section class="case-section"><h2>Workflow</h2><ol class="architecture-flow">${steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></section>`;
}

function caseStudy(project) {
  const gallery = project.gallery?.length ? `<section class="case-section"><h2>Dashboard evidence</h2><p>Open a screenshot to inspect it at full resolution.</p><div class="gallery">${project.gallery.map(([source, caption]) => `<figure><a href="${source}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size screenshot: ${escapeHTML(caption)}"><img loading="lazy" decoding="async" src="${source}" alt="${escapeHTML(caption)}"></a><figcaption>${escapeHTML(caption)}</figcaption></figure>`).join('')}</div></section>` : '';
  return `<section class="case-study container"><div class="case-top reveal"><div><p class="eyebrow">PROJECT CASE STUDY · ${escapeHTML(project.category.toUpperCase())}</p><h1>${escapeHTML(project.caseTitle)}</h1><p class="case-subtitle">${escapeHTML(project.subtitle)}</p></div><div class="case-actions"><a class="btn primary" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.repoLabel || 'Open GitHub')} ↗</a><a class="btn secondary" href="index.html#work">All projects</a></div></div><figure class="case-hero-image reveal"><img decoding="async" src="${project.image}" alt="${escapeHTML(project.imageAlt)}" width="1200" height="675"><figcaption>${escapeHTML(project.visual)} · Conceptual illustration</figcaption></figure><div class="case-stats reveal">${project.stats.map(stat => `<div class="case-stat"><strong>${escapeHTML(stat)}</strong><span>PROJECT SCOPE / METHOD</span></div>`).join('')}</div><div class="case-grid"><div><section class="case-section"><h2>The problem</h2><p>${escapeHTML(project.problem)}</p></section><section class="case-section relevance-note"><h2>Why this work matters</h2><p>${escapeHTML(project.relevance)}</p></section><section class="case-section"><h2>Approach</h2><ol class="case-list">${project.approach.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></section>${renderArchitecture(project)}<section class="case-section"><h2>What I learned</h2><p>${escapeHTML(project.learnings)}</p></section><section class="case-section evidence-note"><h2>Evidence & limitations</h2><p>${escapeHTML(project.limitations)}</p></section>${gallery}<section class="case-section"><h2>${escapeHTML(project.repoLabel || 'Project source')}</h2><p>Review the linked repository for the files and documentation available for this project.</p><p class="source-link"><a class="project-link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">github.com/piyush0920/${escapeHTML(project.repo)} ↗</a></p></section></div><aside class="case-sidebar"><div class="side-card"><span class="label">STACK</span><div class="case-tags">${project.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div></div><div class="side-card"><span class="label">PROJECT SCOPE</span><p>${project.metrics.map(escapeHTML).join(' · ')}</p></div>${project.slug === 'ask-piyush-ai' ? '<a class="btn secondary" href="ask-piyush-ai.html">Try the assistant ↗</a>' : ''}</aside></div></section>`;
}

function renderCaseStudy() {
  const root = $('#case-study');
  if (!root) return;
  const slug = new URLSearchParams(location.search).get('project');
  const project = portfolioData.projects.find(item => item.slug === slug);
  if (!project) {
    document.title = 'Project not found | Piyush Sharma';
    const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex'; document.head.append(robots);
    root.innerHTML = '<section class="fallback container"><p class="eyebrow">PROJECT NOT FOUND</p><h1>Find your next project.</h1><p>This project link is unavailable.</p><a class="btn primary" href="index.html#work">View projects ↗</a></section>';
    return;
  }
  document.title = `${project.title} | Piyush Sharma`;
  $('meta[name="description"]')?.setAttribute('content', project.description);
  $('meta[property="og:title"]')?.setAttribute('content', document.title);
  $('meta[property="og:description"]')?.setAttribute('content', project.description);
  const canonical = `https://piyush0920.github.io/project.html?project=${encodeURIComponent(project.slug)}`;
  $('link[rel="canonical"]')?.setAttribute('href', canonical);
  $('meta[property="og:url"]')?.setAttribute('content', canonical);
  root.innerHTML = caseStudy(project);
  observeReveals();
}

function init() {
  initTheme();
  initNavigation();
  if ($('#year')) $('#year').textContent = new Date().getFullYear();
  if (document.body.dataset.page === 'home') {
    renderSkills(); renderFilters(); renderProjects(); renderExperience(); initResumeModal();
  } else if (document.body.dataset.page === 'project') renderCaseStudy();
  observeReveals();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
else init();
