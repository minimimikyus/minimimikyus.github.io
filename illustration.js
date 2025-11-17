document.addEventListener("DOMContentLoaded", () => {
  const digitalBtn = document.getElementById("digital-btn");
  const traditionalBtn = document.getElementById("traditional-btn");
  const bio = document.getElementById("bio");
  const digitalGallery = document.getElementById("digital-gallery");
  const traditionalGallery = document.getElementById("traditional-gallery");

  let active = null;

  // --- Hide both galleries initially ---
  [digitalGallery, traditionalGallery].forEach((gallery) => {
    gallery.style.display = "none";
    gallery.style.opacity = "0";
  });

  bio.style.display = "block";
  bio.classList.add("fade-in");

  // --- Preload all gallery images (flash-free version) ---
  function preloadImagesFromContainer(container) {
    const urls = [...container.querySelectorAll("img")].map(img => img.src);

    urls.forEach(url => {
      const pre = new Image();
      pre.src = url;
    });
  }


  preloadImagesFromContainer(digitalGallery);
  preloadImagesFromContainer(traditionalGallery);

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
    el.style.display = "block";

    setTimeout(() => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
      el.style.pointerEvents = "auto";

      if (el.classList.contains("image-grid")) {
        animateImages(el);
      }
    }, 20);
  }

  // --- Apply cascading fade-in to images ---
  function animateImages(container) {
    const images = container.querySelectorAll("img");
    images.forEach((img, index) => {
      img.style.setProperty("--delay", `${index * 0.08}s`);
      img.classList.add("visible");
    });
  }

  // --- Core toggle logic ---
  const showGallery = (gallery, buttonName) => {
    fadeOut(bio);
    fadeOut(digitalGallery);
    fadeOut(traditionalGallery);

    setTimeout(() => fadeIn(gallery), 400);
    active = buttonName;
  };

  const showBio = () => {
    fadeOut(digitalGallery);
    fadeOut(traditionalGallery);

    setTimeout(() => fadeIn(bio), 400);
    active = null;
  };

  // --- Button click behavior ---
  digitalBtn.addEventListener("click", () => {
    if (active === "digital") {
      digitalBtn.classList.remove("active-btn");
      showBio();
    } else {
      digitalBtn.classList.add("active-btn");
      traditionalBtn.classList.remove("active-btn");
      showGallery(digitalGallery, "digital");
    }
  });

  traditionalBtn.addEventListener("click", () => {
    if (active === "traditional") {
      traditionalBtn.classList.remove("active-btn");
      showBio();
    } else {
      traditionalBtn.classList.add("active-btn");
      digitalBtn.classList.remove("active-btn");
      showGallery(traditionalGallery, "traditional");
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


// =========================================================
// PROCESS-IMAGE FEATURE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const allImages = document.querySelectorAll(".image-grid img");
  const overlay = document.querySelector(".image-overlay");
  const overlayImg = overlay.querySelector("img");

  // Create the "Display Process" button
  const processBtn = document.createElement("button");
  processBtn.classList.add("process-btn");
  processBtn.textContent = "Display Process";
  overlay.appendChild(processBtn);

  // Create a secondary overlay for process images
  const processOverlay = document.createElement("div");
  processOverlay.classList.add("process-overlay");
  document.body.appendChild(processOverlay);

  // Handle click on any image
  allImages.forEach((img) => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlay.classList.add("active");

      if (img.dataset.process === "true" && img.dataset.processImages) {
        processBtn.style.display = "block";
        processBtn.onclick = () =>
          showProcessImages(img.dataset.processImages.split(","));
      } else {
        processBtn.style.display = "none";
      }
    });
  });

  // Clicking process button shows process overlay
  function showProcessImages(imageList) {
    processOverlay.innerHTML = "";
    imageList.forEach((src) => {
      const stepImg = document.createElement("img");
      stepImg.src = src.trim();
      processOverlay.appendChild(stepImg);
    });
    processOverlay.classList.add("active");
  }

  // Close overlays
  processOverlay.addEventListener("click", () => {
    processOverlay.classList.remove("active");
  });
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    processBtn.style.display = "none";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
      processOverlay.classList.remove("active");
      processBtn.style.display = "none";
    }
  });
});
