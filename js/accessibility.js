(function () {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateMotion() {
    const paused = preference.matches;
    document.body.dataset.motionPaused = String(paused);
    document.dispatchEvent(new CustomEvent('site-motion-change', { detail: { paused } }));
  }
  preference.addEventListener('change', updateMotion);
  updateMotion();

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.getAttribute('href') === '#') return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();
