function initSliders() {
  initMainSlider();
  initLoveSlider();
}

function initMainSlider() {
  const images = document.querySelectorAll(".slider-img");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!images.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function updateSlider(index) {
    images.forEach((img, i) => img.classList.toggle("active", i === index));
  }

  function nextSlide() {
    current = (current + 1) % images.length;
    updateSlider(current);
  }

  function prevSlide() {
    current = (current - 1 + images.length) % images.length;
    updateSlider(current);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, 10000);
}

function initLoveSlider() {
  const loveSlides = document.querySelectorAll(".love-slide");
  const loveNext = document.querySelector(".love-next");
  const lovePrev = document.querySelector(".love-prev");

  if (!loveSlides.length || !loveNext || !lovePrev) return;

  let loveIndex = 0;

  function updateLoveSlider(index) {
    loveSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  }

  loveNext.addEventListener("click", () => {
    loveIndex = (loveIndex + 1) % loveSlides.length;
    updateLoveSlider(loveIndex);
  });

  lovePrev.addEventListener("click", () => {
    loveIndex = (loveIndex - 1 + loveSlides.length) % loveSlides.length;
    updateLoveSlider(loveIndex);
  });

  setInterval(() => {
    loveIndex = (loveIndex + 1) % loveSlides.length;
    updateLoveSlider(loveIndex);
  }, 12000);
}