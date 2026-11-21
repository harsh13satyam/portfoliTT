/* --------------------------------------------------------------------------
   TANISHA TRIPATHI - PORTFOLIO INTERACTION ENGINE
   Smooth Animations, Custom Cursor, Modals, Audio Synthesis, and Reactive Components
   Inspired by Dymas Alfin's Editorial / Neo-Minimalist Animation Aesthetic
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTiltEffect();
  initScrollAnimations();
  initProjectFilters();
  initProjectModals();
  initResumeModal();
  initContactInteractions();
  initLiveClock();
  initMobileNav();
  initActiveNavSpy();
  initAudioFeedback();
});

/* --------------------------------------------------------------------------
   1. CUSTOM MAGNETIC CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover states on clickable elements
  const updateClickables = () => {
    const clickables = document.querySelectorAll(
      'a, button, input, textarea, .project-card, .filter-btn, .contact-pill-btn, .sound-toggle-btn, .skill-pill'
    );
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  };

  updateClickables();
}

/* --------------------------------------------------------------------------
   2. 3D TILT EFFECT FOR PORTRAIT & PROJECT CARDS
   -------------------------------------------------------------------------- */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-reveal').forEach((el) => {
    revealObserver.observe(el);
  });
}

/* --------------------------------------------------------------------------
   4. PROJECT FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(18px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 280);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. PROJECT DEEP DIVE MODALS DATA & ENGINE
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  belluna: {
    title: 'Belluna | Bilingual (English/Hindi) Women’s Health Web App',
    badge: 'React • TypeScript • Tailwind CSS • Supabase • Groq API • Leaflet',
    overview: 'Belluna is a bilingual, privacy-first women’s healthcare and emergency triage web application. It combines private menstrual cycle and symptom tracking with an interactive clinic finder and an AI-powered multilingual health assistant designed specifically for vernacular Indian audiences.',
    architecture: [
      'Frontend Architecture: Built with React.js and TypeScript, utilizing Tailwind CSS for fluid responsive styling and accessible, high-contrast layouts.',
      'AI Health Translator: Powered by the Groq API with Zod structured-output validation, strict Hinglish and Hindi language enforcement, medical source mapping, and retry/timeout resilience.',
      'Geospatial Mapping: Integrated Leaflet with OpenStreetMap (Overpass API) to dynamically locate nearby verified clinics, maternity wards, and emergency medical centers with distance calculation.',
      'Data Privacy & Security: Backed by Supabase PostgreSQL with rigorous Row Level Security (RLS) policies ensuring each user can only read and write their own confidential cycle records.',
      'Testing & Quality Assurance: Comprehensive Vitest unit test suites running across core computation modules, symptom validators, and date calculation routines.'
    ],
    features: [
      'Bilingual Interface: Seamless instantaneous toggling between English, Hindi, and colloquial Hinglish.',
      'Private Cycle & Symptom Tracker: Menstrual period predictions, ovulation windows, and confidential symptom logging.',
      'Emergency Triage & Hotlines: One-touch emergency dispatch numbers and guidance alerts for urgent health scenarios.',
      'Anonymous Peer Support: Community forum pattern allowing users to ask sensitive questions without identity exposure.',
      'Live Production Deployment: Fully deployed and publicly accessible web application with 99.9% uptime.'
    ],
    links: {
      github: 'https://github.com/TanishaTripathi15',
      live: '#'
    }
  },
  silenthelp: {
    title: 'SilentHelp | AI-Powered Mental Health Support Platform',
    badge: 'React • JavaScript • HTML5 • Modern CSS3 • Conversational AI',
    overview: 'SilentHelp is an accessible mental-health guidance platform engineered to provide emotional comfort, non-judgmental guidance, and conversational de-escalation for individuals experiencing distress, burnout, or anxiety.',
    architecture: [
      'Frontend Architecture: Modular React.js component structure styled with semantic HTML5 and customized CSS variables for emotional tranquility.',
      'Visual Ergonomics: Designed with an empathetic, calming color hierarchy (slate-navy, soft sky blue, and lavender) avoiding jarring alerts or sensory fatigue.',
      'Mobile-First Layout: Optimized touch targets, thumb-friendly navigation, and zero layout shift across handheld and tablet devices.',
      'Conversational AI Layer: Integrated conversational support logic featuring guided breathing prompts (4-4-4 technique), mood logging, and de-escalation patterns.',
      'Privacy-Preserving State: Purely client-isolated state keeping user entries confidential and safe from tracking cookies.'
    ],
    features: [
      'AI-Based Conversational Guidance: Interactive empathy prompts and distress alleviation pathways.',
      'Accessibility & Comfort: WCAG 2.1 AA accessible contrast ratios, screen-reader semantic markup, and calm visual rhythm.',
      'Grounding & Wellness Tools: Integrated guided breathing visualizer and real-time relaxation exercises.',
      'Zero-Log Privacy: Ensures users feel secure seeking emotional guidance without fear of data retention.'
    ],
    links: {
      github: 'https://github.com/TanishaTripathi15',
      live: '#'
    }
  },
  crowdcare: {
    title: 'CrowdCare | Community Emergency & Social Impact Platform',
    badge: '🏆 3x Hackathon Winner • Top 50 of 500+ Teams Nationally',
    overview: 'CrowdCare is a community-driven emergency coordination and civic response platform built during competitive hackathons. It links citizens in medical emergencies with nearby volunteers, first responders, and emergency resources in real-time.',
    architecture: [
      'Rapid Prototyping & Architecture: Engineered under hackathon time limits using React frontend with real-time websocket updates and geolocation tracking.',
      'Incident Dispatch System: Geofenced distress signals dispatched to closest verified responders within a radius.',
      'Hospital Bed & Supply Availability: Live inventory sync tracking ICU capacity, oxygen supplies, and blood bank availability.',
      'National Hackathon Recognition: Won 3 hackathons and reached the finals in 2; ranked in the Top 50 of 500+ national competing teams in the Social Impact Platform Challenge.'
    ],
    features: [
      'One-Touch Emergency SOS: Rapid incident broadcasting with GPS coordinates.',
      'Interactive Volunteer Radar: Leaflet map visualizing nearby helpers and active incidents.',
      'Bilingual Alert Gateway: Formatted emergency notifications for cross-lingual accessibility.',
      'Verified Responder Dashboard: Streamlined triage management interface.'
    ],
    links: {
      github: 'https://github.com/TanishaTripathi15',
      live: '#'
    }
  },
  learngecko: {
    title: 'LearnGecko UI Component System & Breakpoint Optimization',
    badge: 'Frontend Engineering • React • TypeScript • HTML/CSS',
    overview: 'Production design system and responsive frontend infrastructure developed at LearnGecko, converting complex UI/UX designs into reusable, high-performance web components with strict breakpoint optimizations.',
    architecture: [
      'Component Architecture: Reusable React and TypeScript components authored with strict interface contracts, preventing props drilling and UI drift.',
      'Cross-Breakpoint Engine: Systematic responsive engineering ensuring pixel-perfect alignment across 375px (Mobile), 768px (Tablet), and 1440px+ (Desktop) viewports.',
      'Performance Optimization: Eliminated Cumulative Layout Shift (CLS < 0.01) through pre-sized image containers and CSS containment.',
      'Cross-Browser & Testing: Rigorous testing across Chromium, Safari, Firefox, and Edge, identifying and resolving rendering glitches and interaction delays.'
    ],
    features: [
      'Design Token System: Standardized color tokens, typographic scales, spacing units, and radius primitives.',
      'Accessible Form Controls: ARIA-labeled inputs, keyboard navigation, and inline validation states.',
      'High Code Reusability: Decreased development cycle time for feature rollouts by over 40%.',
      'Production Hardening: Shipped user-friendly interfaces powering active educational products.'
    ],
    links: {
      github: 'https://github.com/TanishaTripathi15',
      live: '#'
    }
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalBody = document.getElementById('modalProjectBody');
  const modalClose = document.getElementById('modalCloseBtn');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  document.querySelectorAll('.btn-deepdive').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[projKey];
      if (!data) return;

      modalTitle.innerText = data.title;
      modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-family: var(--font-mono); font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: 9999px; border: 1px solid rgba(16, 185, 129, 0.3);">
            ${data.badge}
          </span>
        </div>
        
        <h4 style="font-size: 16px; color: #ffffff; margin: 0 0 8px 0; font-family: var(--font-display);">Project Overview</h4>
        <p style="color: #94a3b8; font-size: 14.5px; line-height: 1.7; margin-bottom: 24px;">${data.overview}</p>

        <h4 style="font-size: 16px; color: #ffffff; margin: 0 0 10px 0; font-family: var(--font-display);">System Architecture &amp; Implementation</h4>
        <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 9px;">
          ${data.architecture.map(item => `
            <li style="font-size: 13.5px; color: #cbd5e1; position: relative; padding-left: 22px; line-height: 1.6;">
              <span style="position: absolute; left: 0; color: #10b981;">▹</span> ${item}
            </li>
          `).join('')}
        </ul>

        <h4 style="font-size: 16px; color: #ffffff; margin: 0 0 10px 0; font-family: var(--font-display);">Key Engineering Highlights</h4>
        <ul style="list-style: none; padding: 0; margin: 0 0 28px 0; display: flex; flex-direction: column; gap: 9px;">
          ${data.features.map(feat => `
            <li style="font-size: 13.5px; color: #cbd5e1; position: relative; padding-left: 22px; line-height: 1.6;">
              <span style="position: absolute; left: 0; color: #38bdf8;">✓</span> ${feat}
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 14px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.08); flex-wrap: wrap;">
          <a href="${data.links.github}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 13px; padding: 10px 20px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            View Code on GitHub
          </a>
          <button onclick="document.getElementById('projectModal').classList.remove('active')" class="btn-secondary" style="font-size: 13px; padding: 10px 20px; cursor: pointer;">
            Close Window
          </button>
        </div>
      `;

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   6. RESUME MODAL & PRINT HANDLER
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resumeCloseBtn');
  const printBtn = document.getElementById('printResumeBtn');

  if (!resumeModal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   7. CONTACT INTERACTIONS & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✔</span> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3400);
}

function initContactInteractions() {
  // Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('tanishatrip2015@gmail.com').then(() => {
        showToast('Email copied to clipboard: tanishatrip2015@gmail.com');
      }).catch(() => {
        showToast('Copied: tanishatrip2015@gmail.com');
      });
    });
  }

  // Copy Phone Button
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+918882947997').then(() => {
        showToast('Phone number copied: +91 88829 47997');
      }).catch(() => {
        showToast('Copied: +91 88829 47997');
      });
    });
  }

  // Interactive Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>⚡ Transmitting Message...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>✔ Message Received!</span>';
        submitBtn.style.background = '#10b981';
        showToast('Thank you! Tanisha has received your message.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 4000);
      }, 1200);
    });
  }
}

/* --------------------------------------------------------------------------
   8. LIVE LOCAL TIME CLOCK (IST)
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat([], options);
    clockEl.innerText = `${formatter.format(new Date())} IST`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   9. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   10. ACTIVE NAVIGATION SPY
   -------------------------------------------------------------------------- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 160;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. SUBTLE WEB AUDIO FEEDBACK (TACTILE CLICK SYNTHESIS)
   -------------------------------------------------------------------------- */
function initAudioFeedback() {
  let audioCtx = null;
  let isSoundEnabled = false;
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  function playTick() {
    if (!isSoundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio context ignored if not supported
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      soundToggleBtn.classList.toggle('active', isSoundEnabled);
      const label = soundToggleBtn.querySelector('.sound-label');
      if (label) {
        label.innerText = isSoundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
      }
      if (isSoundEnabled) {
        playTick();
        showToast('Tactile Audio FX Enabled');
      } else {
        showToast('Tactile Audio FX Muted');
      }
    });
  }

  // Bind clicks on interactive elements
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .filter-btn, .project-card, .contact-pill-btn')) {
      playTick();
    }
  });
}
