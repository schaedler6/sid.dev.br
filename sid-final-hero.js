(function () {
  const heroText =
    "Estudante de ADS na Feevale, criando projetos com IA local, automação, servidores e cibersegurança defensiva.";

  const secondaryText =
    "Construo laboratórios defensivos, assistentes locais, automações com PowerShell/Python e sistemas que transformam conhecimento em ferramenta.";

  function applyHeroFinal() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const h1 = hero.querySelector("h1");
    if (h1) {
      h1.innerHTML = "Sid<br><span>Schaedler</span>";
    }

    const typing = document.getElementById("typing");
    if (typing) {
      typing.textContent = heroText;
      typing.classList.add("hero-subtitle");
    }

    const paragraphs = Array.from(hero.querySelectorAll("p"));
    const bodyParagraph = paragraphs.find(p =>
      !p.classList.contains("eyebrow") &&
      (
        p.textContent.includes("portfólio fluido") ||
        p.textContent.includes("inteligência artificial") ||
        p.textContent.includes("cyber segurança") ||
        p.textContent.includes("sistemas que transformam")
      )
    );

    if (bodyParagraph) {
      bodyParagraph.textContent = secondaryText;
    }

    const actions = hero.querySelector(".actions");
    if (actions) {
      actions.classList.add("hero-cta-grid");
      actions.innerHTML = `
        <a href="#projetos" class="btn primary">VER PROJETOS TÉCNICOS</a>
        <a href="https://github.com/schaedler6" class="btn secondary" target="_blank" rel="noopener noreferrer">ABRIR GITHUB</a>
        <a href="https://www.linkedin.com/in/sidschaedler/" class="btn secondary" target="_blank" rel="noopener noreferrer">VER LINKEDIN</a>
        <a href="#contato" class="btn secondary">CONTATO PROFISSIONAL</a>
      `;
    }
  }

  document.addEventListener("DOMContentLoaded", applyHeroFinal);
  window.addEventListener("load", function () {
    applyHeroFinal();

    // Só trava texto/botões. Não toca em canvas, partículas ou orbe.
    let n = 0;
    const timer = setInterval(function () {
      applyHeroFinal();
      n++;
      if (n > 40) clearInterval(timer);
    }, 100);
  });
})();
