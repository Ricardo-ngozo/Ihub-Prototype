/**
 * main.js
 * Controls baseline landing page state functions: Dark mode, 
 * Hero text writing engine, Timeline trackers, and Form state routers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initTypewriter();
  initScrollGlow();
  initApplicationWizard();
});

// --- DARK MODE LOGIC ---
function initDarkMode() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('color-theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  document.documentElement.classList.toggle('dark', isDark);
  darkIcon.classList.toggle('hidden', isDark);
  lightIcon.classList.toggle('hidden', !isDark);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    darkIcon.classList.toggle('hidden', isDark);
    lightIcon.classList.toggle('hidden', !isDark);
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
  });
}

// --- TYPEWRITER ENGINE LOGIC ---
function initTypewriter() {
  const typingSpan = document.getElementById('typing-hero-text');
  if (!typingSpan) return;
  const phrases = ["Full-Stack Devs", "Digital Marketers", "Global Leaders"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; 
    } else {
      typingSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; 
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; 
    }
    setTimeout(type, typeSpeed);
  }
  type();
}

// --- SCROLL GLOW TIMELINE TRACKER ---
function initScrollGlow() {
  const trackSection = document.getElementById('timeline-track-section');
  const glowLine = document.getElementById('timeline-glow-line');
  const dots = document.querySelectorAll('.timeline-dot');
  
  if (!trackSection || !glowLine) return;

  function updateGlow() {
    const rect = trackSection.getBoundingClientRect();
    const calculationLine = window.innerHeight / 2;
    
    let totalDistanceScrolledInside = calculationLine - rect.top;
    let progressRatio = totalDistanceScrolledInside / rect.height;
    progressRatio = Math.min(Math.max(progressRatio, 0), 1); 

    glowLine.style.height = `${progressRatio * 100}%`;

    dots.forEach(dot => {
      const dotRect = dot.getBoundingClientRect();
      const dotCenter = dotRect.top + dotRect.height / 2;
      dot.classList.toggle('active', dotCenter < calculationLine);
    });
  }

  window.addEventListener('scroll', updateGlow);
  window.addEventListener('resize', updateGlow);
  updateGlow();
}

// --- INTERACTIVE APPLICATION WIZARD CONTROLS ---
let activeStep = 1;
let chosenTrack = 'webdev';

function selectTrack(track) {
  chosenTrack = track;
  const cardDev = document.getElementById('track-card-webdev');
  const cardMark = document.getElementById('track-card-marketing');
  const dotDev = document.getElementById('radio-dot-webdev');
  const dotMark = document.getElementById('radio-dot-marketing');

  if (track === 'webdev') {
    cardDev.classList.add('active');
    cardMark.classList.remove('active');
    dotDev.classList.add('active');
    dotMark.classList.remove('active');
  } else {
    cardMark.classList.add('active');
    cardDev.classList.remove('active');
    dotMark.classList.add('active');
    dotDev.classList.remove('active');
  }
}

// --- VALIDATION HELPERS ---
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/[\s().-]/g, '');
  return /^\+?\d{7,15}$/.test(digits);
}

function showFieldError(fieldId, message) {
  const errEl = document.getElementById(`${fieldId}-error`);
  const inputEl = document.getElementById(fieldId);
  if (errEl) {
    errEl.textContent = message;
    errEl.classList.remove('hidden');
  }
  if (inputEl) inputEl.classList.add('input-invalid');
}

function clearFieldError(fieldId) {
  const errEl = document.getElementById(`${fieldId}-error`);
  const inputEl = document.getElementById(fieldId);
  if (errEl) {
    errEl.textContent = '';
    errEl.classList.add('hidden');
  }
  if (inputEl) inputEl.classList.remove('input-invalid');
}

function validateStep2() {
  let valid = true;

  const nameVal = document.getElementById('app-name').value.trim();
  clearFieldError('app-name');
  if (!nameVal) {
    showFieldError('app-name', 'Please enter your full name.');
    valid = false;
  }

  const emailVal = document.getElementById('app-email').value.trim();
  clearFieldError('app-email');
  if (!emailVal) {
    showFieldError('app-email', 'Please enter your email address.');
    valid = false;
  } else if (!isValidEmail(emailVal)) {
    showFieldError('app-email', 'Please enter a valid email address (e.g. name@example.com).');
    valid = false;
  }

  const ageVal = document.getElementById('app-age').value.trim();
  clearFieldError('app-age');
  if (!ageVal) {
    showFieldError('app-age', 'Please enter your age.');
    valid = false;
  } else if (Number(ageVal) < 16 || Number(ageVal) > 99) {
    showFieldError('app-age', 'Age must be between 16 and 99.');
    valid = false;
  }

  const phoneVal = document.getElementById('app-phone').value.trim();
  clearFieldError('app-phone');
  if (!phoneVal) {
    showFieldError('app-phone', 'Please enter your phone number.');
    valid = false;
  } else if (!isValidPhone(phoneVal)) {
    showFieldError('app-phone', 'Please enter a valid phone number.');
    valid = false;
  }

  const statusVal = document.getElementById('app-status').value;
  clearFieldError('app-status');
  if (!statusVal) {
    showFieldError('app-status', 'Please select your current status.');
    valid = false;
  }

  return valid;
}

function moveWizard(direction) {
  if (direction === 1 && activeStep === 2) {
    if (!validateStep2()) return;
  }

  document.getElementById(`form-step-${activeStep}`).classList.add('hidden');
  activeStep += direction;

  if (activeStep > 3) {
    document.getElementById('form-step-success').classList.remove('hidden');
    document.getElementById('wizard-navigation-buttons').classList.add('hidden');
    document.getElementById('wizard-step-caption').innerText = "Process Concluded";
    document.getElementById('wizard-progress-fill').style.width = "100%";
    return;
  }

  document.getElementById(`form-step-${activeStep}`).classList.remove('hidden');
  document.getElementById('wizard-step-caption').innerText = `Step ${activeStep} of 3: ` + (activeStep === 2 ? "Your Details" : "Motivation Profile");
  document.getElementById('wizard-progress-fill').style.width = `${(activeStep / 3) * 100}%`;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (activeStep === 1) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  if (activeStep === 3) {
    nextBtn.innerText = "Submit Record";
    nextBtn.classList.add('orange-variant');
  } else {
    nextBtn.innerText = "Continue";
    nextBtn.classList.remove('orange-variant');
  }
}

function initApplicationWizard() {
  const slider = document.getElementById('motivation-slider');
  if(slider) {
    slider.addEventListener('input', (e) => {
      document.getElementById('slider-value').innerText = e.target.value + '/10';
    });
  }

  const motivationField = document.getElementById('app-motivation');
  const motivationCounter = document.getElementById('app-motivation-counter');
  if (motivationField && motivationCounter) {
    const maxLen = motivationField.getAttribute('maxlength') || 400;
    motivationField.addEventListener('input', () => {
      motivationCounter.textContent = `${motivationField.value.length} / ${maxLen}`;
    });
  }
  
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => moveWizard(-1));
  nextBtn.addEventListener('click', () => moveWizard(1));
}