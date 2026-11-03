/* ============================================================
   script.js  —  Eduardo Montero Personal Portfolio
   ============================================================ */

// ── Navbar scroll ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Typed text effect ─────────────────────────────────────
const phrases = [
  'Quality Analyst',
  'Trust & Safety Specialist',
  'Full Stack Developer in Training',
  'Fraud Prevention Expert',
  'Workflow Automation Enthusiast',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.innerHTML = current.slice(0, charIndex - 1) + '<span class="cursor"></span>';
    charIndex--;
  } else {
    typedEl.innerHTML = current.slice(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; type(); }, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(type, isDeleting ? 50 : 90);
}

type();

// ── Intersection Observer — fade-in animation ─────────────
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      fadeObserver.unobserve(el);
    }
  });
}, observerOptions);

// Observe cards and timeline items
document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item'
).forEach(el => fadeObserver.observe(el));

// ── Active nav link on scroll ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent-light)'
          : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth scroll for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Subtle parallax on hero blobs ─────────────────────────
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

window.addEventListener('mousemove', e => {
  const xPct = (e.clientX / window.innerWidth - 0.5) * 30;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 30;
  if (blob1) blob1.style.transform = `translate(${xPct}px, ${yPct}px)`;
  if (blob2) blob2.style.transform = `translate(${-xPct * 0.6}px, ${-yPct * 0.6}px)`;
}, { passive: true });
