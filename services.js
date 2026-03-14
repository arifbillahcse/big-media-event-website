/* ============================================================
   SERVICES.JS — Services page specific JS
   BIG MEDIA EVENT
============================================================ */

/* =============================
   STICKY TAB ACTIVE STATE
   Highlights the correct tab as
   user scrolls through sections
============================= */
const sections = document.querySelectorAll('.svc-section[id]');
const tabs = document.querySelectorAll('.svc-tab');

if (sections.length && tabs.length) {
  const svcNavHeight = document.querySelector('.svc-nav')?.offsetHeight || 0;
  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
  const offset = navbarHeight + svcNavHeight + 40;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - offset) {
        current = section.getAttribute('id');
      }
    });

    tabs.forEach((tab) => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${current}`) {
        tab.classList.add('active');
      }
    });
  });

  // Smooth scroll offset for sticky nav
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const targetId = tab.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - offset + 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
