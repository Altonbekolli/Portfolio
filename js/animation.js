function initAnimations() {
  const headline = document.getElementById("headline-effect");
  const glassBox = document.querySelector(".glass-box");

  setTimeout(() => {
    new Typed("#typed", {
      strings: [
        "ich freue mich, dich auf meiner Webseite begrüßen zu dürfen.",
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

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".skill-fill").forEach(el => {
    const container = el.closest(".skill-fill-container");
    const targetWidth = el.getAttribute("data-width");

    gsap.set(el, { width: "0%", opacity: 1 });

    gsap.to(el, {
      width: targetWidth,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    });
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

  if (headline) {
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
  }

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-up, .slide-in-left").forEach(el => fadeObserver.observe(el));

  if (glassBox) {
    setTimeout(() => {
      glassBox.classList.add("visible");
    }, 100);
  }

  document.body.classList.add("loaded");
}