
// -----------------------------
// CLOUDINARY & GALLERY DATA
// -----------------------------
const cloudBase = "https://res.cloudinary.com/dchfozs9d/image/upload/f_auto,q_auto/v1/";

// PLACEHOLDER CLOUDINARY PATHS - UPDATE THESE WITH ACTUAL FILE NAMES
const experienceData = {
  theEssentials: [
    { src: `${cloudBase}experiences/the-essentials/photo1.jpg`, alt: 'Village Walk' },
    { src: `${cloudBase}experiences/the-essentials/photo2.jpg`, alt: 'Scenic Drive' },
    { src: `${cloudBase}experiences/the-essentials/photo3.jpg`, alt: 'Stargazing' }
  ],
  theWild: [
    { src: `${cloudBase}experiences/the-wild/photo1.jpg`, alt: 'Forest Trail' },
    { src: `${cloudBase}experiences/the-wild/photo2.jpg`, alt: 'River Camping' },
    { src: `${cloudBase}experiences/the-wild/photo3.jpg`, alt: 'Birdwatching' }
  ],
  theLand: [
    { src: `${cloudBase}experiences/the-land/photo1.jpg`, alt: 'Seasonal Harvesting' },
    { src: `${cloudBase}experiences/the-land/photo2.jpg`, alt: 'Local Craft' }
  ],
  theMind: [
    { src: `${cloudBase}experiences/the-mind/photo1.jpg`, alt: 'Do-Nothing Time' },
    { src: `${cloudBase}experiences/the-mind/photo2.jpg`, alt: 'Yoga & Reading' }
  ]
};

function renderCarousel(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !experienceData[category]) return;

  const images = experienceData[category];
  
  const slidesHtml = images.map(img => `
    <div class="slide">
      <img src="${img.src}" alt="${img.alt}" class="aspect-[4/3] object-cover w-full">
    </div>
  `).join('');

  container.innerHTML = `
    <button onclick="scrollCarousel(this,-1)" class="carousel-btn left-2 z-10">←</button>
    <button onclick="scrollCarousel(this,1)" class="carousel-btn right-2 z-10">→</button>
    <div class="carousel-track">
      ${slidesHtml}
    </div>
  `;
}

function renderPhotoStack(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !experienceData[category]) return;

  const images = experienceData[category];
  if (images.length === 0) return;

  const stackHtml = images.map((img, index) => {
    let idleTransform = '';
    let hoverTransform = '';
    let zIndex = 30 - index; 

    if (index === 0) {
      idleTransform = 'rotate-0 translate-x-0 translate-y-0';
      hoverTransform = 'group-hover:-translate-x-12 group-hover:-rotate-6';
    } else if (index === 1) {
      idleTransform = 'rotate-3 translate-x-2 translate-y-2';
      hoverTransform = 'group-hover:translate-x-0 group-hover:rotate-0';
    } else if (index === 2) {
      idleTransform = '-rotate-3 -translate-x-2 translate-y-4';
      hoverTransform = 'group-hover:translate-x-12 group-hover:rotate-6';
    } else {
      idleTransform = 'rotate-1 translate-x-4 translate-y-6';
      hoverTransform = 'group-hover:translate-x-24 group-hover:rotate-12';
    }

    return `
      <img src="${img.src}" alt="${img.alt}" 
           class="absolute top-0 left-0 w-full h-full object-cover shadow-lg border-[6px] border-[#f3e9dc] transition-all duration-500 ease-out origin-bottom ${idleTransform} ${hoverTransform}"
           style="z-index: ${zIndex}; border-radius: 4px;">
    `;
  }).join('');

  container.innerHTML = `
    <div class="relative w-full aspect-[4/5] group cursor-pointer">
      ${stackHtml}
    </div>
  `;
  
  const stackWrapper = container.querySelector('.group');
  if (stackWrapper) {
    stackWrapper.addEventListener('click', () => {
      experienceData[category].push(experienceData[category].shift());
      renderPhotoStack(category, containerId);
    });
  }
}

