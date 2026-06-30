// ===== Navbar scroll effect =====
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== Form demo =====
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.classList.remove('d-none');
    form.reset();
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ===== Animated counters =====
const animateCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('es-PE');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      entry.target.dataset.done = '1';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
  '.section-title, .service-card, .tech-box, .stat-box, .client-box, .iso-badge, .doc-card, .dashboard-card, .hero-card, .locations-grid > div, .feature-list > div, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

// ===== Footer year =====
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');
const setActive = () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
};
window.addEventListener('scroll', setActive);