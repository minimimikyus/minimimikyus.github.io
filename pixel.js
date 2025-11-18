document.addEventListener("DOMContentLoaded", () => {
  const baitBtn = document.getElementById("bait-btn");
  const characterBtn = document.getElementById("character-btn");

  const baitGallery = document.getElementById("bait-gallery");
  const characterGallery = document.getElementById("character-gallery");

  const bio = document.querySelector(".dc-text-box");
  const dcProfile = document.querySelector(".dc-profile");

  let active = null;

  // Hide galleries initially
  [baitGallery, characterGallery].forEach((g) => {
    g.style.display = "none";
    g.style.opacity = "0";
  });

  // Show bio + profile on load
  bio.style.display = "block";
  bio.classList.add("fade-in");
  dcProfile.style.display = "flex";
  dcProfile.classList.add("fade-in");

  // --- Preload images ---
  function preloadImagesFromContainer(container) {
    const urls = [...container.querySelectorAll("img")].map(img => img.src);
    urls.forEach(url => {
      const pre = new Image();
      pre.src = url;
    });
  }
  preloadImagesFromContainer(baitGallery);
  preloadImagesFromContainer(characterGallery);

  // --- Fade helpers ---
  function fadeOut(el) {
    if (!el) return;
    el.classList.remove("fade-in");
    el.classList.add("fade-out");
    el.style.pointerEvents = "none";

    setTimeout(() => {
      el.style.display = "none";
    }, 350);
  }

  function fadeIn(el) {
    if (!el) return;
    el.style.display = el.classList.contains("dc-profile") ? "flex" : "block";

    setTimeout(() => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
      el.style.pointerEvents = "auto";

      if (el.classList.contains("image-grid")) {
        animateImages(el);
      }
    }, 20);
  }

  // Animate images in a cascading stagger
  function animateImages(container) {
    const images = container.querySelectorAll("img");
    images.forEach((img, index) => {
      img.style.setProperty("--delay", `${index * 0.08}s`);
      img.classList.add("visible");
    });
  }

  // --- Show gallery ---
  const showGallery = (gallery, name) => {
    fadeOut(bio);
    fadeOut(dcProfile);
    fadeOut(baitGallery);
    fadeOut(characterGallery);

    setTimeout(() => fadeIn(gallery), 400);
    active = name;
  };

  // --- Show bio ---
  const showBio = () => {
    fadeOut(baitGallery);
    fadeOut(characterGallery);

    setTimeout(() => {
      fadeIn(bio);
      fadeIn(dcProfile);
    }, 400);

    active = null;
  };

  // --- Button logic ---
  baitBtn.addEventListener("click", () => {
    if (active === "bait") {
      baitBtn.classList.remove("active-btn");
      showBio();
    } else {
      baitBtn.classList.add("active-btn");
      characterBtn.classList.remove("active-btn");
      showGallery(baitGallery, "bait");
    }
  });

  characterBtn.addEventListener("click", () => {
    if (active === "character") {
      characterBtn.classList.remove("active-btn");
      showBio();
    } else {
      characterBtn.classList.add("active-btn");
      baitBtn.classList.remove("active-btn");
      showGallery(characterGallery, "character");
    }
  });
});


// =========================================================
// IMAGE CLICK FOCUS FUNCTIONALITY
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const allImages = document.querySelectorAll(".image-grid img");

  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");

  const overlayImg = document.createElement("img");
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  allImages.forEach((img) => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", () => overlay.classList.remove("active"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("active");
  });
});
