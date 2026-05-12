/* =========================================================
   VANTG MARKETING — MAIN JS
   ========================================================= */

(function () {
  'use strict';

  /* ── Navbar scroll state ─────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── Mobile menu ─────────────────────────────────────── */
  const navToggle  = document.getElementById('navToggle');
  const navMobile  = document.getElementById('navMobile');
  const mobileLinks = navMobile.querySelectorAll('.mobile-link');

  navToggle.addEventListener('click', function () {
    const open = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Smooth scroll offset for fixed nav ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ─────────────── */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Contact form async submit ───────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      formSuccess.style.display = 'none';
      formError.style.display   = 'none';
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending…';

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          formSuccess.style.display = 'block';
          contactForm.reset();
        } else {
          formError.style.display = 'block';
        }
      } catch (_) {
        formError.style.display = 'block';
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  /* ── Active nav link highlight on scroll ──────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.style.color = '';
          });
          const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
          if (active && !active.classList.contains('btn-nav')) {
            active.style.color = '#F9FAFB';
          }
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

})();
