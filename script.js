const portfolioData = {
  skills: [
    { title: "Data Analytics", text: "Data cleaning, EDA, statistical analysis, KPI tracking" },
    { title: "Programming", text: "Python, pandas, NumPy, basic automation" },
    { title: "Databases", text: "SQL, joins, aggregations, data extraction" },
    { title: "Visualization", text: "Power BI, Excel, dashboards, storytelling" },
    { title: "Business", text: "Demand intelligence, supply planning, forecasting" },
    { title: "Statistics", text: "Correlation, regression, hypothesis testing" },
    { title: "Tools", text: "GitHub, Jupyter Notebook, Power Query" },
    { title: "Strengths", text: "Problem solving, structured thinking, communication" }
  ],
  projects: [
    {
      title: "Business Performance Dashboard",
      category: "BI",
      description: "An interactive dashboard designed to track business KPIs, identify trends, and support data-driven decisions.",
      tags: ["Power BI", "DAX", "Data Modeling"],
      link: "https://github.com/piyush0920"
    },
    {
      title: "Sales & Customer Analysis",
      category: "Python",
      description: "Exploratory analysis of sales and customer data to uncover patterns, high-value segments, and growth opportunities.",
      tags: ["Python", "Pandas", "Matplotlib"],
      link: "https://github.com/piyush0920"
    },
    {
      title: "Demand Forecasting Study",
      category: "Analytics",
      description: "A forecasting-focused project exploring demand patterns, time-series behavior, and planning-oriented insights.",
      tags: ["Time Series", "Forecasting", "Statistics"],
      link: "https://github.com/piyush0920"
    }
  ],
  experience: [
    {
      date: "2025 — Present",
      role: "Data Analytics & Supply Planning Focus",
      company: "Professional Development",
      text: "Building practical projects in analytics, business intelligence, demand intelligence, and supply planning."
    },
    {
      date: "Add dates",
      role: "Your role or internship",
      company: "Your organization",
      text: "Replace this section with your actual experience, responsibilities, and measurable achievements."
    }
  ]
};

const $ = (selector) => document.querySelector(selector);

function renderSkills() {
  $("#skills-grid").innerHTML = portfolioData.skills.map(skill => `
    <article class="skill-card reveal">
      <h3>${skill.title}</h3>
      <p>${skill.text}</p>
    </article>
  `).join("");
}

function renderFilters() {
  const categories = ["All", ...new Set(portfolioData.projects.map(p => p.category))];
  $("#project-filters").innerHTML = categories.map((category, i) =>
    `<button class="filter ${i === 0 ? "active" : ""}" data-category="${category}">${category}</button>`
  ).join("");
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderProjects(button.dataset.category);
    });
  });
}

function renderProjects(category = "All") {
  const projects = category === "All"
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === category);

  $("#projects-grid").innerHTML = projects.map((project, index) => `
    <article class="project-card reveal">
      <div class="project-number">0${index + 1}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      <a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">View project ↗</a>
    </article>
  `).join("");
  observeReveals();
}

function renderExperience() {
  $("#experience-list").innerHTML = portfolioData.experience.map(item => `
    <article class="timeline-item reveal">
      <time>${item.date}</time>
      <div>
        <h3>${item.role}</h3>
        <strong>${item.company}</strong>
        <p>${item.text}</p>
      </div>
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
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

$(".menu-toggle").addEventListener("click", () => $(".nav-links").classList.toggle("open"));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => $(".nav-links").classList.remove("open"));
});

$("#theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
  $("#theme-toggle").textContent = dark ? "☾" : "☀";
  localStorage.setItem("theme", dark ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  $("#theme-toggle").textContent = savedTheme === "dark" ? "☀" : "☾";
}

$("#year").textContent = new Date().getFullYear();
renderSkills();
renderFilters();
renderProjects();
renderExperience();
observeReveals();
