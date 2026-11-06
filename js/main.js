/**
 * Dr. Salma Mahmoud Soliman, Pharm.D. Portfolio
 * Production-ready Vanilla JavaScript with Dark Mode & Bilingual (AR / EN) Support
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Toast Notification Utility
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  const showToast = (title, message) => {
    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  // --------------------------------------------------------------------------
  // 2. Dark Mode Management
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const getSavedTheme = () => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved;
    return prefersDark.matches ? 'dark' : 'light';
  };

  const applyTheme = (theme, notify = false) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);

    const isDark = theme === 'dark';
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    if (notify && typeof translations !== 'undefined') {
      const currentLang = document.documentElement.lang || 'en';
      const t = translations[currentLang] || translations.en;
      showToast(isDark ? t.toast_theme_dark : t.toast_theme_light, '');
    }
  };

  // Initialize theme
  applyTheme(getSavedTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  // Listen for system theme changes if user has no explicit preference
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio_theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // --------------------------------------------------------------------------
  // 3. Bilingual (English / Arabic) Language Management
  // --------------------------------------------------------------------------
  const langToggle = document.getElementById('langToggle');
  const langBtnText = document.getElementById('langBtnText');

  const getSavedLang = () => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'ar' || saved === 'en') return saved;
    // Default to English
    return 'en';
  };

  const setLanguage = (lang, notify = false) => {
    if (typeof translations === 'undefined' || !translations[lang]) return;

    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('portfolio_lang', lang);

    // Update all elements with data-i18n
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update Language Toggle Button text & label
    if (langBtnText) {
      langBtnText.textContent = t.lang_btn_text;
    }
    if (langToggle) {
      langToggle.setAttribute('aria-label', t.lang_toggle_label);
      langToggle.setAttribute('title', t.lang_toggle_label);
    }

    if (notify) {
      showToast(lang === 'ar' ? 'تم تحويل لغة الموقع إلى العربية' : 'Language switched to English', '');
    }
  };

  // Initialize Language
  const initialLang = getSavedLang();
  setLanguage(initialLang, false);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.lang || 'en';
      const nextLang = current === 'en' ? 'ar' : 'en';
      setLanguage(nextLang, true);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Navigation & Header Blur on Scroll
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleHeaderScroll = () => {
    if (window.scrollY > 24) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Mobile navigation drawer toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu?.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Active Section Spy (ScrollSpy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => scrollSpyObserver.observe(section));

  // --------------------------------------------------------------------------
  // 6. Scroll Reveal Animation (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 7. Experience Filter Tabs
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (filterButtons.length > 0 && timelineItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        timelineItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.classList.add('hidden');
            }, 250);
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. CV Modal & Direct Download Actions
  // --------------------------------------------------------------------------
  const cvModal = document.getElementById('cvModal');
  const cvOpenBtns = document.querySelectorAll('.js-open-cv-modal');
  const cvCloseBtns = document.querySelectorAll('.js-close-cv-modal');
  const cvDownloadLinks = document.querySelectorAll('.js-download-cv');

  const openCvModal = () => {
    if (!cvModal) return;
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCvModal = () => {
    if (!cvModal) return;
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  cvOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  cvCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeCvModal);
  });

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCvModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        closeCvModal();
      }
    });
  }

  // Show toast when clicking any download link
  cvDownloadLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeCvModal();
      const currentLang = document.documentElement.lang || 'en';
      const t = translations[currentLang] || translations.en;
      showToast(t.toast_cv_title, t.toast_cv_msg);
    });
  });

  // --------------------------------------------------------------------------
  // 9. Interactive Contact Form with Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const currentLang = document.documentElement.lang || 'en';
      const t = translations[currentLang] || translations.en;

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || 'Inquiry regarding Clinical Pharmacy';
      const message = messageInput?.value.trim() || '';

      if (!name || !email || !message) {
        showToast(t.toast_form_err_title, t.toast_form_err_msg);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast(
          currentLang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid Email',
          currentLang === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please provide a valid email address.'
        );
        emailInput?.focus();
        return;
      }

      const mailtoLink = `mailto:Salma653109@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${subject}`
      )}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\nMessage:\n${message}`
      )}`;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>${currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}</span>
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        contactForm.reset();
        showToast(t.toast_form_success_title, t.toast_form_success_msg);

        // Open user's email client
        window.location.href = mailtoLink;
      }, 700);
    });
  }

  // --------------------------------------------------------------------------
  // 10. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Current Year Dynamic Placement
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }
});
