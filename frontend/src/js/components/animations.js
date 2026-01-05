/* ===== ANIMATIONS ===== */

/**
 * Initializes AOS (Animate On Scroll) library if available.
 * Sets up animation parameters for smooth scroll-triggered animations.
 */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,      // Animation duration in ms
      easing: "ease-out-cubic",  // Easing function
      once: true,         // Animation occurs only once
      offset: 50,         // Offset from element to trigger animation
      delay: 100,         // Delay before animation starts
    });
  }
}

/**
 * Initializes counter animations for stat numbers.
 * Animates numbers from 0 to target value with Intersection Observer.
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  if (counters.length === 0) return;

  /**
   * Animates a single counter element.
   * @param {Element} counter - The counter element to animate.
   */
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // Animation duration in ms
    const step = target / (duration / 16); // 60fps approximation
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = formatNumber(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = formatNumber(target);
      }
    };

    updateCounter();
  };

  /**
   * Formats numbers with K+ suffix for large values.
   * @param {number} num - The number to format.
   * @returns {string} Formatted number string.
   */
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K+";
    }
    return num.toLocaleString() + "+";
  };

  // Intersection Observer to trigger animation when counter comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of element is visible
  );

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * Initializes particle effect background animation.
 * Creates floating particles for visual effect.
 */
function initParticles() {
  const particlesContainer = document.getElementById("particles");

  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

/**
 * Creates a single floating particle element.
 * @param {Element} container - The container to append the particle to.
 */
function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random properties for natural variation
  const size = Math.random() * 5 + 2; // Size between 2-7px
  const left = Math.random() * 100;   // Random horizontal position
  const delay = Math.random() * 20;   // Random start delay
  const duration = Math.random() * 20 + 10; // Duration 10-30s
  const opacity = Math.random() * 0.5 + 0.1; // Opacity 0.1-0.6

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${left}%;
        bottom: -10px;
        animation: particleFloat ${duration}s linear ${delay}s infinite;
    `;

  container.appendChild(particle);
}

// Add particle animation keyframes to document
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

/**
 * Initializes testimonial slider with touch support.
 * Adds drag functionality for desktop and touch events.
 */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  // Variables for drag functionality
  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse events for desktop
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    slider.scrollLeft = scrollLeft - walk;
  });
}

/**
 * Initializes lazy loading for images with data-src attribute.
 * Uses Intersection Observer for performance, falls back to immediate load.
 */
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src; // Load the actual image
          img.removeAttribute("data-src"); // Remove data attribute
          observer.unobserve(img); // Stop observing once loaded
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers without Intersection Observer
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Initializes preloader functionality.
 * Hides preloader after page load with fade effect.
 */
function initPreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      document.body.classList.remove("loading");
    }, 500); // Small delay for smooth transition
  });
}