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

function moveWizard(direction) {
  if (direction === 1 && activeStep === 2) {
    const nameVal = document.getElementById('app-name').value.trim();
    const emailVal = document.getElementById('app-email').value.trim();
    if(!nameVal || !emailVal) {
      alert("Please fill out your identity credentials before shifting phases.");
      return;
    }
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
  document.getElementById('wizard-step-caption').innerText = `Step ${activeStep} of 3: ` + (activeStep === 2 ? "Identity Credentials" : "Motivation Profile");
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
  
  document.getElementById('prev-btn').addEventListener('click', () => moveWizard(-1));
  document.getElementById('next-btn').addEventListener('click', () => moveWizard(1));
}

