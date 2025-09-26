// Main JavaScript for Kwanza Images Studio

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Initialize Particles.js
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
        },
      },
    });
  }

  // Preloader
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.querySelector(".preloader").style.opacity = "0";
      setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";
      }, 500);
    }, 2000);
  });

  // Navbar Scroll Effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Counter Animation for Stats
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + "+";
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + "+";
        }
      }, 16);
    });
  }

  // Intersection Observer for Counter Animation
  const statsSection = document.querySelector(".about-section");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
  }

  // Gallery Images
  const galleryImages = [
    "images/p17.jpg",
    "images/s1-min.jpg",
    "images/p5.jpg",
    "images/new2.jpg",
    "images/p50.jpg",
    "images/p4.jpg",
  ];

  // Populate Gallery
  const galleryGrid = document.querySelector(".gallery-grid");
  if (galleryGrid) {
    galleryImages.forEach((image, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.setAttribute("data-aos", "zoom-in");
      galleryItem.setAttribute("data-aos-delay", index * 100 + 100);

      galleryItem.innerHTML = `
                <img src="${image}" alt="Gallery Image ${
        index + 1
      }" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;

      galleryGrid.appendChild(galleryItem);
    });
  }

  // Image Modal for Gallery
  document.addEventListener("click", function (e) {
    if (e.target.closest(".gallery-item")) {
      const imgSrc = e.target.closest(".gallery-item").querySelector("img").src;
      openModal(imgSrc);
    }
  });

  function openModal(imgSrc) {
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    modal.innerHTML = `
            <img src="${imgSrc}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">
            <button class="modal-close" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
        `;

    document.body.appendChild(modal);

    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    const modal = document.querySelector(".image-modal");
    if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  }

  // Form Submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = "Message Sent!";
        submitBtn.style.background = "#28a745";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Parallax Effect
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector(".parallax-bg");

    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
  });

  // Typing Effect for Hero Title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }
    typing();
  }

  // Initialize typing effect after preloader
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const text = heroTitle.textContent;
      typeWriter(heroTitle, text, 80);
    }
  }, 2500);

  // Service Card Hover Effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Mobile Menu Smooth Close
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });

  // Lazy Loading for Images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Carousel Animation Handler
  const carousel = document.querySelector("#heroCarousel");
  if (carousel) {
    carousel.addEventListener("slide.bs.carousel", function (e) {
      const nextItem = e.relatedTarget;
      const animation = nextItem.getAttribute("data-animation");
      nextItem.setAttribute("data-aos", animation);
      AOS.refresh();
    });
  }

  console.log("Kwanza Images Studio - Premium Photography Website Loaded");
});
