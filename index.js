const scrollToElementUnderline = function (elementId, duration = 375) {
  if (typeof elementId !== 'string' || elementId.trim() === '') {
    console.error('Invalid elementId provided.');
    return;
  }

  if (typeof duration !== 'number' || duration <= 0) {
    console.error('Invalid duration provided. Duration must be a positive number.');
    return;
  }

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  const rect = element.getBoundingClientRect();
  const startPosition = window.scrollY;
  const endPosition = startPosition + rect.bottom - window.innerHeight;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const scrollPosition = startPosition + (endPosition - startPosition) * progress;
    window.scrollTo(0, scrollPosition);
    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

module.exports = scrollToElementUnderline;
