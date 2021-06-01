'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const sec1 = document.querySelector('#section--1');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollBtn = document.querySelector('.btn--scroll-to');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const images = document.querySelectorAll('img[data-src]');

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

const sliderR = document.querySelector('.slider__btn--right');
const sliderL = document.querySelector('.slider__btn--left');
const opTab = document.querySelector('.operations__tab-container');
const tabBtns = document.querySelectorAll('.operations__tab');
const opSections = document.querySelectorAll('.operations__content');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

scrollBtn.addEventListener('click', function () {
  let y1 = sec1.getBoundingClientRect().top;
  let y2 = window.pageYOffset;
  let x1 = sec1.getBoundingClientRect().left;
  let x2 = window.pageXOffset;

  scrollTo({
    left: x1 + x2,
    top: y1 + y2,
    behavior: 'smooth',
  });
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    // console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

const dispTabs = function (e) {
  if (e.target == opTab) {
    return;
  }

  const goal = e.target.closest('.operations__tab');
  const data = goal.dataset.tab;
  // console.log(data);
  tabBtns.forEach(tab => tab.classList.remove('operations__tab--active'));

  goal.classList.add('operations__tab--active');

  // changing text section on click
  const divClass = `operations__content--${data}`;
  // console.log(divClass);

  opSections.forEach(function (sec) {
    sec.classList.remove('operations__content--active');
    if (sec.classList.contains(divClass)) {
      sec.classList.add('operations__content--active');
    }
  });
};

opTab.addEventListener('click', dispTabs);

const handleHover = function (e, opacity) {
  // const opacity = this;
  if (!e.target.classList.contains('nav__link')) {
    return;
  }
  const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
  siblings.forEach(function (link) {
    if (link != e.target) {
      // console.log(opacity);
      link.style.opacity = opacity;
    }
  });
};

const handleHoverIn = function (e) {
  const opacity = this;
  handleHover(e, opacity);
};

const handleHoverOut = function (e) {
  const opacity = this;
  handleHover(e, opacity);
};

nav.addEventListener('mouseover', handleHoverIn.bind(0.5));
nav.addEventListener('mouseout', handleHoverOut.bind(1));

// adding scroll controlled sticky navbar

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const headerObj = {
  root: null,
  threshold: 0,
  rootMargin: `-90px`,
};

const handleScroll = function (entries) {
  // console.log(nav.getBoundingClientRect());
  entries.forEach(function (entry) {
    // console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

const handleLazy = function (entries, observor) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // console.log(entry.target);
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observor.unobserve(entry.target);
  // if(entry.target)
};

const headerObservor = new IntersectionObserver(handleScroll, headerObj);
headerObservor.observe(header);

// implement lazy loading
const imgObservor = new IntersectionObserver(handleLazy, {
  root: null,
  threshold: 0.5,
});

images.forEach(image => imgObservor.observe(image));

// implementing slider

let curSlide = 0;
slides.forEach(function (slide, i) {
  console.log(slide);
  console.log(`${i * 100}%`);
  slide.style.transform = `translateX(${i * 100}%)`;
});
// i=0->-100 , i=1->0 ,  i=2->100
const slideRight = function () {
  if (curSlide == slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
};

const slideLeft = function () {
  if (curSlide == 0) {
    // console.log(curSlide.length - 1);
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
};

sliderR.addEventListener('click', slideRight);
sliderL.addEventListener('click', slideLeft);
