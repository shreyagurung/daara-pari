import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Bar Scroll Effect
  const nav = document.getElementById('navbar');
  // Only apply scroll effect if the navbar starts transparent/beige (Home page)
  if (nav && nav.classList.contains('text-beige')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('bg-beige/95', 'backdrop-blur-md', 'shadow-sm', 'text-forest');
        nav.classList.remove('text-beige', 'bg-transparent');
      } else {
        nav.classList.remove('bg-beige/95', 'backdrop-blur-md', 'shadow-sm', 'text-forest');
        nav.classList.add('text-beige', 'bg-transparent');
      }
    });
  }

  // Scroll Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Testimonial Auto-scroll (if present)
  const testimonialContainer = document.getElementById('testimonial-container');
  if (testimonialContainer) {
    let scrollAmount = 0;
    const step = 1;
    const scrollInterval = setInterval(() => {
      testimonialContainer.scrollLeft += step;
      if (testimonialContainer.scrollLeft >= (testimonialContainer.scrollWidth - testimonialContainer.clientWidth)) {
        testimonialContainer.scrollLeft = 0;
      }
    }, 50);

    testimonialContainer.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    // Not restarting on mouseleave for simplicity, but could be added.
  }

  // Night to Day Effect (Real Image Lamp Click)
  const heroImg = document.getElementById('hero-img');
  const lampHotspot = document.getElementById('lamp-hotspot');
  const heroText = document.getElementById('hero-text');
  const hintText = document.getElementById('hint-text');
  
  if (heroImg && lampHotspot) {
    // Show hint after the image has settled, while the lamp still holds attention.
    setTimeout(() => {
      if (hintText && !heroImg.classList.contains('hero-day')) {
        hintText.style.opacity = '';
        hintText.classList.remove('opacity-0');
        hintText.classList.add('opacity-100');
      }
    }, 1400);

    setTimeout(() => {
      if (hintText && !heroImg.classList.contains('hero-day')) {
        hintText.classList.remove('text-white/60');
        hintText.classList.add('text-white/75');
      }
    }, 5600);

    if (heroText) {
      heroText.style.opacity = '0';
      heroText.style.transform = 'translateX(40px)';
      heroText.style.visibility = 'hidden';
    }

    const awaken = () => {
      if (heroImg.classList.contains('hero-day')) return;

      // 1. Brighten image and remove filters
      heroImg.style.filter = '';
      heroImg.classList.remove('hero-night', 'grayscale', 'blur-[1.5px]', 'brightness-[0.28]');
      heroImg.classList.add('hero-day', 'grayscale-0', 'blur-0', 'brightness-100');

      // 2. Hide hotspot and hint
      lampHotspot.classList.add('opacity-0', 'pointer-events-none');
      if (hintText) {
        hintText.style.opacity = '';
        hintText.classList.remove('opacity-100');
        hintText.classList.add('opacity-0');
      }

      // 3. Reveal Hero Text
      if (heroText) {
        heroText.style.visibility = 'visible';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateX(0)';
        heroText.classList.remove('opacity-0', 'translate-x-[40px]');
        heroText.classList.add('opacity-100', 'translate-x-0');
      }

      // 4. Allow scrolling
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
      }, 300); 
    };

    lampHotspot.addEventListener('click', awaken);
    
    // Also awaken on scroll attempts
    window.addEventListener('wheel', awaken, { once: true });
    window.addEventListener('touchmove', awaken, { once: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'Space', 'PageDown'].includes(e.code) || e.key === ' ' || e.key === 'ArrowDown') {
        awaken();
      }
    }, { once: true });
  }
});
