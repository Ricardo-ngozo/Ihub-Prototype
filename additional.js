/**
 * additional.js
 * Sandbox script area reserved for custom user operations.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("iHub Africa custom extension engine successfully mounted.");
});

/**
 * FUNCTION 1:  Image carousel/slider(Mukelani)
 */
let currentIndex = 0;

function moveSlide(direction) {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  // Update the current index based on button direction
  currentIndex += direction;

  // Loop around if the user goes past the first or last slide
  if (currentIndex < 0) {
    currentIndex = totalSlides - 1; // Go to last slide
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0; // Loop back to first slide
  }

  // Shift the track horizontally by the index percentage
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}


/**
 * FUNCTION 2: Form Input Field Data Sanitization 
 */
// Function to handle scroll animations using existing HTML classes
function initScrollAnimations() {
    // 1. Target the existing elements directly from your HTML layout
    const targetSelectors = [
        '.hero-left-col', 
        '.hero-right-col', 
        '.timeline-header',
        '.timeline-row', 
        '.wizard-card'
    ];
    
    // Combine selectors into a single string for querySelectorAll
    const animateElements = document.querySelectorAll(targetSelectors.join(', '));

    // 2. Setup the Intersection Observer configuration
    const observerOptions = {
        root: null, // default: browser viewport
        rootMargin: '0px 0px -100px 0px', // Triggers slightly before element hits the bottom view
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    // 3. Create the observer logic
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the active class to trigger CSS transitions
                entry.target.classList.add('scroll-active');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Initialize elements with default hidden states and start observing
    animateElements.forEach(element => {
        element.classList.add('scroll-hidden');
        observer.observe(element);
    });
}

// Run the function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

/**
 * FUNCTION 3: Navigation Menu Toggle & Active Link Highlighting - Kamogelo
 */
function customFunctionThree() {
 /* ── 1. GRAB ELEMENTS ───────────────────────────────────────── */

const navbar       = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav-container');
const navLinks     = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections     = document.querySelectorAll('section[id]');


/* ── 2. CREATE & INJECT HAMBURGER BUTTON ────────────────────── */

const hamburger = document.createElement('button');
hamburger.className = 'hamburger-btn';
hamburger.setAttribute('aria-label',    'Toggle navigation menu');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'mobile-nav-links');
hamburger.innerHTML = `
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
`;

// Give nav-links an id so aria-controls can reference it
navLinks.id = 'mobile-nav-links';

// Insert hamburger before the nav-controls (Apply Now button stays last)
const navControls = document.querySelector('.nav-controls');
navContainer.insertBefore(hamburger, navControls);


/* ── 3. OPEN / CLOSE HELPERS ────────────────────────────────── */

function openMenu() {
  navLinks.classList.add('is-open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  navLinks.classList.remove('is-open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  navLinks.classList.contains('is-open') ? closeMenu() : openMenu();
}


/* ── 4. HAMBURGER CLICK ─────────────────────────────────────── */

hamburger.addEventListener('click', toggleMenu);


/* ── 5. CLOSE MENU ON NAV LINK CLICK ───────────────────────── */

navLinkItems.forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ── 6. CLOSE MENU ON OUTSIDE CLICK ────────────────────────── */

document.addEventListener('click', (e) => {
  if (!navContainer.contains(e.target) && navLinks.classList.contains('is-open')) {
    closeMenu();
  }
});


/* ── 7. CLOSE MENU ON ESCAPE KEY ────────────────────────────── */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
    closeMenu();
    hamburger.focus(); // Return focus for accessibility
  }
});


/* ── 8. STICKY SHADOW ON SCROLL ─────────────────────────────── */

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });


/* ── 9. ACTIVE LINK HIGHLIGHT ON SCROLL ─────────────────────── */

function updateActiveLink() {
  const scrollY = window.scrollY + 80; // offset for sticky navbar height
  let currentSection = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('is-active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('is-active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink(); // Run once on page load


/* ── 10. SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});
}

/**
 * FUNCTION 4: Local Storage Backup Recovery Cache
 */
function customFunctionFour() {}

/**
 * FUNCTION 5: Interactive Sound FX Toggle
 */
function customFunctionFive() {}

/**
 * FUNCTION 6: Advanced Multi-Currency Sponsorship Matrix
 */
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

// Open modal
openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking outside modal box
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});