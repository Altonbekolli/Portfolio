const scrollToTopBtn = document.getElementById("scrollToTop");
const anredeAuswahl = document.getElementById('anrede-auswahl');
const betreffAuswahl = document.getElementById('betreff-auswahl');
const emailFeld = document.getElementById('email');
const name = document.getElementById('name-container');
const emailContainer = document.getElementById('email-container');
const projektTypContainer = document.getElementById('projekt-typ-container');
const images = document.querySelectorAll(".slider-img");
let current = 0;
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const loveSlides = document.querySelectorAll(".love-slide");
const loveNext = document.querySelector(".love-next");
const lovePrev = document.querySelector(".love-prev");
let loveIndex = 0;
const form = document.getElementById('kontakt-formular');
const dankeMessage = document.getElementById('danke-message');
const glassBox = document.querySelector(".glass-box");
const hilfeOverlay = document.getElementById('hilfe-overlay');
const accessButton = document.getElementById('buttonAcces');
const headline = document.getElementById("headline-effect");
const filterSelect = document.getElementById("skill-filter");
const skillItems = document.querySelectorAll(".skill");
const sections = document.querySelectorAll("section[id], .contact-wrapper");
const navLinks = document.querySelectorAll(".sidebar-nav a");


document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    new Typed("#typed", {
      strings: [
        "freue mich, dich auf meiner Webseite begrüßen zu dürfen.",
        "meine Leidenschaft ist das Programmieren.",
        "ich arbeite als Webentwickler.",
      ],
      typeSpeed: 40,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      showCursor: false
    });
  }, 300);

  window.addEventListener("scroll", () => {
    scrollToTopBtn.classList.toggle("show", window.scrollY > 200);
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.skill-fill').forEach(el => {
    const container = el.closest('.skill-fill-container');
    const targetWidth = el.getAttribute('data-width');
    gsap.set(el, { width: '0%', opacity: 0 });
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 95%',
        end: 'bottom 5%',
        toggleActions: 'play reset play reset',
      },
    })
    .to(el, {
      width: targetWidth,
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out'
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          headline.style.animationPlayState = "running";
        }
      });
    },
    { threshold: 0.6 }
  );
  observer.observe(headline);
  headline.style.animationPlayState = "paused";

  // Anrede-Auswahl
  anredeAuswahl.addEventListener('change', () => {
    const anrede = anredeAuswahl.value;
    if (anrede === 'Anonym') {
      emailFeld.required = false;
      emailContainer.style.display = 'none';
      name.style.display = 'none';
      betreffAuswahl.innerHTML = '<option value="Feedback">Feedback</option>';
      projektTypContainer.style.display = 'none';
    } else {
      emailFeld.required = true;
      emailContainer.style.display = 'block';
      name.style.display = 'block';
      betreffAuswahl.innerHTML = `
        <option value="Feedback">Feedback</option>
        <option value="Zusammenarbeit">Zusammenarbeit</option>
      `;

      // Projekt-Typ direkt prüfen (falls Betreff vorher ausgewählt war)
      const value = betreffAuswahl.value;
      const sollZeigen = value === 'Zusammenarbeit';
      projektTypContainer.style.display = sollZeigen ? 'block' : 'none';
    }
  });

  // Betreff-Auswahl
  betreffAuswahl.addEventListener('change', () => {
    const anrede = anredeAuswahl.value;
    const value = betreffAuswahl.value;
    const sollZeigen = anrede !== 'Anonym' && value === 'Zusammenarbeit';
    projektTypContainer.style.display = sollZeigen ? 'block' : 'none';
  });
});

function updateSlider(index) {
  images.forEach((img, i) => img.classList.toggle("active", i === index));
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

function updateLoveSlider(index) {
  loveSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}
loveNext.addEventListener("click", () => {
  loveIndex = (loveIndex + 1) % loveSlides.length;
  updateLoveSlider(loveIndex);
});
lovePrev.addEventListener("click", () => {
  loveIndex = (loveIndex - 1 + loveSlides.length) % loveSlides.length;
  updateLoveSlider(loveIndex);
});
setInterval(() => {
  loveIndex = (loveIndex + 1) % loveSlides.length;
  updateLoveSlider(loveIndex);
}, 12000);


filterSelect.addEventListener("change", () => {
  const selected = filterSelect.value;
  skillItems.forEach(skill => {
    const category = skill.getAttribute("data-category");
    skill.style.display = (selected === "alle" || selected === category) ? "block" : "none";
  });
});

window.addEventListener("load", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up, .slide-in-left').forEach(el => observer.observe(el));

  if (glassBox) {
    setTimeout(() => {
      glassBox.classList.add("visible");
    }, 100);
  }

  document.body.classList.add("loaded");
});


accessButton.addEventListener('click', () => {
  const isVisible = hilfeOverlay.style.display !== 'none';
  hilfeOverlay.style.display = isVisible ? 'none' : 'block';
  hilfeOverlay.classList.toggle('visible', !isVisible);
  hilfeOverlay.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => {
      dankeMessage.style.display = "block";
      form.reset();
      projektTypContainer.style.display = "none";
    })
    .catch((error) => {
      alert("Fehler beim Senden: " + error.message);
    });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') document.querySelector('.next-btn').click();
  if (e.key === 'ArrowLeft') document.querySelector('.prev-btn').click();
  if (e.key === 'l') document.querySelector('.love-next')?.click();
  if (e.key === 'k') document.querySelector('.love-prev')?.click();

  if (e.key.toLowerCase() === '-') {
    const isVisible = hilfeOverlay.style.display !== 'none';
    hilfeOverlay.style.display = isVisible ? 'none' : 'block';
    hilfeOverlay.classList.toggle('visible', !isVisible);
    hilfeOverlay.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
  }

  if (e.key === 'q') {
    hilfeOverlay.style.display = 'none';
    hilfeOverlay.classList.remove('visible');
    hilfeOverlay.setAttribute('aria-hidden', 'true');
  }
});

document.querySelectorAll(".circle").forEach(circle => {
  const target = circle.closest(".circle-skill");
  const percentage = parseFloat(circle.getAttribute("data-percentage"));
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  gsap.set(circle, {
    strokeDasharray: circumference,
    strokeDashoffset: circumference
  });

  gsap.to(circle, {
    strokeDashoffset: offset,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: target,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

const sectionObserver = new IntersectionObserver(
  entries => {
    let visibleSections = entries.filter(entry => entry.isIntersecting);
    if (visibleSections.length > 0) {
      //  zuletzt sichtbare Section ganz oben priorisieren
      visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const id = visibleSections[0].target.getAttribute("id");
      if (!id) return;

      navLinks.forEach(link => link.classList.remove("active-section"));
      const activeLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active-section");
    }
  },
  {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0.25,
  }
);

sections.forEach(section => sectionObserver.observe(section));

//php
/*
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);

  fetch("send-mail.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        dankeMessage.innerText = data.message;
        dankeMessage.style.display = "block";
        form.reset();
        projektTypContainer.style.display = "none";
      } else {
        alert("Fehler: " + data.message);
      }
    })
    .catch((err) => {
      alert("Es ist ein Fehler aufgetreten.");
      console.error(err);
    });
});
*/ 
