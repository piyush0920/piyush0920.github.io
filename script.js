const portfolioData = {
  skills: [
    { title: "Data Analytics", text: "EDA, data cleaning, profiling, KPI analysis, root-cause analysis" },
    { title: "Python & SQL", text: "Pandas, NumPy, scikit-learn, MySQL, CTEs, joins, window functions" },
    { title: "Business Intelligence", text: "Power BI, DAX, Power Query, Excel, data modelling, dashboards" },
    { title: "Forecasting & ML", text: "Time series, ARIMA, SARIMA, regression, classification, model evaluation" },
    { title: "GenAI & LLMs", text: "LangChain, RAG pipelines, prompt engineering, RAGAS, ROUGE, Ollama" },
    { title: "Vector Search", text: "ChromaDB, embeddings, sentence-transformers, retrieval workflows" },
    { title: "Optimisation", text: "Linear programming, route optimisation, facility allocation, Excel Solver" },
    { title: "Cloud & Tools", text: "AWS S3/Lambda, GCP, PySpark, GitHub, Jupyter, VS Code" }
  ],
  projects: [
    { title: "Legal Document RAG Pipeline", category: "GenAI", description: "Built a retrieval-augmented generation pipeline over a legal document corpus using LangChain, ChromaDB, Ollama, and HuggingFace embeddings, with structured evaluation and pipeline debugging.", tags: ["LangChain", "ChromaDB", "RAGAS", "Ollama"], link: "https://github.com/piyush0920/RAG_for_legal_documents" },
    { title: "Namma Yatri Ride-Hailing Dashboard", category: "BI", description: "Developed an end-to-end Power BI solution covering the ride lifecycle across Bengaluru zones, with star-schema modelling, DAX measures, funnel analysis, heatmaps, and operational recommendations.", tags: ["Power BI", "DAX", "Power Query", "Excel"], link: "https://github.com/piyush0920/Namma-Yatri-Ride-Hailing-Analysis-Power-BI-Dashboard" },
    { title: "Airline Passenger Demand Forecasting", category: "Analytics", description: "Evaluated 13 forecasting models on 144 monthly observations, applying decomposition, ACF/PACF, Box-Cox transformation, differencing, and RMSE/MAPE benchmarking.", tags: ["Python", "Statsmodels", "SARIMA", "Forecasting"], link: "https://github.com/piyush0920/airline-passenger-forecasting" },
    { title: "Cardiovascular Risk Prediction", category: "ML", description: "Developed and tuned SVM and Decision Tree classifiers, including class-imbalance handling, GridSearchCV, and sensitivity-specificity threshold analysis.", tags: ["Python", "SVM", "Decision Tree", "scikit-learn"], link: "https://github.com/piyush0920/cardio_risk_prediction" },
    { title: "NYC Yellow Taxi Analytics", category: "Analytics", description: "Performed exploratory and geospatial analysis of NYC taxi trips to identify demand hotspots, pickup/drop-off imbalances, congestion-prone routes, and fleet-planning opportunities.", tags: ["Pandas", "NumPy", "GeoPandas", "EDA"], link: "https://github.com/piyush0920/nycTaxiAssignment" },
    { title: "Car Price Prediction", category: "ML", description: "Built a machine-learning workflow for exploring vehicle attributes and predicting car prices, from data preparation and feature analysis to model evaluation.", tags: ["Python", "Regression", "ML", "EDA"], link: "https://github.com/piyush0920/Car_price_predictions" }
  ],
  experience: [
    { date: "Apr 2026 — Present", role: "Senior Executive — Insurance Operations", company: "Xceedance · P&C Insurance", text: "Expanded ownership of rater development, team training, KPI reporting, and cross-functional client coordination after progressing from Executive within two years." },
    { date: "Mar 2024 — Apr 2026", role: "Executive — Insurance Operations", company: "Xceedance · P&C Insurance", text: "Designed Excel-based raters, owned policy-data reconciliation, monitored KPIs, authored process documentation, collaborated with US-based stakeholders, and improved policy-processing efficiency by approximately 20%." },
    { date: "2025 — Present", role: "Executive Diploma in Data Science & AI", company: "IIIT Bangalore · delivered via upGrad", text: "Developing deeper capability across Python, SQL, statistics, machine learning, NLP, deep learning, GenAI, cloud, and advanced data visualisation." }
  ]
};

const $ = s => document.querySelector(s);

function renderSkills() {
  $("#skills-grid").innerHTML = portfolioData.skills.map(s => `
    <article class="skill-card reveal"><h3>${s.title}</h3><p>${s.text}</p></article>
  `).join("");
}

function renderFilters() {
  const categories = ["All", ...new Set(portfolioData.projects.map(p => p.category))];
  $("#project-filters").innerHTML = categories.map((c,i) =>
    `<button class="filter ${i===0 ? "active":""}" data-category="${c}">${c}</button>`
  ).join("");
  document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.category);
  }));
}

function renderProjects(category = "All") {
  const projects = category === "All" ? portfolioData.projects : portfolioData.projects.filter(p => p.category === category);
  $("#projects-grid").innerHTML = projects.map((p,i) => `
    <article class="project-card reveal">
      <div class="project-number">0${i+1}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <a class="project-link" href="${p.link}" target="_blank" rel="noreferrer">View on GitHub ↗</a>
    </article>
  `).join("");
  observeReveals();
}

function renderExperience() {
  $("#experience-list").innerHTML = portfolioData.experience.map(e => `
    <article class="timeline-item reveal">
      <time>${e.date}</time>
      <div><h3>${e.role}</h3><strong>${e.company}</strong><p>${e.text}</p></div>
    </article>
  `).join("");
}

function observeReveals() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

$(".menu-toggle").addEventListener("click", () => $(".nav-links").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => $(".nav-links").classList.remove("open")));

$("#theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.getAttribute("data-theme") !== "light";
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
  $("#theme-toggle").textContent = dark ? "☾" : "☀";
  localStorage.setItem("theme", dark ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
$("#theme-toggle").textContent = savedTheme === "dark" ? "☀" : "☾";
$("#year").textContent = new Date().getFullYear();

renderSkills();
renderFilters();
renderProjects();
renderExperience();
observeReveals();
