// ============================================================
//  NAV — scroll shadow + mobile hamburger
// ============================================================
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================================================
//  SCROLL REVEAL — fade-in sections on scroll
// ============================================================
const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .timeline__item, .about__grid, .contact__form'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.revealed, [style*="opacity: 0"]').forEach(() => {});
});

// Inject revealed style
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ============================================================
//  ACTIVE NAV LINK — highlight link for current section
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// Active link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav__links a.active { color: var(--color-accent) !important; }`;
document.head.appendChild(activeStyle);

// ============================================================
//  IMAGE PROTECTION — prevent right-click, drag, and save
// ============================================================
// Disable right-click on the entire page
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG' || e.target.closest('.about__image-placeholder, .gallery__item, .gallery__grid')) {
    e.preventDefault();
  }
});

// Disable drag on all images
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// Block common save/print shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl+S (save), Ctrl+Shift+S (save as), Ctrl+P (print), PrintScreen
  if (
    (e.ctrlKey && e.key === 's') ||
    (e.ctrlKey && e.shiftKey && e.key === 'S') ||
    (e.ctrlKey && e.key === 'p') ||
    e.key === 'PrintScreen'
  ) {
    e.preventDefault();
  }
});

// ============================================================
//  CONTACT FORM — Netlify success message
// ============================================================
const form = document.querySelector('.contact__form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center; padding:3rem; color: var(--color-accent); font-family: var(--font-mono);">
            <div style="font-size:2rem; margin-bottom:1rem;">&#10003;</div>
            <p>Message sent! I'll get back to you soon.</p>
          </div>`;
      }
    } catch {
      alert('Something went wrong. Please try again or email me directly.');
    }
  });
}
