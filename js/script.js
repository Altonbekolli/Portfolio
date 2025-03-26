document.addEventListener("DOMContentLoaded", () => {
  const typed = new Typed("#typed", {
    strings: [
      "freue mich, dich auf meiner Webseite begrüßen zu dürfen.",
      "meine Leidenschaft ist es zu Programmieren.",
      "ich arbeite als Web-Entwickler.",
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
  });

  // GSAP Plugin registrieren
  gsap.registerPlugin(ScrollTrigger);

  // Lebenslauf-Block Animation 
  gsap.utils.toArray(".cv-block").forEach((block) => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  gsap.utils.toArray('.skill-fill').forEach(el => {
    const container = el.closest('.skill-fill-container');
    const targetWidth = el.getAttribute('data-width');
  
    // Reset
    gsap.set(el, { width: '0%', opacity: 0 });
  
    // Timeline
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        toggleActions: 'play reset play reset',
      }
    })
    .to(el, {
      width: targetWidth,
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out'
    });
  });
  
  const headline = document.getElementById("headline-effect");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headline.style.animationPlayState = "running";
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(headline);
  headline.style.animationPlayState = "paused";
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("kontakt-formular");
  const projektContainer = document.getElementById("projekt-typ-container");
  const betreffSelect = document.getElementById("betreff-auswahl");
  const dankeMessage = document.getElementById("danke-message");
  const feedbackText = document.getElementById("feedback-response");
  const anredeSelect = document.querySelector('select[name="anrede"]');
  const nameContainer = document.getElementById("name-container");

anredeSelect.addEventListener("change", () => {
  if (anredeSelect.value === "Anonym") {
    nameContainer.style.display = "none";
  } else {
    nameContainer.style.display = "block";
  }
});

  betreffSelect.addEventListener("change", () => {
    projektContainer.style.display = betreffSelect.value === "Zusammenarbeit" ? "block" : "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const res = await fetch("send-mail.php", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        form.reset();
        projektContainer.style.display = "none";
        if (formData.get("betreff") === "Feedback") {
          feedbackText.innerText = "Vielen Dank für dein Feedback!";
        } else {
          feedbackText.innerText = "Ich melde mich innerhalb 24 Stunden! Danke für Ihre Nachfrage.";
        }
        dankeMessage.style.display = "block";
      } else {
        alert("Fehler beim Senden.");
      }
    } catch (err) {
      alert("Fehler beim Absenden.");
      console.error(err);
    }
  });
});

const images = document.querySelectorAll(".slider-img");
let current = 0;
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

function updateSlider(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  current = (current + 1) % images.length;
  updateSlider(current);
}

function prevSlide() {
  current = (current - 1 + images.length) % images.length;
  updateSlider(current);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
setInterval(nextSlide, 10000);


