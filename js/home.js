// Home page motion: service icons play once as they scroll into view,
// and the brief-to-run flow lights up step by step.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  var cards = [].slice.call(document.querySelectorAll('.cue-card'));
  if (canObserve && !reduce) {
    var cardIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var c = e.target;
        var delay = (cards.indexOf(c) % 2) * 160;
        setTimeout(function () {
          c.classList.add('play');
          setTimeout(function () { c.classList.remove('play'); }, 2200);
        }, delay);
        cardIO.unobserve(c);
      });
    }, { threshold: 0.6 });
    cards.forEach(function (c) { cardIO.observe(c); });
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
