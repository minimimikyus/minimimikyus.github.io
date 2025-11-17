document.addEventListener("DOMContentLoaded", () => {
  const baitBtn = document.getElementById("bait-btn");
  const characterBtn = document.getElementById("character-btn");
  const bio = document.getElementById("bio");
  const baitGallery = document.getElementById("bait-gallery");
  const characterGallery = document.getElementById("character-gallery");

  let active = null;

  // --- Hide both galleries initially ---
  [baitGallery, characterGallery].forEach((gallery) => {
    gallery.style.display = "none";
    gallery.style.opacity = "0";
  });

  // --- Preload all gallery images for instant switch ---
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
    fadeOut(baitGallery);
    fadeOut(characterGallery);
    setTimeout(() => fadeIn(gallery), 400);
    active = buttonName;
  };

  const showBio = () => {
    fadeOut(baitGallery);
    fadeOut(characterGallery);
    setTimeout(() => fadeIn(bio), 400);
    active = null;
  };

  // --- Button click behavior ---
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

