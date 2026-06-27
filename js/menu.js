function initRightMenu() {
  const toggle = document.getElementById("menuToggle");
  const close = document.getElementById("menuClose");
  const menu = document.getElementById("rightMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!toggle || !close || !menu || !overlay) return;

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("menu-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("menu-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", openMenu);
  close.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", initRightMenu);