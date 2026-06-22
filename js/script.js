/* ============================================
   Embrace Learning - Main JavaScript
   Lightweight, Vanilla JS — No Dependencies
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close menu on nav link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Sticky Header Shadow ---
  const header = document.getElementById('header');

  // --- Top Announcement Bar ---
  var topAnnouncement = document.getElementById('topAnnouncement');
  var announcementClose = document.getElementById('announcementClose');

  if (announcementClose && topAnnouncement && header) {
    announcementClose.addEventListener('click', function (e) {
      e.preventDefault();
      topAnnouncement.classList.add('hidden');
      header.classList.remove('has-announcement');
      header.classList.add('announcement-closed');
      document.body.classList.add('announcement-closed');
    });
  }
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.getElementById('scrollTop');
  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollTop, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
        var otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Open clicked (if was closed)
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Testimonial Slider ---
  var track = document.getElementById('testimonialTrack');
  var dotsContainer = document.getElementById('testimonialDots');

  if (track && dotsContainer) {
    var slides = track.querySelectorAll('.testimonial-card');
    var currentSlide = 0;
    var totalSlides = slides.length;
    var autoSlideInterval;

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function (d, idx) {
        d.classList.toggle('active', idx === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % totalSlides);
    }

    // Dot click
    dotsContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('testimonial-dot')) {
        clearInterval(autoSlideInterval);
        goToSlide(parseInt(e.target.dataset.index));
        startAutoSlide();
      }
    });

    // Auto-slide
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
    startAutoSlide();

    // Pause on hover
    track.addEventListener('mouseenter', function () {
      clearInterval(autoSlideInterval);
    });
    track.addEventListener('mouseleave', startAutoSlide);

    // Touch support for slider
    var touchStartX = 0;
    var touchEndX = 0;

    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide((currentSlide + 1) % totalSlides);
        } else {
          goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
      }
      startAutoSlide();
    }, { passive: true });
  }

  // --- Contact Form Handler ---
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = document.getElementById('name');
      var phone = document.getElementById('phone');

      if (!name.value.trim() || !phone.value.trim()) {
        return;
      }

      // Show success message (replace with actual form submission in production)
      if (formSuccess) {
        formSuccess.classList.add('show');
      }

      // Reset form
      contactForm.reset();

      // Hide success after 5s
      setTimeout(function () {
        if (formSuccess) formSuccess.classList.remove('show');
      }, 5000);
    });
  }

  // --- Collaborations Focus Areas: click/tap description toggle ---
  var focusChipContainer = document.getElementById('focusAreasInteractive');
  if (focusChipContainer) {
    var focusChips = focusChipContainer.querySelectorAll('.focus-chip');
    var isDesktopHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function closeAllFocusChips() {
      focusChips.forEach(function (chip) {
        chip.classList.remove('is-active');
        chip.setAttribute('aria-expanded', 'false');
      });
    }

    focusChips.forEach(function (chip) {
      chip.addEventListener('mouseenter', function () {
        closeAllFocusChips();
      });

      chip.addEventListener('click', function (e) {
        // On desktop, hover handles reveal state and should not persist on click.
        if (isDesktopHover) {
          closeAllFocusChips();
          return;
        }

        var isActive = chip.classList.contains('is-active');
        closeAllFocusChips();
        if (!isActive) {
          chip.classList.add('is-active');
          chip.setAttribute('aria-expanded', 'true');
        }
        e.stopPropagation();
      });
    });

    document.addEventListener('click', function (e) {
      if (!focusChipContainer.contains(e.target)) {
        closeAllFocusChips();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllFocusChips();
      }
    });
  }

  // --- Floating Founding CTA visibility ---
  var floatingCta = document.getElementById('floatingFoundingCta');
  var foundingBanner = document.getElementById('foundingBanner');
  var foundingFormSection = document.getElementById('foundingForm');

  function toggleFloatingCta() {
    if (!floatingCta || !foundingBanner) return;
    var bannerBottom = foundingBanner.getBoundingClientRect().bottom;
    var formInView = false;
    if (foundingFormSection) {
      var formRect = foundingFormSection.getBoundingClientRect();
      formInView = formRect.top < window.innerHeight && formRect.bottom > 0;
    }
    // Show floating CTA after scrolling past the banner, but hide when form is in view
    if (bannerBottom < 0 && !formInView) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleFloatingCta, { passive: true });

  // --- Founding Parent Interest Form Handler ---
  var foundingForm = document.getElementById('foundingParentForm');
  var foundingSuccess = document.getElementById('foundingFormSuccess');

  // --- Subject Selector: show/hide based on grade + Academic Excellence ---
  var subjectSelector = document.getElementById('subjectSelector');
  var subjectHint = document.getElementById('subjectHint');
  var subjects6to10 = document.getElementById('subjects6to10');
  var subjects11to12 = document.getElementById('subjects11to12');
  var gradeSelect = document.getElementById('childGrade');

  function isAcademicExcellenceChecked() {
    var cb = foundingForm && foundingForm.querySelector('input[name="interests"][value="Academic Excellence"]');
    return cb && cb.checked;
  }

  function updateSubjectVisibility() {
    if (!subjectSelector) return;
    var acadChecked = isAcademicExcellenceChecked();
    var grade = gradeSelect ? gradeSelect.value : '';

    if (!acadChecked) {
      subjectSelector.style.display = 'none';
      clearSubjectCheckboxes();
      return;
    }

    subjectSelector.style.display = '';

    if (!grade) {
      if (subjectHint) subjectHint.style.display = '';
      if (subjects6to10) subjects6to10.style.display = 'none';
      if (subjects11to12) subjects11to12.style.display = 'none';
      return;
    }

    if (subjectHint) subjectHint.style.display = 'none';
    var gradeNum = parseInt(grade, 10);

    if (gradeNum >= 6 && gradeNum <= 10) {
      if (subjects6to10) subjects6to10.style.display = '';
      if (subjects11to12) { subjects11to12.style.display = 'none'; clearGroupCheckboxes(subjects11to12); }
    } else if (gradeNum === 11 || gradeNum === 12) {
      if (subjects11to12) subjects11to12.style.display = '';
      if (subjects6to10) { subjects6to10.style.display = 'none'; clearGroupCheckboxes(subjects6to10); }
    }
  }

  function clearSubjectCheckboxes() {
    if (subjects6to10) clearGroupCheckboxes(subjects6to10);
    if (subjects11to12) clearGroupCheckboxes(subjects11to12);
  }

  function clearGroupCheckboxes(group) {
    var cbs = group.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < cbs.length; i++) { cbs[i].checked = false; }
  }

  // Listen on the Academic Excellence checkbox and grade dropdown
  if (foundingForm) {
    var acadCb = foundingForm.querySelector('input[name="interests"][value="Academic Excellence"]');
    if (acadCb) {
      acadCb.addEventListener('change', updateSubjectVisibility);
    }
    if (gradeSelect) {
      gradeSelect.addEventListener('change', updateSubjectVisibility);
    }
  }

  if (foundingForm) {
    foundingForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Basic validation
      var parentName = document.getElementById('parentName');
      var childGrade = document.getElementById('childGrade');
      var parentPhone = document.getElementById('parentPhone');
      var parentEmail = document.getElementById('parentEmail');
      var parentArea = document.getElementById('parentArea');

      if (!parentName.value.trim() || !childGrade.value || !parentPhone.value.trim() || !parentEmail.value.trim() || !parentArea.value.trim()) {
        alert('Please fill in all required fields.');
        return;
      }

      // Check at least one interest is selected
      var interests = foundingForm.querySelectorAll('input[name="interests"]:checked');
      if (interests.length === 0) {
        alert('Please select at least one area of interest.');
        return;
      }

      // If Academic Excellence is selected, at least one subject must be chosen
      if (isAcademicExcellenceChecked()) {
        var subjects = foundingForm.querySelectorAll('input[name="subjects"]:checked');
        if (subjects.length === 0) {
          alert('Please select at least one subject under Academic Excellence.');
          var subjectEl = document.getElementById('subjectSelector');
          if (subjectEl) subjectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }

      // Check radio selection
      var attendSession = foundingForm.querySelector('input[name="attendSession"]:checked');
      if (!attendSession) {
        alert('Please select whether you would attend a free introductory session.');
        return;
      }

      // Collect form data
      var subjectCheckboxes = foundingForm.querySelectorAll('input[name="subjects"]:checked');
      var formData = {
        parentName: parentName.value.trim(),
        childGrade: childGrade.value,
        parentPhone: parentPhone.value.trim(),
        parentEmail: parentEmail.value.trim(),
        parentArea: parentArea.value.trim(),
        interests: Array.from(interests).map(function(cb) { return cb.value; }).join(', '),
        subjects: Array.from(subjectCheckboxes).map(function(cb) { return cb.value; }).join(', '),
        attendSession: attendSession.value
      };

      // Disable button & show loading
      var submitBtn = foundingForm.querySelector('.founding-submit-btn');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      try {
        // ⬇️ Google Apps Script Web App URL
        var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2E2o_TMrCjHoErkdw2DUV_sgMzbFYXdv6SAcKD_8R2kCDTifkuNegbolx5V4vRAqJ4A/exec';

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        // Hide the form
        foundingForm.style.display = 'none';

        // Show success message
        if (foundingSuccess) {
          foundingSuccess.classList.add('show');
          foundingSuccess.style.display = 'block';
          foundingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

      } catch (error) {
        console.error('Submission error:', error);
        alert('Something went wrong. Please try again or contact us directly.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    });
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

})();
