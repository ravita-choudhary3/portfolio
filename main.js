/**
 * Main Interactive Logic for Ravita Choudhary's Portfolio
 * Includes Custom Cursor, Theme Switcher, Typing Effects, Certificate Modal, and Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTheme();
  initTypingEffect();
  initMobileMenu();
  initCertificates();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
});

/* ----------------------------------------------------
   1. Custom Glowing Interactive Cursor
----------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;
  let isVisible = false;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (!isVisible) {
      dot.style.opacity = '1';
      outline.style.opacity = '1';
      isVisible = true;
    }
  });

  // Physics trailing loop for outline ring
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Attach hover scaling to all clickable items
  function refreshCursorHoverTargets() {
    const targets = document.querySelectorAll('a, button, input, textarea, .cert-card, .project-card, .filter-btn, .code-tag, .cursor-pointer');
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
  refreshCursorHoverTargets();
  window.refreshCursorHoverTargets = refreshCursorHoverTargets;

  // Window enter & leave events
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    outline.style.opacity = '1';
    isVisible = true;
  });
}

/* ----------------------------------------------------
   2. Theme Switcher (Dark / Light Mode)
----------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove('light-theme');
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-theme');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
      showToast(isLight ? '☀️ Light mode enabled' : '🌙 Dark mode enabled');
    });
  }

  function updateThemeIcon(isLight) {
    if (!themeIcon) return;
    if (isLight) {
      themeIcon.className = 'fas fa-moon text-blue-500 text-base';
    } else {
      themeIcon.className = 'fas fa-sun text-yellow-400 text-base';
    }
  }
}

/* ----------------------------------------------------
   3. Typing Effect in Hero Section
----------------------------------------------------- */
function initTypingEffect() {
  const targetElement = document.getElementById('typing-text');
  if (!targetElement) return;

  const phrases = [
    'Computer Science Undergrad @ LPU',
    'Systems & Low-Level OS Developer',
    'IoT & Embedded Hardware Prototyper',
    'National Hackathon & AI Finalist'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 1900;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      currentSpeed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      currentSpeed = 350;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* ----------------------------------------------------
   4. Mobile Navigation Drawer
----------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      const isOpen = !mobileNav.classList.contains('hidden');
      menuBtn.innerHTML = isOpen ? '<i class="fas fa-times text-xl"></i>' : '<i class="fas fa-bars text-xl"></i>';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      });
    });
  }
}

/* ----------------------------------------------------
   5. Certificate Data & Interactive Modal
----------------------------------------------------- */
const certificateData = [
  {
    id: 'gemini-quizoff',
    title: 'Google Gemini QuizOff 2026',
    issuer: 'CampusCrew / #TeamGemini (Hosted on Unstop)',
    date: '19 July 2026',
    category: 'ai-competitions',
    tag: 'National AI Quiz',
    tagColor: 'blue',
    icon: 'fas fa-brain',
    desc: 'Recognized among select students who competed in QuizOff 2026: India’s Biggest AI Quiz, where 525,000+ students from 48,500+ institutions across the globe competed on Unstop.',
    highlights: ['525,000+ Competitors Worldwide', 'Google Gemini AI Ecosystem', '48,500+ Institutions']
  },
  {
    id: 'truefoundry-genai',
    title: 'TrueFoundry GenAI ProdEdge: Product Case Competition',
    issuer: 'Indian Institute of Technology (IIT), Kharagpur & TrueFoundry',
    date: 'Recent',
    category: 'ai-competitions',
    tag: 'IIT Kharagpur Case Comp',
    tagColor: 'purple',
    icon: 'fas fa-rocket',
    desc: 'Participated in the competitive Generative AI product case challenge organized by IIT Kharagpur and TrueFoundry, solving real-world enterprise AI adoption problems.',
    highlights: ['Generative AI Solution Architecture', 'Product Strategy & Innovation', 'IIT Kharagpur Event']
  },
  {
    id: 'arcadia-rivals',
    title: 'Arcadia Rivals Hackathon & Tech Event',
    issuer: 'National Institute of Technology (NIT), Tiruchirappalli',
    date: 'Recent',
    category: 'ai-competitions',
    tag: 'NIT Trichy Tech Event',
    tagColor: 'amber',
    icon: 'fas fa-trophy',
    desc: 'Participated in the competitive flagship technology & gaming problem-solving event Arcadia Rivals hosted by NIT Tiruchirappalli on Unstop.',
    highlights: ['National Level Participation', 'Algorithmic Problem Solving', 'NIT Tiruchirappalli']
  },
  {
    id: 'iit-kanpur-yuva',
    title: 'CM YUVA Innovation Challenge',
    issuer: 'Indian Institute of Technology (IIT), Kanpur',
    date: 'Jun 2023 – Jul 2023',
    category: 'training',
    tag: 'Innovation & Strategy',
    tagColor: 'emerald',
    icon: 'fas fa-lightbulb',
    desc: 'Intensive innovation and entrepreneurship training program focused on problem identification, business strategy, startup-oriented engineering, and presentation before industry mentors.',
    highlights: ['Startup Ideation', 'Strategy & Feasibility Analysis', 'IIT Kanpur Mentorship']
  },
  {
    id: 'tableau-viz',
    title: 'Data Visualization with Tableau',
    issuer: 'Coursera',
    date: 'May 2024',
    category: 'data-tech',
    tag: 'Data Analytics',
    tagColor: 'cyan',
    icon: 'fas fa-chart-pie',
    desc: 'Professional course covering advanced visual analytics, interactive dashboards, calculated fields, and storytelling with complex datasets using Tableau.',
    highlights: ['Interactive Dashboards', 'Data Storytelling', 'Visual Analytics']
  },
  {
    id: 'altair-rapidminer',
    title: 'Data Engineering Professional Certification',
    issuer: 'Altair Inc. RapidMiner',
    date: 'Apr 2024',
    category: 'data-tech',
    tag: 'Data Engineering',
    tagColor: 'purple',
    icon: 'fas fa-database',
    desc: 'Certified in professional data pipeline engineering, data workflows, ETL automation, and machine learning pipeline integration with Altair RapidMiner.',
    highlights: ['ETL & Data Pipelines', 'Data Preprocessing', 'Altair Platform Expertise']
  },
  {
    id: 'hackerrank-python',
    title: 'Python (Basic / Problem Solving)',
    issuer: 'HackerRank',
    date: 'Mar 2023',
    category: 'programming',
    tag: 'Programming & Logic',
    tagColor: 'emerald',
    icon: 'fab fa-python',
    desc: 'Validated core proficiency in Python syntax, object-oriented concepts, algorithms, list comprehensions, and data structure manipulation.',
    highlights: ['Algorithm Implementation', 'Data Structures in Python', 'Problem Solving']
  },
  {
    id: 'hackerrank-sql',
    title: 'SQL (Querying & Relational Databases)',
    issuer: 'HackerRank',
    date: 'Mar 2023',
    category: 'programming',
    tag: 'Database Queries',
    tagColor: 'blue',
    icon: 'fas fa-table',
    desc: 'Demonstrated proficiency in writing complex relational SQL queries, joins, aggregations, subqueries, and DBMS schema operations.',
    highlights: ['Complex Joins & Aggregations', 'Subqueries & Grouping', 'Relational Database Fundamentals']
  }
];

