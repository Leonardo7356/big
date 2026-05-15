const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");
const clock = document.querySelector("[data-clock]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (clock) {
  const startedAt = Date.now();

  window.setInterval(() => {
    const elapsed = Date.now() - startedAt;
    const minutes = String(Math.floor(elapsed / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
    const hundredths = String(Math.floor((elapsed % 1000) / 10)).padStart(2, "0");

    clock.textContent = `${minutes}:${seconds}.${hundredths}`;
  }, 80);
}
