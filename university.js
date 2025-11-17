document.addEventListener("DOMContentLoaded", () => {
  const paintingBtn = document.getElementById("painting-btn");
  const drawingBtn = document.getElementById("drawing-btn");
  const bio = document.getElementById("bio");
  const paintingGallery = document.getElementById("painting-gallery");
  const drawingGallery = document.getElementById("drawing-gallery");

  let active = null;

  // --- Hide both galleries initially ---
  [paintingGallery, drawingGallery].forEach((gallery) => {
    gallery.style.display = "none";
    gallery.style.opacity = "0";
  });

  bio.style.display = "block";
  bio.classList.add("fade-in");

  // --- Preload all gallery images for instant switch ---
  function preloadImagesFromContainer(container) {
    const urls = [...container.querySelectorAll("img")].map(img => img.src);

    urls.forEach(url => {
      const pre = new Image();
      pre.src = url;
    });
  }

  preloadImagesFromContainer(paintingGallery);
  preloadImagesFromContainer(drawingGallery);

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
    fadeOut(paintingGallery);
    fadeOut(drawingGallery);
    setTimeout(() => fadeIn(gallery), 400);
    active = buttonName;
  };

  const showBio = () => {
    fadeOut(paintingGallery);
    fadeOut(drawingGallery);
    setTimeout(() => fadeIn(bio), 400);
    active = null;
  };

  // --- Button click behavior ---
  paintingBtn.addEventListener("click", () => {
    if (active === "painting") {
      paintingBtn.classList.remove("active-btn");
      showBio();
    } else {
      paintingBtn.classList.add("active-btn");
      drawingBtn.classList.remove("active-btn");
      showGallery(paintingGallery, "painting");
    }
  });

  drawingBtn.addEventListener("click", () => {
    if (active === "drawing") {
      drawingBtn.classList.remove("active-btn");
      showBio();
    } else {
      drawingBtn.classList.add("active-btn");
      paintingBtn.classList.remove("active-btn");
      showGallery(drawingGallery, "drawing");
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

      // Check if the image has process data
      if (img.dataset.process === "true" && img.dataset.processImages) {
        processBtn.style.display = "block";
        processBtn.onclick = () => {
          showProcessImages(img.dataset.processImages.split(","));
        };
      } else {
        processBtn.style.display = "none";
      }
    });
  });

  // Clicking process button shows process overlay
  function showProcessImages(imageList) {
    processOverlay.innerHTML = ""; // Clear previous
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


