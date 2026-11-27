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
  // Seven-segment style display. Counts 20:26 down to 00:00 quickly, easing so it lands on zero.
  var SEG = {
    a: '10,6 14,2 46,2 50,6 46,10 14,10', b: '52,8 56,12 56,46 52,50 48,46 48,12',
    c: '52,52 56,56 56,90 52,94 48,90 48,56', d: '10,94 14,90 46,90 50,94 46,98 14,98',
    e: '8,52 12,56 12,90 8,94 4,90 4,56', f: '8,8 12,12 12,46 8,50 4,46 4,12', g: '10,50 14,46 46,46 50,50 46,54 14,54'
  };
  var DIGITS = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
  var NS = 'http://www.w3.org/2000/svg';
  function buildDigit() {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 60 100'); s.setAttribute('class', 'dg');
    Object.keys(SEG).forEach(function (k) {
      var p = document.createElementNS(NS, 'polygon');
      p.setAttribute('points', SEG[k]); p.setAttribute('class', 'seg ' + k); s.appendChild(p);
    });
    return s;
  }
  function setDigit(svg, n) {
    var on = DIGITS[n];
    Array.prototype.forEach.call(svg.querySelectorAll('.seg'), function (p) {
      p.classList.toggle('on', on.indexOf(p.getAttribute('class').split(' ')[1]) > -1);
    });
  }
  function runCount() {
    var el = document.querySelector('.intro-count .time');
    if (!el) return;
    el.textContent = '';
    var ds = [];
    [0, 1, 'c', 2, 3].forEach(function (i) {
      if (i === 'c') { var c = document.createElement('span'); c.className = 'colon'; c.innerHTML = '<i></i><i></i>'; el.appendChild(c); return; }
      var d = buildDigit(); el.appendChild(d); ds.push(d);
    });
    var total = 20 * 60 + 26, dur = 1600, delay = 100, t0 = null, last = '';
    function show(s) {
      s = Math.max(0, Math.round(s));
      var m = Math.floor(s / 60), sec = s % 60, str = ('0' + m).slice(-2) + ('0' + sec).slice(-2);
      if (str === last) return; last = str;
      for (var i = 0; i < 4; i++) setDigit(ds[i], +str[i]);
    }
    show(total);
    function step(t) {
      if (t0 === null) t0 = t + delay;
      var k = Math.min(1, Math.max(0, (t - t0) / dur));
      var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      show(total * (1 - e));
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
