// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe sections and cards
document.addEventListener('DOMContentLoaded', () => {
  // Observe main sections
  document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
  });

  // Observe feature cards with staggered delay
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('scroll-animate');
    observer.observe(card);
  });

  // Observe drive cards with staggered delay
  document.querySelectorAll('.drive-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('scroll-animate');
    observer.observe(card);
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add parallax effect to background on scroll (subtle)
let lastScrollY = window.scrollY;
const bgPattern = document.querySelector('.bg-pattern');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (bgPattern) {
    bgPattern.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
  lastScrollY = scrollY;
}, { passive: true });

// Add hover effect to stat numbers
document.querySelectorAll('.stat-value').forEach(stat => {
  stat.addEventListener('mouseenter', () => {
    stat.style.transform = 'scale(1.1)';
    stat.style.transition = 'transform 0.3s ease';
  });
  
  stat.addEventListener('mouseleave', () => {
    stat.style.transform = 'scale(1)';
  });
});

// Track CTA button clicks
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log('CTA button clicked');
    // Add analytics tracking here if needed
  });
});

// Add loading animation complete class
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Lazy load images if any are added later
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
