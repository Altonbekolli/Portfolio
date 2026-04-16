function initContactForm() {
  const anredeAuswahl = document.getElementById("anrede-auswahl");
  const betreffAuswahl = document.getElementById("betreff-auswahl");
  const emailFeld = document.getElementById("email");
  const name = document.getElementById("name-container");
  const emailContainer = document.getElementById("email-container");
  const projektTypContainer = document.getElementById("projekt-typ-container");
  const form = document.getElementById("kontakt-formular");
  const dankeMessage = document.getElementById("danke-message");

  if (!form || !anredeAuswahl || !betreffAuswahl || !emailFeld || !name || !emailContainer || !projektTypContainer || !dankeMessage) {
    return;
  }

  anredeAuswahl.addEventListener("change", () => {
    const anrede = anredeAuswahl.value;

    if (anrede === "Anonym") {
      emailFeld.required = false;
      emailContainer.style.display = "none";
      name.style.display = "none";
      betreffAuswahl.innerHTML = '<option value="Feedback">Feedback</option>';
      projektTypContainer.style.display = "none";
    } else {
      emailFeld.required = true;
      emailContainer.style.display = "block";
      name.style.display = "block";
      betreffAuswahl.innerHTML = `
        <option value="Feedback">Feedback</option>
        <option value="Zusammenarbeit">Zusammenarbeit</option>
      `;

      const value = betreffAuswahl.value;
      const sollZeigen = value === "Zusammenarbeit";
      projektTypContainer.style.display = sollZeigen ? "block" : "none";
    }
  });

  betreffAuswahl.addEventListener("change", () => {
    const anrede = anredeAuswahl.value;
    const value = betreffAuswahl.value;
    const sollZeigen = anrede !== "Anonym" && value === "Zusammenarbeit";
    projektTypContainer.style.display = sollZeigen ? "block" : "none";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    submitContactForm(formData)
      .then(() => {
        dankeMessage.style.display = "block";
        form.reset();
        projektTypContainer.style.display = "none";
      })
      .catch((error) => {
        alert("Fehler beim Senden: " + error.message);
      });
  });
}

function submitContactForm(formData) {
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  });
}
