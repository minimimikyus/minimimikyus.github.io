// highlight.js — automatically highlights the current navbar link
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar a");
  const currentPath = window.location.pathname.replace(/\/$/, ""); // remove trailing slash

  links.forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, ""); // normalize link path

    // Match exact path (e.g., /section1)
    if (currentPath === linkPath) {
      link.classList.add("active");
    }

    // Special handling for homepage
    if (
      (currentPath === "" || currentPath === "/" || currentPath.endsWith("/index")) &&
      (link.getAttribute("href") === "/" || link.getAttribute("href") === "./")
    ) {
      link.classList.add("active");
    }
  });
});
