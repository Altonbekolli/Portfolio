const STORAGE_KEY = "alton-portfolio-visitor-counted";

async function loadVisitorCount() {
  const el = document.getElementById("visitorCount");
  if (!el) return;

  try {
    const alreadyCounted = localStorage.getItem(STORAGE_KEY);

    const response = await fetch("/.netlify/functions/visitors", {
      method: alreadyCounted ? "GET" : "POST"
    });

    if (!response.ok) {
        throw new Error("Visitor request failed");
    }

    const data = await response.json();

    if (data.count == null) {
      el.textContent = "nicht verfügbar";
      return;
    }

    el.textContent = data.count.toLocaleString("de-DE");

    if (!alreadyCounted) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  } catch (error) {
    console.error("Error loading visitor count:", error);
    el.textContent = "nicht verfügbar";
  }
}

document.addEventListener("DOMContentLoaded", loadVisitorCount);