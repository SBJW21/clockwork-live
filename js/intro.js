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
    ['.intro-dark', '.intro-beams', '.intro-count', '.intro-mark'].forEach(function (s) {
      var el = document.querySelector(s); if (el) el.remove();
    });
  }
  // Counts 20:26 down to 00:00 quickly, easing out so it lands on zero
  function runCount() {
    var el = document.querySelector('.intro-count .time');
    if (!el) return;
    var total = 20 * 60 + 26, dur = 1600, delay = 100, t0 = null;
    function fmt(s) { s = Math.max(0, Math.round(s)); return ('0' + Math.floor(s / 60)).slice(-2) + ':' + ('0' + (s % 60)).slice(-2); }
    function step(t) {
      if (t0 === null) t0 = t + delay;
      var k = Math.min(1, Math.max(0, (t - t0) / dur));
      var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      el.textContent = fmt(total * (1 - e));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function go() {
    if (started) return;
    started = true;
    d.classList.add('intro-go');
    runCount();
    setTimeout(end, 6500);
  }
  if (document.readyState === 'complete') go(); else addEventListener('load', go);
  setTimeout(go, 1500);
  addEventListener('keydown', end);
})();
