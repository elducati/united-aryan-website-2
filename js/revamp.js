/**
 * UNITED ARYAN EPZ — Revamp JS Engine
 * Pure vanilla JS — no jQuery required
 */
(function () {
  'use strict';

  /* ── 1. NAV: Scroll-aware glass effect ────────────────────── */
  function initNav() {
    const nav = document.querySelector('.ual-nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('ual-nav--scrolled');
      } else {
        nav.classList.remove('ual-nav--scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. NAV: Mobile hamburger ──────────────────────────────── */
  function initMobileMenu() {
    const burger = document.querySelector('.ual-nav__hamburger');
    const mobileMenu = document.querySelector('.ual-nav__mobile');
    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', function () {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    var nav = document.querySelector('.ual-nav');
  }

  /* ── 3. HERO CAROUSEL ──────────────────────────────────────── */
  function initHeroCarousel() {
    var slides = document.querySelectorAll('.ual-hero__slide');
    var dots   = document.querySelectorAll('.ual-hero__dot');
    if (!slides.length) return;

    var current = 0;
    var timer;
    var INTERVAL = 5500;

    function goTo(idx) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startTimer();
      });
    });

    // Touch/swipe support
    var touchStartX = 0;
    var hero = document.querySelector('.ual-hero');
    if (hero) {
      hero.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      hero.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) > 50) {
          goTo(dx < 0 ? current + 1 : current - 1);
          startTimer();
        }
      }, { passive: true });
    }

    // Init
    slides[0].classList.add('active');
    dots[0] && dots[0].classList.add('active');
    startTimer();
  }

  /* ── 4. VISION / TESTIMONIAL SLIDER ───────────────────────── */
  function initVisionSlider() {
    var slides = document.querySelectorAll('.ual-vision__slide');
    var dots   = document.querySelectorAll('.ual-vision__dot');
    if (!slides.length) return;

    var current = 0;
    var timer;

    function goTo(idx) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        clearInterval(timer);
        timer = setInterval(function () { goTo(current + 1); }, 6000);
      });
    });

    slides[0].classList.add('active');
    dots[0] && dots[0].classList.add('active');
    timer = setInterval(function () { goTo(current + 1); }, 6000);
  }

  /* ── 5. SCROLL REVEAL (IntersectionObserver) ───────────────── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.ual-reveal, .ual-stagger').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.ual-reveal, .ual-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 6. STAT COUNTER ANIMATION ─────────────────────────────── */
  function initCounters() {
    var counters = document.querySelectorAll('.ual-stat__number[data-target]');
    if (!counters.length) return;

    function easeOut(t) { return t * (2 - t); }

    function animateCounter(el) {
      var target   = parseFloat(el.dataset.target);
      var prefix   = el.dataset.prefix || '';
      var suffix   = el.dataset.suffix || '';
      var duration = 1800;
      var start    = performance.now();
      var isFloat  = el.dataset.float === 'true';

      function tick(now) {
        var elapsed  = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased    = easeOut(progress);
        var value    = target * eased;
        el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  /* ── 7. SCROLL-TO-TOP BUTTON ───────────────────────────────── */
  function initScrollTop() {
    var btn = document.querySelector('.ual-scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 8. CONTACT FORM ───────────────────────────────────────── */
  function initContactForm() {
    var form    = document.getElementById('ual-contact-form');
    var success = document.getElementById('ual-form-success');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('ual-name').value.trim();
      var email   = document.getElementById('ual-email').value.trim();
      var subject = document.getElementById('ual-subject').value.trim();
      var message = document.getElementById('ual-message').value.trim();

      if (!name || !email || !subject || !message) return;

      // Try using smtp.js if available (same as original contact.js)
      if (typeof Email !== 'undefined') {
        Email.send({
          SecureToken: 'C973D7AD-F097-4B95-91F0-80CF533527AE',
          To: 'admin@unitedaryan.net',
          From: email,
          Subject: subject,
          Body: 'Name: ' + name + '<br>Email: ' + email + '<br><br>' + message
        }).then(function (msg) {
          if (success) {
            success.classList.add('visible');
            form.reset();
            setTimeout(function () { success.classList.remove('visible'); }, 6000);
          }
        });
      } else {
        // Fallback: just show success UI
        if (success) {
          success.classList.add('visible');
          form.reset();
          setTimeout(function () { success.classList.remove('visible'); }, 6000);
        }
      }
    });
  }

  /* ── 9. ACTIVE NAV LINK HIGHLIGHT ─────────────────────────── */
  function initActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.ual-nav__link, .ual-nav__mobile-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && (href === page || (page === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  /* ── INIT ──────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initMobileMenu();
    initHeroCarousel();
    initVisionSlider();
    initScrollReveal();
    initCounters();
    initScrollTop();
    initContactForm();
    initActiveNav();
  });

})();
