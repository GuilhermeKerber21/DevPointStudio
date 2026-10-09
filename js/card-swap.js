/* =====================================================
   DEV POINT STUDIO — Card Swap
   Vanilla JS + GSAP implementation based on the supplied
   React CardSwap component.
   ===================================================== */

(function () {
  "use strict";

  window.initCardSwap = function (container, projects, navContainer) {
    if (!container || !projects || projects.length < 2) return;

    var cardDistance = 48;
    var verticalDistance = 58;
    var delay = 5000;
    var skewAmount = 5;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    container.innerHTML = projects.map(function (project, index) {
      var tags = project.technologies.map(function (tech) {
        return '<span class="card-swap-tag">' + tech + '</span>';
      }).join("");

      return '<article class="card-swap-card" data-card-index="' + index + '">' +
        '<img src="' + project.image + '" alt="Pré-visualização do ' + project.name + ' — ' + project.category + '" loading="lazy">' +
        '<div class="card-swap-content">' +
          '<div class="card-swap-content_top">' +
            '<div>' +
              '<span class="card-swap-number">' + project.number + '</span>' +
              '<h3 class="card-swap-name">' + project.name + '</h3>' +
              '<span class="card-swap-category">' + project.category + '</span>' +
            '</div>' +
            '<a class="card-swap-cta" href="' + project.link + '"' + (project.link.startsWith('#') ? '' : ' target="_blank" rel="noopener noreferrer"') + ' aria-label="Ver ' + project.name + '">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>' +
            '</a>' +
          '</div>' +
          '<div class="card-swap-tags">' + tags + '</div>' +
        '</div>' +
      '</article>';
    }).join("");

    var cards = Array.prototype.slice.call(container.querySelectorAll(".card-swap-card"));
    var order = cards.map(function (_, i) { return i; });
    var timer = null;
    var timeline = null;
    var isRunning = !reduceMotion && document.body.dataset.motionPaused !== 'true';

    var navButtons = [];
    if (navContainer) {
      navContainer.innerHTML = projects.map(function (project, index) {
        return '<li>' +
          '<button type="button" class="projects_swap_nav_btn' + (index === 0 ? ' is_active' : '') + '" data-nav-index="' + index + '">' +
            '<span class="projects_swap_nav_number">' + project.number + '</span>' +
            '<span class="projects_swap_nav_details"><span class="projects_swap_nav_name">' + project.name + '</span><span class="projects_swap_nav_category">' + project.category + '</span></span>' +
            '<span class="projects_swap_nav_arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
          '</button>' +
        '</li>';
      }).join("");
      navButtons = Array.prototype.slice.call(navContainer.querySelectorAll(".projects_swap_nav_btn"));
    }

    if (typeof window.gsap === 'undefined') {
      container.classList.add('card-swap-fallback');
      if (navContainer) navContainer.hidden = true;
      return;
    }

    function setActiveNav(index) {
      cards.forEach(function (card, cardIndex) {
        card.inert = cardIndex !== index;
        card.setAttribute('aria-hidden', String(cardIndex !== index));
      });
      navButtons.forEach(function (btn) {
        btn.classList.toggle("is_active", Number(btn.dataset.navIndex) === index);
        btn.setAttribute("aria-pressed", String(Number(btn.dataset.navIndex) === index));
      });
    }

    function slot(i) {
      return {
        x: i * cardDistance,
        y: -i * verticalDistance,
        z: -i * cardDistance * 1.5,
        zIndex: cards.length - i
      };
    }

    function placeNow(el, position) {
      gsap.set(el, {
        x: position.x,
        y: position.y,
        z: position.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: "center center",
        zIndex: position.zIndex,
        force3D: true
      });
    }

    cards.forEach(function (card, i) { placeNow(card, slot(i)); });

    function goTo(index) {
      if (!cards[index] || order[0] === index) return;

      window.clearTimeout(timer);
      if (timeline) timeline.kill();

      var newOrder = [index].concat(order.filter(function (i) { return i !== index; }));
      order = newOrder;

      order.forEach(function (cardIdx, pos) {
        var el = cards[cardIdx];
        var target = slot(pos);
        gsap.to(el, {
          x: target.x,
          y: target.y,
          z: target.z,
          zIndex: target.zIndex,
          duration: reduceMotion ? 0 : 0.9,
          ease: reduceMotion ? "none" : "power3.out"
        });
      });

      setActiveNav(index);
      if (isRunning) schedule();
    }

    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        goTo(Number(btn.dataset.navIndex));
      });
    });

    cards.forEach(function (card) {
      card.addEventListener('click', function (event) {
        if (!event.target.closest('a')) card.querySelector('a').click();
      });
    });

    function swap() {
      if (!isRunning || order.length < 2) return;

      var front = order[0];
      var rest = order.slice(1);
      var frontEl = cards[front];
      var config = reduceMotion
        ? { ease: "none", drop: 0.35, move: 0.35, ret: 0.35 }
        : { ease: "elastic.out(0.6,0.9)", drop: 1.35, move: 1.45, ret: 1.35 };

      timeline = gsap.timeline();
      timeline.to(frontEl, {
        y: "+=500",
        duration: config.drop,
        ease: config.ease
      });

      timeline.addLabel("promote", "-=" + (config.drop * 0.72));

      rest.forEach(function (idx, i) {
        var el = cards[idx];
        var target = slot(i);
        timeline.set(el, { zIndex: target.zIndex }, "promote");
        timeline.to(el, {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: config.move,
          ease: config.ease
        }, "promote+=" + (i * 0.12));
      });

      var back = slot(cards.length - 1);
      timeline.addLabel("return", "promote+=" + (config.move * 0.05));
      timeline.set(frontEl, { zIndex: back.zIndex }, "return");
      timeline.to(frontEl, {
        x: back.x,
        y: back.y,
        z: back.z,
        duration: config.ret,
        ease: config.ease
      }, "return");

      timeline.call(function () {
        order = rest.concat(front);
        setActiveNav(order[0]);
      });
    }

    function schedule() {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        swap();
        schedule();
      }, delay);
    }

    function pause() {
      isRunning = false;
      if (timeline) timeline.progress(1);
      window.clearTimeout(timer);
    }

    function resume() {
      if (isRunning) return;
      isRunning = true;
      if (timeline) timeline.play();
      schedule();
    }

    setActiveNav(order[0]);
    const section = container.closest('section');
    section.addEventListener('focusin', pause);
    section.addEventListener('mouseenter', pause);
    function motionChanged(event) {
      if (event.detail.paused || reduceMotion) pause();
      else if (!section.contains(document.activeElement)) resume();
    }
    document.addEventListener('site-motion-change', motionChanged);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (event) {
      reduceMotion = event.matches;
      if (reduceMotion) pause();
    });
    if (isRunning) schedule();

    container._cardSwapCleanup = function () {
      window.clearTimeout(timer);
      if (timeline) timeline.kill();
    };
  };
})();
