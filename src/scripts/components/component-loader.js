/**
 * ABSS Nexus Technologies - Dynamic Component Loader (Zero Dependency)
 * Allows developers to include shared HTML partials via data-include:
 * Example: <div data-include="/src/components/header.html"></div>
 */
(function () {
  async function loadIncludes() {
    const elements = document.querySelectorAll("[data-include]");
    if (!elements.length) return;

    for (const el of elements) {
      const file = el.getAttribute("data-include");
      if (!file) continue;

      try {
        const response = await fetch(file);
        if (response.ok) {
          const html = await response.text();
          el.outerHTML = html;
        } else {
          console.warn(`[ComponentLoader] Could not load ${file}: ${response.status}`);
        }
      } catch (err) {
        console.warn(`[ComponentLoader] Network error loading ${file}:`, err.message);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
