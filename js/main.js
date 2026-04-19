// ========== FloraBal Main JavaScript ==========

// Language Management
const Lang = {
  current: localStorage.getItem('florabal-lang') || 'es',

  init() {
    this.setLang(this.current);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setLang(btn.dataset.lang));
    });
  },

  setLang(lang) {
    this.current = lang;
    localStorage.setItem('florabal-lang', lang);

    if (lang === 'en') {
      document.body.classList.add('lang-en');
    } else {
      document.body.classList.remove('lang-en');
    }

    // Update active buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update page title
    const titleEl = document.querySelector('title');
    if (titleEl && titleEl.dataset.es && titleEl.dataset.en) {
      titleEl.textContent = lang === 'en' ? titleEl.dataset.en : titleEl.dataset.es;
    }
  }
};

// Mobile Navigation
const MobileNav = {
  init() {
    const hamburger = document.querySelector('.nav__hamburger');
    const links = document.querySelector('.nav__links');
    if (!hamburger || !links) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        links.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && links.classList.contains('open')) {
        hamburger.classList.remove('open');
        links.classList.remove('open');
      }
    });
  }
};

// Header scroll effect
const Header = {
  init() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
};

// FAQ Accordion
const FAQ = {
  init() {
    document.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-item__answer');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-item__answer').style.maxHeight = '0';
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
};

// Scroll animations
const Animations = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .step, .testimonial-card, .blog-card, .team-card').forEach(el => {
      observer.observe(el);
    });
  }
};

// Contact Form
const ContactForm = {
  init() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lang = Lang.current;
      const msg = lang === 'en'
        ? 'Thank you! Your message has been sent. We will get back to you soon.'
        : 'Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.';
      alert(msg);
      form.reset();
    });
  }
};

// Active nav link
const ActiveNav = {
  init() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
};

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Lang.init();
  MobileNav.init();
  Header.init();
  FAQ.init();
  Animations.init();
  ContactForm.init();
  ActiveNav.init();
});
