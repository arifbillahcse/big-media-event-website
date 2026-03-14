/* ===== FAQ Accordion ===== */
(function () {
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ===== Form Handling ===== */
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btnText = form.querySelector('.btn-text');
      var btnLoading = form.querySelector('.btn-loading');
      var submitBtn = form.querySelector('.btn-submit');

      // Show loading state
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;

      // Simulate submission (replace with real endpoint)
      setTimeout(function () {
        form.style.display = 'none';
        form.previousElementSibling.style.display = 'none'; // Hide subtitle
        success.style.display = 'block';

        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    });
  }
})();
