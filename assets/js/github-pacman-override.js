(function () {
  const PACMAN_SVG = "=20260612-sidloto";
  const SIDLOTO_URL = "https://github.com/schaedler6/Sidloto.git";

  function githubShowcaseHtml() {
    return 
      <div class="sid-github-showcase-grid">
        <article class="sid-github-pacman-card reveal active">
          <span class="sid-github-card-kicker">PAC-MAN DE CONTRIBUIÇÕES</span>

          <div class="sid-github-pacman-frame">
            <img src="\" alt="Pac-Man de contribuições GitHub de Sid Schaedler">
          </div>

          <p>
            Visualização autoral do gráfico de contribuições do GitHub em estilo Pac-Man.
          </p>

          <a href="https://github.com/schaedler6" target="_blank" rel="noopener noreferrer">
            ABRIR PERFIL GITHUB
          </a>
        </article>

        <article class="sid-github-sidloto-card reveal active">
          <span class="sid-github-card-kicker">REPOSITÓRIO EM DESTAQUE</span>

          <div class="sid-sidloto-header">
            <div class="sid-sidloto-icon">SL</div>
            <div>
              <h3>Sidloto</h3>
              <p class="sid-sidloto-subtitle">Python • Análise • Combinações • Interface Web</p>
            </div>
          </div>

          <p>
            Aplicativo autoral em Python para análise, organização e geração de combinações,
            com foco em estudo lógico, automação e interface web.
          </p>

          <div class="sid-sidloto-tags">
            <span>Python</span>
            <span>Automação</span>
            <span>Análise</span>
            <span>Web</span>
          </div>

          <a href="\" target="_blank" rel="noopener noreferrer">
            ABRIR SIDLOTO
          </a>
        </article>
      </div>
    ;
  }

  function applyGithubShowcase() {
    const box = document.querySelector("#github-projects");
    if (!box) return;

    box.innerHTML = githubShowcaseHtml();
    box.classList.add("sid-github-showcase-wrapper");
    box.style.display = "block";
    box.style.visibility = "visible";
    box.style.opacity = "1";
  }

  function startGithubShowcase() {
    applyGithubShowcase();

    setTimeout(applyGithubShowcase, 200);
    setTimeout(applyGithubShowcase, 800);
    setTimeout(applyGithubShowcase, 1500);

    const observer = new MutationObserver(function () {
      const box = document.querySelector("#github-projects");
      if (!box) return;

      if (!box.querySelector(".sid-github-showcase-grid")) {
        applyGithubShowcase();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log("SID GitHub showcase: Pac-Man + Sidloto loaded");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startGithubShowcase);
  } else {
    startGithubShowcase();
  }
})();
