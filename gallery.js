/* ===== Gallery Filter ===== */
(function () {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      items.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ===== Lightbox ===== */
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Fermer">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev" aria-label="Précédent">&#8592;</button>' +
    '<button class="lightbox-nav lightbox-next" aria-label="Suivant">&#8594;</button>' +
    '<div class="lightbox-content"></div>';
  document.body.appendChild(lightbox);

  var lbContent = lightbox.querySelector('.lightbox-content');
  var lbClose = lightbox.querySelector('.lightbox-close');
  var lbPrev = lightbox.querySelector('.lightbox-prev');
  var lbNext = lightbox.querySelector('.lightbox-next');
  var currentIndex = 0;

  function getVisibleItems() {
    return Array.from(items).filter(function (i) { return !i.classList.contains('hidden'); });
  }

  function openLightbox(index) {
    var visible = getVisibleItems();
    currentIndex = index;
    var item = visible[currentIndex];
    var thumb = item.querySelector('.gallery-thumb');
    lbContent.innerHTML = thumb.innerHTML;
    // Show overlay in lightbox
    var overlay = lbContent.querySelector('.gallery-overlay');
    if (overlay) overlay.style.transform = 'translateY(0)';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    var visible = getVisibleItems();
    currentIndex = (currentIndex + dir + visible.length) % visible.length;
    openLightbox(currentIndex);
  }

  items.forEach(function (item) {
    item.querySelector('.gallery-thumb').addEventListener('click', function () {
      var visible = getVisibleItems();
      var idx = visible.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function () { navigate(-1); });
  lbNext.addEventListener('click', function () { navigate(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();
