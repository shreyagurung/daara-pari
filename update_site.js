const fs = require('fs');

// 1. UPDATE main.js
let mainJs = fs.readFileSync('main.js', 'utf8');
const galleryCode = `
// -----------------------------
// CLOUDINARY & GALLERY DATA
// -----------------------------
const cloudBase = "https://res.cloudinary.com/dchfozs9d/image/upload/f_auto,q_auto/v1/";

// PLACEHOLDER CLOUDINARY PATHS - UPDATE THESE WITH ACTUAL FILE NAMES
const experienceData = {
  theEssentials: [
    { src: \`\${cloudBase}experiences/the-essentials/photo1.jpg\`, alt: 'Village Walk' },
    { src: \`\${cloudBase}experiences/the-essentials/photo2.jpg\`, alt: 'Scenic Drive' },
    { src: \`\${cloudBase}experiences/the-essentials/photo3.jpg\`, alt: 'Stargazing' }
  ],
  theWild: [
    { src: \`\${cloudBase}experiences/the-wild/photo1.jpg\`, alt: 'Forest Trail' },
    { src: \`\${cloudBase}experiences/the-wild/photo2.jpg\`, alt: 'River Camping' },
    { src: \`\${cloudBase}experiences/the-wild/photo3.jpg\`, alt: 'Birdwatching' }
  ],
  theLand: [
    { src: \`\${cloudBase}experiences/the-land/photo1.jpg\`, alt: 'Seasonal Harvesting' },
    { src: \`\${cloudBase}experiences/the-land/photo2.jpg\`, alt: 'Local Craft' }
  ],
  theMind: [
    { src: \`\${cloudBase}experiences/the-mind/photo1.jpg\`, alt: 'Do-Nothing Time' },
    { src: \`\${cloudBase}experiences/the-mind/photo2.jpg\`, alt: 'Yoga & Reading' }
  ]
};

function renderCarousel(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !experienceData[category]) return;

  const images = experienceData[category];
  
  const slidesHtml = images.map(img => \`
    <div class="slide">
      <img src="\${img.src}" alt="\${img.alt}" class="aspect-[4/3] object-cover w-full">
    </div>
  \`).join('');

  container.innerHTML = \`
    <button onclick="scrollCarousel(this,-1)" class="carousel-btn left-2 z-10">←</button>
    <button onclick="scrollCarousel(this,1)" class="carousel-btn right-2 z-10">→</button>
    <div class="carousel-track">
      \${slidesHtml}
    </div>
  \`;
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

    return \`
      <img src="\${img.src}" alt="\${img.alt}" 
           class="absolute top-0 left-0 w-full h-full object-cover shadow-lg border-[6px] border-[#f3e9dc] transition-all duration-500 ease-out origin-bottom \${idleTransform} \${hoverTransform}"
           style="z-index: \${zIndex}; border-radius: 4px;">
    \`;
  }).join('');

  container.innerHTML = \`
    <div class="relative w-full aspect-[4/5] group cursor-pointer">
      \${stackHtml}
    </div>
  \`;
  
  // click cycle
  const stackWrapper = container.querySelector('.group');
  if (stackWrapper) {
    stackWrapper.addEventListener('click', () => {
      experienceData[category].push(experienceData[category].shift());
      renderPhotoStack(category, containerId);
    });
  }
}
`;

const initCode = `
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
`;

mainJs = galleryCode + '\n' + mainJs.replace(/}\);\s*$/, initCode + '\n});');
fs.writeFileSync('main.js', mainJs);

// 2. UPDATE experience.html
let expHtml = fs.readFileSync('experience.html', 'utf8');

expHtml = expHtml.replace(
  /<div class="md:col-span-8 space-y-12 pt-4 md:pt-12">([\\s\\S]*?)<h3 class="text-xl font-serif mb-2">Village Walks<\\/h3>/,
  '<div class="md:col-span-4 space-y-12 pt-4 md:pt-12">$1<h3 class="text-xl font-serif mb-2">Village Walks</h3>'
);
expHtml = expHtml.replace(
  /<p class="text-forest\\/80 font-light leading-relaxed">On clear nights, the mountains disappear into darkness and the sky takes over.<\\/p>\\s*<\\/div>\\s*<\\/div>\\s*<\\/div>/,
  '<p class="text-forest/80 font-light leading-relaxed">On clear nights, the mountains disappear into darkness and the sky takes over.</p>\\n          </div>\\n        </div>\\n        <div class="md:col-span-4 pt-4 md:pt-12 flex justify-center items-start">\\n          <div id="stack-the-essentials" class="w-[85%]"></div>\\n        </div>\\n      </div>'
);

