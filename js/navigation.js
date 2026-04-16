function initNavigation() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const hilfeOverlay = document.getElementById("hilfe-overlay");
  const accessButton = document.getElementById("buttonAcces");
  const filterSelect = document.getElementById("skill-filter");
  const skillItems = document.querySelectorAll(".skill");
  const sections = document.querySelectorAll("section[id], .contact-wrapper");
  const navLinks = document.querySelectorAll(".sidebar-nav a");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      scrollToTopBtn.classList.toggle("show", window.scrollY > 200);
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const selected = filterSelect.value;
      skillItems.forEach(skill => {
        const category = skill.getAttribute("data-category");
        skill.style.display = (selected === "alle" || selected === category) ? "block" : "none";
      });
    });
  }

  if (accessButton && hilfeOverlay) {
    accessButton.addEventListener("click", () => {
      toggleHelpOverlay(hilfeOverlay);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") document.querySelector(".next-btn")?.click();
    if (e.key === "ArrowLeft") document.querySelector(".prev-btn")?.click();
    if (e.key === "l") document.querySelector(".love-next")?.click();
    if (e.key === "k") document.querySelector(".love-prev")?.click();

    if (e.key.toLowerCase() === "-") {
      if (hilfeOverlay) toggleHelpOverlay(hilfeOverlay);
    }

    if (e.key === "q" && hilfeOverlay) {
      hilfeOverlay.style.display = "none";
      hilfeOverlay.classList.remove("visible");
      hilfeOverlay.setAttribute("aria-hidden", "true");
    }
  });

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);

        if (visibleSections.length > 0) {
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
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.25,
      }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }
}

function toggleHelpOverlay(hilfeOverlay) {
  const isVisible = hilfeOverlay.style.display !== "none";
  hilfeOverlay.style.display = isVisible ? "none" : "block";
  hilfeOverlay.classList.toggle("visible", !isVisible);
  hilfeOverlay.setAttribute("aria-hidden", isVisible ? "true" : "false");
}