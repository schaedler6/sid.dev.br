const phrases = [
  "Tecnologia com identidade própria.",
  "Cybersecurity, AI and automation.",
  "Technology with a personal identity.",
  "Technology with a personal identity."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typing = document.getElementById("typing");

function typeWriter() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typing.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length + 10) deleting = true;
  } else {
    typing.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, deleting ? 35 : 70);
}

typeWriter();

document.getElementById("year").textContent = new Date().getFullYear();

const light = document.querySelector(".mouse-light");

document.addEventListener("mousemove", (event) => {
  light.style.left = event.clientX + "px";
  light.style.top = event.clientY + "px";
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const total = Math.min(120, Math.floor(window.innerWidth / 14));

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.45,
      dy: (Math.random() - 0.5) * 0.45
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();


/* SID_START_9X16_LIGHTBOX_JS */

(function sidGalleryLightbox() {
  const galleryImages = document.querySelectorAll(".gallery-card img");

  if (!galleryImages.length) return;

  const existing = document.querySelector(".sid-lightbox");
  if (existing) existing.remove();

  const lightbox = document.createElement("div");
  lightbox.className = "sid-lightbox";
  lightbox.innerHTML = `
    <div class="sid-lightbox-frame">
      <button class="sid-lightbox-close" type="button" aria-label="Fechar imagem">&times;</button>
      <img src="" alt="Imagem ampliada do projeto SID">
      <div class="sid-lightbox-hint">Clique fora ou aperte ESC para fechar</div>
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".sid-lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Imagem ampliada do projeto SID";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
})();

/* SID_END_9X16_LIGHTBOX_JS */


/* SID_START_GITHUB_JS */

(function sidGithubProjects() {
  const container = document.getElementById("github-projects");
  if (!container) return;

  const GITHUB_USER = "schaedler6";
  const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=9`;

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(value) {
    if (!value) return "";
    try {
      return new Date(value).toLocaleDateString("pt-BR");
    } catch {
      return "";
    }
  }

  function renderFallback() {
    container.innerHTML = `
      <article class="github-card github-empty reveal active">
        <span>GitHub</span>
        <h3>Não foi possível carregar automaticamente</h3>
        <p>
          Verifique a conexão com a internet ou abra o perfil diretamente no GitHub.
        </p>
        <div class="github-links">
          <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">
            Abrir GitHub
          </a>
        </div>
      </article>
    `;
  }

  function renderRepos(repos) {
    const cleanRepos = repos
      .filter(repo => !repo.fork)
      .slice(0, 9);

    if (!cleanRepos.length) {
      renderFallback();
      return;
    }

    container.innerHTML = cleanRepos.map(repo => {
      const name = escapeHtml(repo.name);
      const description = escapeHtml(repo.description || "Projeto público no GitHub.");
      const language = escapeHtml(repo.language || "Repositório");
      const updated = formatDate(repo.updated_at);
      const stars = repo.stargazers_count || 0;
      const htmlUrl = escapeHtml(repo.html_url);
      const homepage = repo.homepage ? escapeHtml(repo.homepage) : "";

      return `
        <article class="github-card reveal active">
          <span>${language}</span>
          <h3>${name}</h3>
          <p>${description}</p>

          <div class="github-meta">
            <small>Atualizado: ${updated}</small>
            <small>Stars: ${stars}</small>
          </div>

          <div class="github-links">
            <a href="${htmlUrl}" target="_blank" rel="noopener noreferrer">Ver código</a>
            ${
              homepage
                ? `<a class="secondary-link" href="${homepage}" target="_blank" rel="noopener noreferrer">Demo</a>`
                : ""
            }
          </div>
        </article>
      `;
    }).join("");
  }

  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar repositórios");
      return response.json();
    })
    .then(renderRepos)
    .catch(renderFallback);
})();

/* SID_END_GITHUB_JS */




// ============================================================
// SID_START_PACMAN_GITHUB_JS_FORCE_20260612
// Troca o card "Carregando repositórios" por animação Pac-Man
// ============================================================

(function () {
  function sidApplyPacmanGithubLoading() {
    const githubBox = document.querySelector("#github-projects");
    if (!githubBox) return;

    const cards = Array.from(githubBox.children);

    cards.forEach(function (card) {
      const text = (card.textContent || "").toLowerCase();

      if (
        text.includes("carregando projetos") ||
        text.includes("carregando repositórios") ||
        text.includes("carregando repositorios") ||
        text.includes("buscando repositórios") ||
        text.includes("buscando repositorios")
      ) {
        card.classList.add("github-pacman-card");

        card.innerHTML = `
          <div class="github-loading-pacman">
            <div class="pacman-scene" aria-hidden="true">
              <div class="pacman"></div>
              <div class="pacman-dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <span class="github-loading-label">GitHub</span>
            <h3>Carregando repositórios...</h3>
            <p>Buscando projetos públicos de @schaedler6.</p>
          </div>
        `;
      }
    });
  }

  sidApplyPacmanGithubLoading();
  setTimeout(sidApplyPacmanGithubLoading, 80);
  setTimeout(sidApplyPacmanGithubLoading, 300);
  setTimeout(sidApplyPacmanGithubLoading, 800);
})();

// SID_END_PACMAN_GITHUB_JS_FORCE_20260612

