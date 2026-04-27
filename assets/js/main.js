// =====================================================================
// chauffagiste-industriel.fr — main.js
// Mobile drawer, FAQ accordion, TOC scroll-spy
// =====================================================================
(function () {
  const body = document.body;
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.querySelector(".m-backdrop");
  const toggle = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".m-close");

  function openMenu() {
    if (!drawer) return;
    drawer.hidden = false;
    // Force reflow so the transition runs
    void drawer.offsetWidth;
    body.classList.add("menu-open");
    toggle && toggle.setAttribute("aria-expanded", "true");
    toggle && toggle.setAttribute("aria-label", "Fermer le menu");
  }

  function closeMenu() {
    body.classList.remove("menu-open");
    toggle && toggle.setAttribute("aria-expanded", "false");
    toggle && toggle.setAttribute("aria-label", "Ouvrir le menu");
    // Hide after transition (300ms)
    setTimeout(() => {
      if (!body.classList.contains("menu-open") && drawer) drawer.hidden = true;
    }, 320);
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      if (body.classList.contains("menu-open")) closeMenu();
      else openMenu();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  // Close menu on link click (except submenu summary toggles)
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && a.getAttribute("href") && !a.getAttribute("href").startsWith("#")) {
        closeMenu();
      }
    });
  }

  // ESC closes the menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) closeMenu();
  });

  // Resize: close menu if returning to desktop
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && body.classList.contains("menu-open")) closeMenu();
    lastWidth = window.innerWidth;
  });

  // FAQ accordion: only one open at a time inside same .faq-list
  document.querySelectorAll(".faq-list").forEach((list) => {
    list.addEventListener(
      "toggle",
      (e) => {
        if (e.target.tagName === "DETAILS" && e.target.open) {
          list.querySelectorAll("details").forEach((d) => {
            if (d !== e.target) d.open = false;
          });
        }
      },
      true
    );
  });

  // TOC scroll-spy
  const toc = document.querySelector(".page-toc aside.toc");
  if (toc) {
    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (sections.length) {
      const onScroll = () => {
        const headerOffset = 100;
        let active = sections[0];
        for (const s of sections) {
          if (s.getBoundingClientRect().top - headerOffset <= 0) active = s;
        }
        links.forEach((l) => {
          const li = l.closest("li");
          if (li) li.classList.toggle("active", l.getAttribute("href") === "#" + active.id);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }
})();