expHtml = expHtml.replace(
  /<div class="md:col-span-8 space-y-12 pt-4 md:pt-12">([\\s\\S]*?)<h3 class="text-xl font-serif mb-2">Forest Trails<\\/h3>/,
  '<div class="md:col-span-4 space-y-12 pt-4 md:pt-12">$1<h3 class="text-xl font-serif mb-2">Forest Trails</h3>'
);
expHtml = expHtml.replace(
  /<p class="max-w-xl border-l border-forest\\/20 pl-5 font-serif text-xl italic leading-relaxed text-forest\\/90">Guided locally by my cousin Harru!<\\/p>\\s*<\\/div>\\s*<\\/div>/,
  '<p class="max-w-xl border-l border-forest/20 pl-5 font-serif text-xl italic leading-relaxed text-forest/90">Guided locally by my cousin Harru!</p>\\n        </div>\\n        <div class="md:col-span-4 pt-4 md:pt-12 flex justify-center items-start">\\n          <div id="stack-the-wild" class="w-[85%]"></div>\\n        </div>\\n      </div>'
);

expHtml = expHtml.replace(
  /<div class="md:col-span-8 space-y-12 pt-4 md:pt-12">([\\s\\S]*?)<h3 class="text-xl font-serif mb-2">Seasonal Harvesting<\\/h3>/,
  '<div class="md:col-span-4 space-y-12 pt-4 md:pt-12">$1<h3 class="text-xl font-serif mb-2">Seasonal Harvesting</h3>'
);
expHtml = expHtml.replace(
  /<p class="text-forest\\/80 font-light leading-relaxed">Learn forgotten crafts and traditional techniques preserved quietly in the hills through generations.<\\/p>\\s*<\\/div>\\s*<\\/div>\\s*<\\/div>/,
  '<p class="text-forest/80 font-light leading-relaxed">Learn forgotten crafts and traditional techniques preserved quietly in the hills through generations.</p>\\n          </div>\\n        </div>\\n        <div class="md:col-span-4 pt-4 md:pt-12 flex justify-center items-start">\\n          <div id="stack-the-land" class="w-[85%]"></div>\\n        </div>\\n      </div>'
);

expHtml = expHtml.replace(
  /<div class="md:col-span-8 space-y-12 pt-4 md:pt-12">([\\s\\S]*?)<h3 class="text-xl font-serif mb-2">Do-Nothing Time<\\/h3>/,
  '<div class="md:col-span-4 space-y-12 pt-4 md:pt-12">$1<h3 class="text-xl font-serif mb-2">Do-Nothing Time</h3>'
);
expHtml = expHtml.replace(
  /<p class="text-forest\\/80 font-light leading-relaxed">A different kind of silence reveals itself after dark.<\\/p>\\s*<\\/div>\\s*<\\/div>\\s*<\\/div>/,
  '<p class="text-forest/80 font-light leading-relaxed">A different kind of silence reveals itself after dark.</p>\\n          </div>\\n        </div>\\n        <div class="md:col-span-4 pt-4 md:pt-12 flex justify-center items-start">\\n          <div id="stack-the-mind" class="w-[85%]"></div>\\n        </div>\\n      </div>'
);

fs.writeFileSync('experience.html', expHtml);

// 3. UPDATE gallery.html
let galleryHtml = fs.readFileSync('gallery.html', 'utf8');

const galleryInjection = `
<!-- SECTION TITLE: EXPERIENCES -->
<section class="mx-auto max-w-2xl px-6 pt-32 pb-16">
  <p class="text-xs uppercase tracking-[0.3em] text-forest/50">Two</p>
  <h2 class="font-serif text-3xl md:text-5xl font-light mt-6">Experiences</h2>
</section>

<!-- THE ESSENTIALS -->
<section class="mx-auto max-w-5xl px-6">
  <p class="font-serif italic text-xl mb-4">The Essentials</p>
  <div id="carousel-the-essentials" class="relative"></div>
</section>

<!-- THE WILD -->
<section class="mx-auto max-w-5xl px-6 pt-20">
  <p class="font-serif italic text-xl mb-4">The Wild</p>
  <div id="carousel-the-wild" class="relative"></div>
</section>

<!-- THE LAND -->
<section class="mx-auto max-w-5xl px-6 pt-20">
  <p class="font-serif italic text-xl mb-4">The Land</p>
  <div id="carousel-the-land" class="relative"></div>
</section>

<!-- THE MIND -->
<section class="mx-auto max-w-5xl px-6 pt-20">
  <p class="font-serif italic text-xl mb-4">The Mind</p>
  <div id="carousel-the-mind" class="relative"></div>
</section>

<!-- CTA -->
<section class="px-6 py-40 text-center">
`;

galleryHtml = galleryHtml.replace(/<!-- CTA -->\\s*<section class="px-6 py-40 text-center">/, galleryInjection);

fs.writeFileSync('gallery.html', galleryHtml);

console.log("Done updating files!");
