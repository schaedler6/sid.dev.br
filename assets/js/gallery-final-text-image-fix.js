(function () {
  const items = [
    {
      title: "Kabbalah Studio",
      tag: "IDENTIDADE VISUAL E SIMBOLOGIA",
      alt: "Arte visual do projeto Kabbalah Studio com identidade visual e simbologia."
    },
    {
      title: "SID Visual",
      tag: "EXPERIMENTO VISUAL COM IA",
      alt: "Retrato visual autoral de SID criado como experimento com inteligência artificial."
    },
    {
      title: "Minha Vó Era Vida Loca e Agora é Gamer",
      tag: "DESIGN EDITORIAL E KDP",
      alt: "Capa do livro Minha Vó Era Vida Loca e Agora é Gamer."
    },
    {
      title: "Criação Digital SID",
      tag: "CRIAÇÃO DIGITAL",
      alt: "Imagem de criação digital autoral do ecossistema SID."
    }
  ];

  function closestCard(img) {
    return (
      img.closest("article") ||
      img.closest(".gallery-card") ||
      img.closest(".media-card") ||
      img.closest(".image-card") ||
      img.closest(".visual-card") ||
      img.closest("li") ||
      img.parentElement
    );
  }

  function applyFinalGalleryFix() {
    const gallery =
      document.querySelector("#galeria") ||
      document.querySelector("#gallery") ||
      document.querySelector(".gallery");

    if (!gallery) return;

    gallery.classList.add("sid-gallery-final-wide");

    const images = Array.from(gallery.querySelectorAll("img"));
    const cards = [];

    images.forEach(function (img) {
      const card = closestCard(img);
      if (card && !cards.includes(card)) cards.push(card);
    });

    cards.forEach(function (card, index) {
      if (index > 3) {
        card.style.display = "none";
        card.classList.add("sid-gallery-hidden-extra");
        return;
      }

      const item = items[index];

      card.classList.add("sid-gallery-final-card");
      card.style.display = "";

      const img = card.querySelector("img");
      if (img) {
        img.alt = item.alt;
      }

      let title =
        card.querySelector("h3") ||
        card.querySelector("h4") ||
        card.querySelector("strong");

      if (!title) {
        title = document.createElement("h3");
        card.appendChild(title);
      }

      title.textContent = item.title;

      let tag = card.querySelector(".sid-gallery-tag");

      if (!tag) {
        tag = document.createElement("p");
        tag.className = "sid-gallery-tag";
        title.insertAdjacentElement("beforebegin", tag);
      }

      tag.textContent = item.tag;

      Array.from(card.querySelectorAll("p, span")).forEach(function (el) {
        const txt = (el.textContent || "").trim().toLowerCase();

        if (
          txt === "peça promocional digital" ||
          txt === "peça promocional digita" ||
          txt === "divulgação editorial digital" ||
          txt === "imagem do projeto sid" ||
          txt === "sid visual"
        ) {
          if (!el.classList.contains("sid-gallery-tag")) {
            el.remove();
          }
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFinalGalleryFix);
  } else {
    applyFinalGalleryFix();
  }

  setTimeout(applyFinalGalleryFix, 300);
  setTimeout(applyFinalGalleryFix, 900);
  setTimeout(applyFinalGalleryFix, 1600);
})();
