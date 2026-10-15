// Homepage intro controller. The .intro-on class is set in the page head
// (on fresh visits and refreshes, not when moving around the site, never with reduced motion). Add ?intro to the URL to replay.
(function () {
  var d = document.documentElement;
  if (!d.classList.contains('intro-on')) return;
  var started = false, ended = false;
  function end() {
    if (ended) return;
    ended = true;
    d.classList.remove('intro-on', 'intro-go');
    ['.intro-dark', '.intro-beams'].forEach(function (s) {
      var el = document.querySelector(s); if (el) el.remove();
    });
  }
  function go() {
    if (started) return;
    started = true;
    d.classList.add('intro-go');
    setTimeout(end, 3600);
  }
  if (document.readyState === 'complete') go(); else addEventListener('load', go);
  setTimeout(go, 1500);
  addEventListener('keydown', end);
})();
