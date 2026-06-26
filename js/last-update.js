async function loadLastUpdate() {
  const textEl = document.getElementById("lastUpdateText");
  if (!textEl) return;

  const fallbackText = "Letzte Änderung: 22.06.2026"; 

  try {
    const response = await fetch(
      "https://api.github.com/repos/Altonbekolli/Portfolio/commits?per_page=1"
    );

    if (!response.ok) {
      throw new Error("GitHub API nicht erreichbar");
    }

    const data = await response.json();
    const lastDate = data[0]?.commit?.committer?.date;

    if (!lastDate) {
      textEl.textContent = fallbackText;
      return;
    }

    const formattedDate = new Date(lastDate).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    textEl.textContent = `Letzte Änderung: ${formattedDate}`;
  } catch {
    textEl.textContent = fallbackText;
  }
}

document.addEventListener("DOMContentLoaded", loadLastUpdate);