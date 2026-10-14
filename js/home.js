// Home page motion: service icons cycle in order,
// and the brief-to-run flow lights up step by step.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  // Service icons play one at a time, in order: cue 1 for 2 seconds, then 2
  // to 6, then back to 1. Only runs while the grid is on screen.
  var cards = [].slice.call(document.querySelectorAll('.cue-card'));
  var grid = document.querySelector('.cue-grid');
  if (grid && canObserve && !reduce) {
    var cur = -1, timer = null;
    function tick() {
      if (cur >= 0) cards[cur].classList.remove('play');
      cur = (cur + 1) % cards.length;
      cards[cur].classList.add('play');
    }
    function start() { if (timer) return; tick(); timer = setInterval(tick, 2000); }
    function stop() {
      clearInterval(timer); timer = null;
      if (cur >= 0) cards[cur].classList.remove('play');
      cur = -1;
    }
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0.25 }).observe(grid);
  }

  var flow = document.querySelector('.flow');
  if (!flow) return;
  var steps = [].slice.call(flow.querySelectorAll('.flow-step'));
  function light(step, i) {
    setTimeout(function () {
      step.classList.add('on');
      setTimeout(function () { step.classList.add('go'); }, 350);
    }, i * 1200);
  }
  if (reduce || !canObserve) {
    steps.forEach(function (s) { s.classList.add('on', 'go'); });
  } else {
    var flowIO = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      steps.forEach(light);
      flowIO.disconnect();
    }, { threshold: 0.5 });
    flowIO.observe(flow);
  }
})();
