function initAnimations() {
  const headline = document.getElementById("headline-effect");
  const glassBox = document.querySelector(".glass-box");

  document.querySelectorAll(".skill-fill").forEach(el => {
    el.style.width = el.getAttribute("data-width") || "0%";
    el.style.opacity = "1";
  });

  document.querySelectorAll(".circle").forEach(circle => {
    const percentage = parseFloat(circle.getAttribute("data-percentage")) || 0;
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
  });

  if (headline) {
    headline.style.animationPlayState = "running";
  }

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-up, .slide-in-left").forEach(el => {
    fadeObserver.observe(el);
  });

  if (glassBox) {
    setTimeout(() => {
      glassBox.classList.add("visible");
    }, 100);
  }

  document.body.classList.add("loaded");
}

document.addEventListener("DOMContentLoaded", initAnimations);