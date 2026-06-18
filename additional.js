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
 * FUNCTION 3: Third-Party Webhook Connector
 */
function customFunctionThree() {}

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
function customFunctionSix() {}