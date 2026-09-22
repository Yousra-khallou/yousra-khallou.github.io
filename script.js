/**
 * Data Scientist & Data Engineer Portfolio Logic
 * Yousra Khallou — Interactive Experience
 */

const USER_PROFILE = {
  name: "Yousra Khallou",
  role: "Data Scientist & Data Engineer",
  email: "khallouyoussra84@gmail.com",
  github: "https://github.com/Yousra-khallou",
  linkedin: "https://www.linkedin.com/in/yousra-khallou",
  resumePath: "assets/CV_khallou_yousra.pdf",
  avatar: "assets/image profil.png"
};

const dualProjects = [
  {
    title: "TaaSim — Big Data Urban Mobility Platform",
    tag: "Streaming & Big Data",
    description: "End-to-end Kappa architecture optimizing taxi supply and demand in Casablanca (4M citizens). Map-matched 1.7M GPS trips onto the Casablanca OSM road network using PySpark UDFs & KD-Tree spatial indexing. Features an Apache Flink streaming pipeline (3 jobs), Spark MLlib forecasting, Cassandra/MinIO storage, and live Grafana telemetry.",
    tech: ["Apache Kafka", "Apache Flink", "Apache Spark 3.5", "MinIO", "Cassandra", "Grafana", "OSMnx", "Docker"],
    image: "assets/projects/taasimarchitect.png",
    github: "https://github.com/Yousra-khallou/taasim-platform"
  },
  {
    title: "MedVQA — Visual Question Answering for Radiology Images",
    tag: "Multimodal AI & Deep Learning",
    description: "Multimodal Deep Learning research project for Medical Visual Question Answering on radiology images. Employs vision backbones aligned with clinical question embeddings through Cross-Attention reasoning and multimodal fusion for accurate diagnostic question answering.",
    tech: ["PyTorch", "Deep Learning", "Computer Vision", "Transformers", "Medical AI", "Python"],
    image: "assets/projects/medvqaarchitect.png",
    github: "https://github.com/Yousra-khallou/Visual-Question-Answering-for-Radiology-Images-Medical-AI-Research-Project"
  },
  {
    title: "AI Telecom Customer Retention System",
    tag: "Machine Learning & NLP",
    description: "End-to-end customer retention intelligence system unifying 3 AI models: churn prediction via XGBoost on IBM Telco dataset (~7k customers, F1 ~0.72), multilingual NLP sentiment analysis with fine-tuned DistilBERT (accuracy 89%), and hybrid SVD collaborative recommendations. Deployed as 2 FastAPI microservices on HuggingFace Spaces with a React dashboard on Vercel.",
    tech: ["Python", "XGBoost", "DistilBERT", "HuggingFace", "FastAPI", "React", "Docker", "Vercel"],
    image: "assets/projects/telcoarchitect.png",
    github: "https://github.com/Yousra-khallou/AI-Telecom-Customer-Retention-System",
    liveDemo: "https://telecom-retention-system.vercel.app",
    apiDocs: "https://usraai-telecom-churn-reco.hf.space/docs"
  },
  {
    title: "Job Intelligent — Medallion Lakehouse & RecSys",
    tag: "Data Lakehouse & NLP",
    description: "Automated ETL lakehouse platform orchestrated by Apache Airflow: multi-source data ingestion, Medallion Lakehouse architecture (Bronze/Silver/Gold) with PySpark and MinIO. Features a Sentence-BERT NLP semantic matching engine served via FastAPI, PostgreSQL storage, and Power BI dashboards.",
    tech: ["Apache Airflow", "PySpark", "MinIO", "dbt Core", "Sentence-BERT", "PostgreSQL", "Power BI", "FastAPI"],
    image: "assets/projects/jobintelarchitect.png",
    github: "https://github.com/Yousra-khallou/job-intelligent"
  },
  {
    title: "Distributed Marketplace Catalog — MongoDB Sharding",
    tag: "Distributed Databases & Sharding",
    description: "Distributed product catalog architecture for e-commerce marketplaces (Olist dataset) built on a MongoDB sharded cluster. Implemented an Apache Kafka event streaming pipeline to ingest, route, and balance catalog queries across shards, complete with real-time monitoring.",
    tech: ["MongoDB Sharding", "Apache Kafka", "Docker Compose", "Python", "Pandas"],
    image: "assets/projects/mongoshardedarchitect.png",
    github: "https://github.com/Yousra-khallou/marketplace-distributed-catalog-mongodb_sharded-"
  }
];

