(function () {
  const labels = [
    {
      title: "Kabbalah Studio",
      tag: "Identidade visual e simbologia",
      alt: "Arte visual do projeto Kabbalah Studio com estética simbólica e espiritual."
    },
    {
      title: "SID Visual",
      tag: "Experimento visual com IA",
      alt: "Retrato criativo de Sid Schaedler em estética digital e autoral."
    },
    {
      title: "Livro — Minha Vó Era Vida Loca",
      tag: "Design editorial e KDP",
      alt: "Capa do livro Minha Vó Era Vida Loca e Agora é Gamer."
    },
    {
      title: "Campanha do Livro",
      tag: "Peça promocional digital",
      alt: "Material visual promocional do livro Minha Vó Era Vida Loca e Agora é Gamer."
    },
    {
      title: "Livro Gamer",
      tag: "Divulgação editorial",
      alt: "Arte colorida de divulgação do livro gamer de Sid Schaedler."
    },
    {
      title: "Projeto Autoral SID",
      tag: "Identidade criativa",
      alt: "Imagem de projeto autoral do ecossistema digital SID."
    },
    {
      title: "Música Autoral",
      tag: "Identidade sonora e visual",
      alt: "Imagem relacionada aos projetos musicais de Sid Schaedler no Spotify."
    },
    {
      title: "Experimento IA",
      tag: "Arte generativa",
      alt: "Experimento visual criado com inteligência artificial para portfólio."
    }
  ];

  function cleanText(text) {
    return (text || "").trim().toLowerCase();
  }

  function applyGalleryLabels() {
    const gallery =
      document.querySelector("#galeria") ||
      document.querySelector("#gallery") ||
      document.querySelector(".gallery");

    if (!gallery) return;

    const images = Array.from(gallery.querySelectorAll("img"));

    images.forEach(function (img, index) {
      const data = labels[index % labels.length];

      img.alt = data.alt;

      const card =
        img.closest("article") ||
        img.closest(".gallery-card") ||
        img.closest(".media-card") ||
        img.closest(".image-card") ||
        img.closest("div");

      if (!card) return;

      const textNodes = Array.from(card.querySelectorAll("h3, h4, p, span, strong"));

      textNodes.forEach(function (node) {
        const text = cleanText(node.textContent);

        if (
          text === "imagem do projeto sid" ||
          text === "sid visual"
        ) {
          if (node.tagName === "H3" || node.tagName === "H4" || node.tagName === "STRONG") {
            node.textContent = data.title;
          } else {
            node.textContent = data.tag;
          }
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyGalleryLabels);
  } else {
    applyGalleryLabels();
  }

  setTimeout(applyGalleryLabels, 300);
  setTimeout(applyGalleryLabels, 900);
})();
