/* ===== NAV ===== */

const nav = document.querySelector('.nav');
const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');

function moveIndicator(element) {
  indicator.style.width = element.offsetWidth + 'px';
  indicator.style.transform =
    `translateX(${element.offsetLeft}px)`;
}

// Поставить индикатор на активную вкладку при загрузке
window.addEventListener('load', () => {
  const active = document.querySelector('.nav-item.active');
  if (active) 
    {
    indicator.classList.add('no-transition');
    moveIndicator(active);
    requestAnimationFrame(() => {
      indicator.classList.remove('no-transition');
    });
  }
});

// Hover — только двигаем индикатор
items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    moveIndicator(item);
  });
});

// Возврат к активной вкладке
nav.addEventListener('mouseleave', () => {
  const active = document.querySelector('.nav-item.active');
  if (active) moveIndicator(active);
});


/* ===== ICONS ===== */

const icons = document.querySelector('.icons');
const iconsIndicator = document.querySelector('.icons-indicator');
const iconItems = document.querySelectorAll('.icon-btn');

function moveIconIndicator(element) {
  const paddingLeft = parseFloat(getComputedStyle(icons).paddingLeft);

  iconsIndicator.style.opacity = '1';
  iconsIndicator.style.width = element.offsetWidth + 'px';
  iconsIndicator.style.transform =
    `translateX(${element.offsetLeft - paddingLeft}px)`;
}

iconItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    moveIconIndicator(item);
  });
});

icons.addEventListener('mouseleave', () => {
  iconsIndicator.style.opacity = '0';
  iconsIndicator.style.width = '0px';
});



/* ============== Анімація слайдера у плашці з ціною на сторінці каталогу ================ */

const minRange = document.getElementById("rangeMin");
const maxRange = document.getElementById("rangeMax");
const progress = document.getElementById("rangeProgress");

if (minRange && maxRange && progress) {

  const minLabel = document.getElementById("minPrice");
  const maxLabel = document.getElementById("maxPrice");

  const MIN = 0;
  const MAX = 4000;

  minRange.min = MIN;
  minRange.max = MAX;
  maxRange.min = MIN;
  maxRange.max = MAX;

  minRange.value = 0;
  maxRange.value = 4000;

  function updateSlider(e) {

    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    const thumbWidth = 38.8;
    const trackWidth = 193.5;
    const thumbPercent = (thumbWidth / trackWidth) * 100;

    if ((maxVal - minVal) / (MAX - MIN) * 100 <= thumbPercent) {
      if (e.target === minRange) {
        minVal = maxVal - ((thumbPercent / 100) * (MAX - MIN));
        minRange.value = Math.floor(minVal);
      } else {
        maxVal = minVal + ((thumbPercent / 100) * (MAX - MIN));
        maxRange.value = Math.ceil(maxVal);
      }
    }

    const percentMin = (minVal - MIN) / (MAX - MIN) * 100;
    const percentMax = (maxVal - MIN) / (MAX - MIN) * 100;

    progress.style.left = percentMin + "%";
    progress.style.width = (percentMax - percentMin) + "%";

    minLabel.textContent = Math.floor(minVal);
    maxLabel.textContent = Math.floor(maxVal);
  }

  minRange.addEventListener("input", updateSlider);
  maxRange.addEventListener("input", updateSlider);

  updateSlider();
}




document.addEventListener('DOMContentLoaded', function() {

  const genderToggle = document.querySelector('.gender-toggle');
  const genderButtons = document.querySelectorAll('.gender-option');

  if (!genderToggle || genderButtons.length === 0) return;

  genderButtons.forEach(button => {
    button.addEventListener('click', () => {

      genderButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (button.dataset.gender === 'female') {
        genderToggle.classList.add('female');
      } else {
        genderToggle.classList.remove('female');
      }

    });
  });

});



const ageRange = document.getElementById("ageRange");
const weightRange = document.getElementById("weightRange");
const heightRange = document.getElementById("heightRange");

const ageValue = document.getElementById("ageValue");
const weightValue = document.getElementById("weightValue");
const heightValue = document.getElementById("heightValue");

function updateSliderBackground(slider) {
  const min = slider.min;
  const max = slider.max;
  const val = slider.value;

  const percent = ((val - min) / (max - min)) * 100;

  slider.style.background = `
    linear-gradient(
      to right,
      rgb(0,117,255) ${percent}%,
      rgb(233,230,228) ${percent}%
    )
  `;
}

function initSlider(slider, output) {
  if (!slider) return;

  output.textContent = slider.value;
  updateSliderBackground(slider);

  slider.addEventListener("input", () => {
    output.textContent = slider.value;
    updateSliderBackground(slider);
  });
}

initSlider(ageRange, ageValue);
initSlider(weightRange, weightValue);
initSlider(heightRange, heightValue);


