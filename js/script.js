const slider = document.getElementById("servicesSlider");

document.querySelector(".next-btn").addEventListener("click", () => {
  slider.scrollBy({
    left: slider.clientWidth,
    behavior: "smooth",
  });
});

document.querySelector(".prev-btn").addEventListener("click", () => {
  slider.scrollBy({
    left: -slider.clientWidth,
    behavior: "smooth",
  });
});

// ============================================================================

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));

    contents.forEach((content) => content.classList.remove("active"));

    tab.classList.add("active");

    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

//==================Hero Slider ==============================================================

const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));

  indicators.forEach((indicator) => indicator.classList.remove("active"));

  slides[index].classList.add("active");
  indicators[index].classList.add("active");

  currentSlide = index;
}

/* Indicator Click */

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
  });
});

/* Auto Slide */

setInterval(() => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}, 5000);

// =============================================================

const statsSection = document.querySelector(".stats-modern");
const counters = document.querySelectorAll(".stat-value[data-target]");

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);

    let current = 0;
    const increment = target / 80;

    function updateCounter() {
      current += increment;

      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();

        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + "+";
      }
    }

    updateCounter();
  });
}

function resetCounters() {
  counters.forEach((counter) => {
    counter.textContent = "0";
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
      } else {
        resetCounters();
      }
    });
  },
  {
    threshold: 0.4,
  },
);

observer.observe(statsSection);
