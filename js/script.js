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

  // --- Sticky Header Shadow ---
  const header = document.getElementById('header');
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

  if (foundingForm) {
    foundingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var parentName = document.getElementById('parentName');
      var childGrade = document.getElementById('childGrade');
      var parentPhone = document.getElementById('parentPhone');
      var parentEmail = document.getElementById('parentEmail');
      var parentArea = document.getElementById('parentArea');

      if (!parentName.value.trim() || !childGrade.value || !parentPhone.value.trim() || !parentEmail.value.trim() || !parentArea.value.trim()) {
        return;
      }

      // Check at least one interest is selected
      var interests = foundingForm.querySelectorAll('input[name="interests"]:checked');
      if (interests.length === 0) {
        return;
      }

      // Check radio selection
      var attendSession = foundingForm.querySelector('input[name="attendSession"]:checked');
      if (!attendSession) {
        return;
      }

      // Show success message
      if (foundingSuccess) {
        foundingSuccess.classList.add('show');
      }

      // Hide the form
      foundingForm.style.display = 'none';

      // Scroll to success message
      if (foundingSuccess) {
        foundingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