import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // NAVBAR SCROLL + STATE CONTROL
  // -----------------------------
  const nav = document.getElementById('navbar');
  let isMenuOpen = false;

  const updateNavbarOnScroll = () => {
    if (!nav || isMenuOpen) return;

    if (window.scrollY > 50) {
      nav.classList.add('bg-beige/95', 'backdrop-blur-md', 'shadow-sm', 'text-forest');
      nav.classList.remove('text-beige', 'bg-transparent');
    } else {
      nav.classList.remove('bg-beige/95', 'backdrop-blur-md', 'shadow-sm', 'text-forest');
      nav.classList.add('text-beige', 'bg-transparent');
    }
  };

  if (nav && nav.classList.contains('text-beige')) {
    window.addEventListener('scroll', updateNavbarOnScroll);
  }

  // -----------------------------
  // SCROLL REVEAL
  // -----------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // -----------------------------
  // TESTIMONIAL AUTO SCROLL
  // -----------------------------
  const testimonialContainer = document.getElementById('testimonial-container');

  if (testimonialContainer) {
    const scrollInterval = setInterval(() => {
      testimonialContainer.scrollLeft += 1;

      if (testimonialContainer.scrollLeft >= (testimonialContainer.scrollWidth - testimonialContainer.clientWidth)) {
        testimonialContainer.scrollLeft = 0;
      }
    }, 50);

    testimonialContainer.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  }

  // -----------------------------
// HERO INTERACTION (NEW FLOW)
// -----------------------------
const heroNight = document.getElementById('hero-night');
const heroDay = document.getElementById('hero-day');
const lampHotspot = document.getElementById('lamp-hotspot');
const heroText = document.getElementById('hero-text');
const hintText = document.getElementById('hint-text');

if (heroNight && heroDay && lampHotspot) {
  let heroAwakened = false;

  // show hint
  setTimeout(() => {
    if (heroAwakened) return;
    hintText?.classList.remove('opacity-0');
    hintText?.classList.add('opacity-100');
  }, 1400);

  const awaken = () => {

    // prevent re-trigger
    if (heroDay.style.opacity === "1") return;
    heroAwakened = true;

    // STEP 1: light turns on (remove darkness)
    heroNight.style.filter = "grayscale(0) brightness(1) blur(0)";

    // hide hotspot
    lampHotspot.classList.add('opacity-0', 'pointer-events-none');

    // fade hint
    hintText?.classList.replace('opacity-100', 'opacity-0');

    // show text
    setTimeout(() => {
      heroText.style.visibility = 'visible';
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateX(0)';
    }, 600);

    // STEP 2: fade into day
setTimeout(() => {
  heroDay.style.visibility = "visible";

  // force browser to register visibility change
  heroDay.offsetHeight;

  heroDay.style.opacity = "1";
  hintText?.classList.remove('opacity-100');
  hintText?.classList.add('opacity-0');
}, 250);

    // unlock scroll
    setTimeout(() => {
      document.body.classList.remove('overflow-hidden');
    }, 2200);
  };

  lampHotspot.addEventListener('click', awaken);
  window.addEventListener('wheel', awaken, { once: true });
  window.addEventListener('touchmove', awaken, { once: true });
}

  // -----------------------------
  // MOBILE MENU (FIXED PROPERLY)
  // -----------------------------
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuToggle && mobileMenu && nav) {

    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      isMenuOpen = true;

      // FORCE readable navbar
      nav.classList.remove('text-beige');
      nav.classList.add('text-forest', 'bg-beige/95', 'backdrop-blur-md');
    };

    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      isMenuOpen = false;

      // restore correct state
      updateNavbarOnScroll();
    };

    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }


  // Initialize Carousels
  renderCarousel('theEssentials', 'carousel-the-essentials');
  renderCarousel('theWild', 'carousel-the-wild');
  renderCarousel('theLand', 'carousel-the-land');
  renderCarousel('theMind', 'carousel-the-mind');

  // Initialize Stacks
  renderPhotoStack('theEssentials', 'stack-the-essentials');
  renderPhotoStack('theWild', 'stack-the-wild');
  renderPhotoStack('theLand', 'stack-the-land');
  renderPhotoStack('theMind', 'stack-the-mind');

});
