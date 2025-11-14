document.addEventListener("DOMContentLoaded", () => {
  const cilBtn = document.getElementById("CIL-btn");
  const printsBtn = document.getElementById("prints-btn");
  const illustrationBtn = document.getElementById("illustration-btn");
  const bio = document.getElementById("bio");
  const cilGallery = document.getElementById("CIL-gallery");
  const printsGallery = document.getElementById("prints-gallery");
  const illustrationGallery = document.getElementById("illustration-gallery");

  let active = null;

  // --- Hide both galleries initially ---
  [cilGallery, printsGallery, illustrationGallery].forEach((gallery) => {
    gallery.style.display = "none";
    gallery.style.opacity = "0";
  });

  // --- Preload all gallery images for instant switch ---
  const preloadImages = (container) => {
    container.querySelectorAll("img").forEach((img) => {
      const pre = new Image();
      pre.decoding = "async";
      pre.loading = "eager";
      pre.src = img.src;
    });
  };

  preloadImages(cilGallery);
  preloadImages(printsGallery);
  preloadImages(illustrationGallery);

  // --- Fade helpers ---
  function fadeOut(el) {
    el.classList.remove("fade-in");
    el.classList.add("fade-out");
    el.style.pointerEvents = "none";
    setTimeout(() => {
      el.style.display = "none";
    }, 350);
  }

  function fadeIn(el) {
  if (el.classList.contains("image-grid")) {
    el.style.display = "block"; // works best with CSS columns
  } else {
    el.style.display = "block";
  }

  setTimeout(() => {
    el.classList.remove("fade-out");
    el.classList.add("fade-in");
    el.style.pointerEvents = "auto";

    // Trigger image animations
    if (el.classList.contains("image-grid")) {
      animateImages(el);
    }
  }, 20);
}


  // --- Apply cascading fade-in to images ---
  function animateImages(container) {
    const images = container.querySelectorAll("img");
    images.forEach((img, index) => {
      // apply staggered delay
      img.style.setProperty("--delay", `${index * 0.08}s`);
      img.classList.add("visible");
    });
  }


  // --- Core toggle logic ---
  const showGallery = (gallery, buttonName) => {
    fadeOut(bio);
    fadeOut(cilGallery);
    fadeOut(printsGallery);
    fadeOut(illustrationGallery);
    setTimeout(() => fadeIn(gallery), 400);
    active = buttonName;
  };

  const showBio = () => {
    fadeOut(cilGallery);
    fadeOut(printsGallery);
    fadeOut(illustrationGallery);
    setTimeout(() => fadeIn(bio), 400);
    active = null;
  };

  // --- Button click behavior ---
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
// IMAGE CLICK FOCUS FUNCTIONALITY
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const allImages = document.querySelectorAll(".image-grid img");

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");
  const overlayImg = document.createElement("img");
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  // Open overlay on click
  allImages.forEach((img) => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlay.classList.add("active");
    });
  });

  // Close overlay on click or Esc
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
    }
  });
});

