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

const minLabel = document.getElementById("minPrice");
const maxLabel = document.getElementById("maxPrice");

const MIN = 0;
const MAX = 4000;
const STEP_GAP = 0; // минимальная дистанция между бегунками

minRange.min = MIN;
minRange.max = MAX;
maxRange.min = MIN;
maxRange.max = MAX;

minRange.value = 0;
maxRange.value = 4000;

function updateSlider() {

  let minVal = parseInt(minRange.value);
  let maxVal = parseInt(maxRange.value);

  const thumbWidth = 38.8; // ширина бегунка
  const trackWidth = 193.5; // ширина полоски

  const thumbPercent = (thumbWidth / trackWidth) * 100;

  // Жёсткое ограничение без налезания
  if ((maxVal - minVal) / (MAX - MIN) * 100 <= thumbPercent) {
    if (event.target === minRange) {
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