function initCertificates() {
  const container = document.getElementById('certificates-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('cert-modal-overlay');
  const modalCloseBtn = document.getElementById('cert-modal-close');

  if (!container) return;

  function renderCertificates(category = 'all') {
    container.innerHTML = '';
    const filtered = category === 'all' ? certificateData : certificateData.filter(c => c.category === category);

    filtered.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-card glass-panel rounded-2xl p-6 flex flex-col justify-between border border-slate-700/40 hover:border-blue-500/50 cursor-pointer group';
      card.onclick = () => openCertModal(cert);

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <i class="${cert.icon} text-xl"></i>
            </div>
            <span class="code-tag ${cert.tagColor}">${cert.tag}</span>
          </div>
          <h3 class="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors mb-2 leading-snug">
            ${cert.title}
          </h3>
          <p class="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1.5">
            <i class="fas fa-building text-slate-500"></i> ${cert.issuer}
          </p>
          <p class="text-sm text-slate-300/80 line-clamp-2 mb-4">
            ${cert.desc}
          </p>
        </div>
        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span class="flex items-center gap-1.5"><i class="far fa-calendar-alt text-blue-400"></i> ${cert.date}</span>
          <span class="text-blue-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Details <i class="fas fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      `;
      container.appendChild(card);
    });

    if (window.refreshCursorHoverTargets) {
      window.refreshCursorHoverTargets();
    }
  }

  // Filter click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderCertificates(cat);
    });
  });

  // Initial render
  renderCertificates('all');

  // Modal logic
  window.openCertModal = function(cert) {
    const modalContent = document.getElementById('cert-modal-body');
    if (!modalContent || !modalOverlay) return;

    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl shrink-0">
              <i class="${cert.icon}"></i>
            </div>
            <div>
              <span class="code-tag ${cert.tagColor} mb-1 inline-block">${cert.tag}</span>
              <h2 class="text-xl md:text-2xl font-extrabold text-white leading-tight">${cert.title}</h2>
              <p class="text-sm text-blue-400 font-medium">${cert.issuer}</p>
            </div>
          </div>
        </div>

        <div class="bg-slate-900/60 rounded-xl p-5 border border-slate-800 mb-6">
          <h4 class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Description & Scope</h4>
          <p class="text-slate-300 text-sm leading-relaxed">${cert.desc}</p>
        </div>

        <div class="mb-6">
          <h4 class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">Key Highlights & Competencies</h4>
          <div class="flex flex-wrap gap-2">
            ${cert.highlights.map(h => `<span class="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 font-medium flex items-center gap-1.5"><i class="fas fa-check text-blue-400"></i> ${h}</span>`).join('')}
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span class="flex items-center gap-1.5"><i class="far fa-calendar-check text-emerald-400"></i> Date: <strong class="text-slate-200">${cert.date}</strong></span>
          <span class="flex items-center gap-1 text-emerald-400 font-semibold"><i class="fas fa-shield-alt"></i> Verified Credential</span>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.refreshCursorHoverTargets) window.refreshCursorHoverTargets();
  };

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ----------------------------------------------------
   6. Smooth Scroll & Active Nav Highlights
----------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-blue-400', 'font-semibold');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('text-blue-400', 'font-semibold');
          }
        });
      }
    });
  });
}

/* ----------------------------------------------------
   7. Contact Form Submission
----------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'Friend';
    const email = document.getElementById('contact-email')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';

    // Direct mailto fallback link creation
    const mailtoUrl = `mailto:ravitakulriya@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    showToast(`Thank you, ${name}! Opening mail client...`);
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);
    form.reset();
  });
}

/* ----------------------------------------------------
   8. Toast Notification Utility
----------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-info-circle mr-2"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
window.showToast = showToast;

/* ----------------------------------------------------
   9. Scroll Animation Observer
----------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));
}
