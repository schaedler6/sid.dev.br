(function () {
  const curatedItems = [
    {
      src: "assets/images/galeria-curada/kabbalahsite.PNG",
      title: "Kabbalah Studio",
      tag: "Identidade visual e simbologia",
      alt: "Arte visual do projeto Kabbalah Studio com estética simbólica e espiritual."
    },
    {
      src: "assets/images/galeria-curada/sid_visual.JPG",
      title: "SID Visual",
      tag: "Experimentos com IA criativa",
      alt: "Experimento visual autoral do ecossistema digital SID."
    },
    {
      src: "assets/images/galeria-curada/capanova.png",
      title: "Minha Vó Era Vida Loca",
      tag: "Projeto editorial e KDP",
      alt: "Capa oficial do livro Minha Vó Era Vida Loca e Agora é Gamer."
    },
    {
      src: "assets/images/galeria-curada/IMG_8637.PNG",
      title: "Livro Gamer",
      tag: "Criação digital",
      alt: "Arte promocional digital do livro Minha Vó Era Vida Loca e Agora é Gamer."
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

  function applyCuratedGallery() {
    const gallery =
      document.querySelector("#galeria") ||
      document.querySelector("#gallery") ||
      document.querySelector(".gallery");

    if (!gallery) return;

    const heading = gallery.querySelector(".section-heading, .gallery-heading, .section-title") || gallery;

    const h2 = heading.querySelector("h2");
    if (h2) h2.textContent = "Projetos Visuais e Autorais";

    let paragraph = heading.querySelector("p");
    if (!paragraph && h2) {
      paragraph = document.createElement("p");
      h2.insertAdjacentElement("afterend", paragraph);
    }

    if (paragraph) {
      paragraph.textContent =
        "Uma seleção curada de imagens, capas, identidades visuais e experimentos criativos ligados aos meus projetos digitais, editoriais e autorais.";
    }

    const images = Array.from(gallery.querySelectorAll("img"));
    const cards = [];

    images.forEach(function (img) {
      const card = closestCard(img);
      if (card && !cards.includes(card)) cards.push(card);
    });

    cards.forEach(function (card, index) {
      if (index > 3) {
        card.classList.add("sid-gallery-hidden-extra");
        card.style.display = "none";
        return;
      }

      const item = curatedItems[index];

      card.classList.add("sid-gallery-curated-card");
      card.style.display = "";

      const img = card.querySelector("img");
      if (img) {
        img.src = item.src + "?v=troca-fotos-20260612";
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
        title.insertAdjacentElement("afterend", tag);
      }

      tag.textContent = item.tag;

      const repeated = Array.from(card.querySelectorAll("p, span")).filter(function (el) {
        const txt = (el.textContent || "").trim().toLowerCase();
        return txt === "imagem do projeto sid" || txt === "sid visual";
      });

      repeated.forEach(function (el) {
        if (!el.classList.contains("sid-gallery-tag")) {
          el.remove();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCuratedGallery);
  } else {
    applyCuratedGallery();
  }

  setTimeout(applyCuratedGallery, 300);
  setTimeout(applyCuratedGallery, 900);
  setTimeout(applyCuratedGallery, 1600);
})();

