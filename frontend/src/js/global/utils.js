/* ===== UTILITY FUNCTIONS ===== */

/**
 * Debounces a function to limit how often it can be called.
 * Useful for scroll or resize events to improve performance.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before allowing the function to be called again.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function to ensure it is called at most once every specified limit.
 * Useful for events that fire frequently like scroll or mouse move.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The minimum time in milliseconds between function calls.
 * @returns {Function} The throttled function.
 */
function throttle(func, limit = 100) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

/**
 * Checks if an element is currently visible in the viewport.
 * @param {Element} element - The DOM element to check.
 * @returns {boolean} True if the element is in the viewport, false otherwise.
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
