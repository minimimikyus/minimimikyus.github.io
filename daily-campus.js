document.addEventListener("DOMContentLoaded", () => {
  const cilBtn = document.getElementById("CIL-btn");
  const printsBtn = document.getElementById("prints-btn");
  const illustrationBtn = document.getElementById("illustration-btn");

  // The bio text box (right of the logo)
  const bio = document.querySelector(".dc-text-box");

  // The whole left+right block (logo + bio)
  const dcProfile = document.querySelector(".dc-profile");

  const cilGallery = document.getElementById("CIL-gallery");
  const printsGallery = document.getElementById("prints-gallery");
  const illustrationGallery = document.getElementById("illustration-gallery");

  let active = null;

  // Hide galleries
  [cilGallery, printsGallery, illustrationGallery].forEach(gallery => {
    gallery.style.display = "none";
    gallery.style.opacity = "0";
  });

  // Preload
  function preloadImagesFromContainer(container) {
    const urls = [...container.querySelectorAll("img")].map(img => img.src);
    urls.forEach(src => {
      const pre = new Image();
      pre.src = src;
    });
  }
  preloadImagesFromContainer(cilGallery);
  preloadImagesFromContainer(printsGallery);
  preloadImagesFromContainer(illustrationGallery);

  // Fade helpers
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

    // ⭐ FIXED — force correct display mode
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

  function animateImages(container) {
    const images = container.querySelectorAll("img");
    images.forEach((img, index) => {
      img.style.setProperty("--delay", `${index * 0.08}s`);
      img.classList.add("visible");
    });
  }

  // Core toggle logic
  const showGallery = (gallery, name) => {
    fadeOut(bio);
    fadeOut(dcProfile);
    fadeOut(cilGallery);
    fadeOut(printsGallery);
    fadeOut(illustrationGallery);

    setTimeout(() => fadeIn(gallery), 400);
    active = name;
  };

  const showBio = () => {
    fadeOut(cilGallery);
    fadeOut(printsGallery);
    fadeOut(illustrationGallery);

    setTimeout(() => {
      fadeIn(bio);
      fadeIn(dcProfile); // stays flex now!
    }, 400);

    active = null;
  };

  // Buttons
  cilBtn.addEventListener("click", () => {
    if (active === "cil") {
      cilBtn.classList.remove("active-btn");
      showBio();
    } else {
      cilBtn.classList.add("active-btn");
      printsBtn.classList.remove("active-btn");
      illustrationBtn.classList.remove("active-btn");
      showGallery(cilGallery, "cil");
    }
  });

  printsBtn.addEventListener("click", () => {
    if (active === "prints") {
      printsBtn.classList.remove("active-btn");
      showBio();
    } else {
      printsBtn.classList.add("active-btn");
      cilBtn.classList.remove("active-btn");
      illustrationBtn.classList.remove("active-btn");
      showGallery(printsGallery, "prints");
    }
  });

  illustrationBtn.addEventListener("click", () => {
    if (active === "illustration") {
      illustrationBtn.classList.remove("active-btn");
      showBio();
    } else {
      illustrationBtn.classList.add("active-btn");
      cilBtn.classList.remove("active-btn");
      printsBtn.classList.remove("active-btn");
      showGallery(illustrationGallery, "illustration");
    }
  });
});

// =========================================================
// IMAGE CLICK FOCUS
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