// Hydrate Projects Grid
const projectsContainer = document.getElementById("dualProjectsGrid");
if (projectsContainer) {
  dualProjects.forEach(proj => {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    const techPills = proj.tech
      .map(t => `<span>${t}</span>`)
      .join("");

    let actionLinks = "";
    if (proj.liveDemo) {
      actionLinks += `<a class="project-action-btn demo-btn" href="${proj.liveDemo}" target="_blank" rel="noreferrer">Live Demo ↗</a>`;
    }
    if (proj.apiDocs) {
      actionLinks += `<a class="project-action-btn" href="${proj.apiDocs}" target="_blank" rel="noreferrer">API Docs ↗</a>`;
    }
    if (proj.github) {
      actionLinks += `<a class="project-gh-btn" href="${proj.github}" target="_blank" rel="noreferrer" aria-label="Open ${proj.title} on GitHub">GH</a>`;
    }

    card.innerHTML = `
      <div class="project-thumb clickable-thumb" data-zoom-img="${proj.image}" data-zoom-title="${proj.title}" role="button" tabindex="0" aria-label="Zoom architecture for ${proj.title}">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy" onerror="this.style.display='none'">
        <div class="thumb-zoom-overlay">
          <svg class="ui-icon zoom-icon" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          <span>Click to View Architecture</span>
        </div>
      </div>
      <div class="project-details">
        <div class="project-meta-top">
          <span class="project-tag">${proj.tag}</span>
          <div class="project-actions">
            ${actionLinks}
          </div>
        </div>
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <div class="project-tech-pills">
          ${techPills}
        </div>
      </div>
    `;
    projectsContainer.appendChild(card);
  });
}

// Lightbox Architecture Zoom Logic
const lightbox = document.getElementById("architectureLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxRawLink = document.getElementById("lightboxRawLink");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");

function openLightbox(imgSrc, title) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = imgSrc;
  lightboxImg.alt = title;
  if (lightboxTitle) lightboxTitle.textContent = title;
  if (lightboxRawLink) lightboxRawLink.href = imgSrc;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Attach zoom triggers to project cards
document.querySelectorAll(".clickable-thumb").forEach(thumb => {
  thumb.addEventListener("click", (e) => {
    e.preventDefault();
    const imgSrc = thumb.getAttribute("data-zoom-img");
    const title = thumb.getAttribute("data-zoom-title") || "System Architecture";
    openLightbox(imgSrc, title);
  });

  thumb.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const imgSrc = thumb.getAttribute("data-zoom-img");
      const title = thumb.getAttribute("data-zoom-title") || "System Architecture";
      openLightbox(imgSrc, title);
    }
  });
});

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// Interactive Contact Form Handler (Opens prefilled mail client)
const contactForm = document.getElementById("portfolioContactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName")?.value || "";
    const email = document.getElementById("senderEmail")?.value || "";
    const subject = document.getElementById("emailSubject")?.value || "Opportunité PFE 2027";
    const message = document.getElementById("emailMessage")?.value || "";

    const fullBody = `Bonjour Yousra,\n\n${message}\n\n---\nExpéditeur: ${name}\nEmail: ${email}`;
    const mailtoUrl = `mailto:${USER_PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;

    const submitBtn = document.getElementById("submitContactBtn");
    if (submitBtn) {
      const span = submitBtn.querySelector("span");
      if (span) span.textContent = "Ouverture messagerie...";
      setTimeout(() => {
        if (span) span.textContent = "Envoyer le message";
      }, 3000);
    }

    window.location.href = mailtoUrl;
  });
}

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Footer dynamic year
const currentYearEl = document.getElementById("currentYear");
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

// Ambient cursor glow tracking
const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// 1-Click Copy Email Button
const copyEmailBtn = document.getElementById("connectCopyEmailBtn");
const emailActionBtn = document.getElementById("connectEmailAction");
if (copyEmailBtn) {
  copyEmailBtn.setAttribute("data-email", USER_PROFILE.email);
  if (emailActionBtn) emailActionBtn.href = `mailto:${USER_PROFILE.email}`;

  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyEmailBtn.dataset.email);
      const span = copyEmailBtn.querySelector("span");
      if (span) {
        const prevText = span.textContent;
        span.textContent = "Email Copié ✓";
        copyEmailBtn.style.color = "var(--raspberry)";
        setTimeout(() => {
          span.textContent = prevText;
          copyEmailBtn.style.color = "";
        }, 2200);
      }
    } catch (e) {
      window.prompt("Copier l'adresse email :", copyEmailBtn.dataset.email);
    }
  });
}

// User Profile Data Bindings
const brandPhoto = document.getElementById("brandPhoto");
const brandName = document.getElementById("brandName");
const footerBrandTitle = document.getElementById("footerBrandTitle");
const connectLinkedInLink = document.getElementById("connectLinkedInLink");
const connectGitHubLink = document.getElementById("connectGitHubLink");
const connectResumeLink = document.getElementById("connectResumeLink");
const heroResumeLink = document.getElementById("heroResumeLink");

if (brandPhoto && USER_PROFILE.avatar) brandPhoto.src = USER_PROFILE.avatar;
if (brandName) brandName.textContent = USER_PROFILE.name;
if (footerBrandTitle) footerBrandTitle.textContent = `${USER_PROFILE.name} · Portfolio`;
if (connectLinkedInLink) connectLinkedInLink.href = USER_PROFILE.linkedin;
if (connectGitHubLink) connectGitHubLink.href = USER_PROFILE.github;
if (connectResumeLink) connectResumeLink.href = USER_PROFILE.resumePath;
if (heroResumeLink) heroResumeLink.href = USER_PROFILE.resumePath;

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.querySelector(".desktop-nav");
if (menuToggle && desktopNav) {
  menuToggle.addEventListener("click", () => {
    desktopNav.classList.toggle("mobile-active");
  });
  desktopNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => desktopNav.classList.remove("mobile-active"));
  });
}
