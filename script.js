const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");
const clock = document.querySelector("[data-clock]");
const motionSafe = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

if (motionSafe) {
  const revealItems = document.querySelectorAll(
    ".dashboard article, .copy-panel, .result-card, .member-card, .team-chief, .pilot-card, .sponsors article, .sponsor-cta, .contact"
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -80px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
