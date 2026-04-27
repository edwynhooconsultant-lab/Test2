// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      const expanded = document.body.classList.contains('menu-open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  // Close mobile menu when a link is followed
  document.querySelectorAll('nav.primary a').forEach(a => {
    a.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });

  // FAQ accordion: only one open at a time inside a same .faq-list
  document.querySelectorAll('.faq-list').forEach(list => {
    list.addEventListener('toggle', e => {
      if (e.target.tagName === 'DETAILS' && e.target.open) {
        list.querySelectorAll('details').forEach(d => {
          if (d !== e.target) d.open = false;
        });
      }
    }, true);
  });

  // TOC scroll-spy
  const toc = document.querySelector('.page-toc aside.toc');
  if (toc) {
    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    const sections = links
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    if (sections.length) {
      const onScroll = () => {
        const headerOffset = 100;
        let active = sections[0];
        for (const s of sections) {
          if (s.getBoundingClientRect().top - headerOffset <= 0) active = s;
        }
        links.forEach(l => {
          const li = l.closest('li');
          if (li) li.classList.toggle('active', l.getAttribute('href') === '#' + active.id);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }
})();
