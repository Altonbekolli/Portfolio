const sportTabs = document.querySelectorAll(".sport-tab");
const sportPanels = document.querySelectorAll(".sport-panel");

sportTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.sport;

    sportTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    sportPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const targetPanel = document.getElementById(target);

    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  });
});