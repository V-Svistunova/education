class CustomSlider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.slidesContainer = this.container.querySelector('.slides');
    this.slides = [];
    this.currentIndex = 0;
    this.options = {
      delay: options.delay || 4000,
      transitionDuration: options.transitionDuration || 500,
      autoPlay: options.autoPlay !== undefined ? options.autoPlay : true,
      visibleSlides: options.visibleSlides || 1,
    };

    this.init(options.slides);
    this.setupEventListeners();
    this.updateSlidesWidth();
  }

  init(slides) {
    slides.forEach(slide => {
      this.addSlide(slide);
    });

    if (this.options.autoPlay) {
      this.startSlider();
    }
  }

  addSlide(content) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = content;
    this.slidesContainer.appendChild(slide);
    this.slides.push(slide);
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.showSlide(this.currentIndex + 1);
    }, this.options.delay);
  }

  stopSlider() {
    clearInterval(this.intervalId);
  }

  showSlide(index) {
    if (index >= this.slides.length) {
      index = 0;
    } else if (index < 0) {
      index = this.slides.length - 1;
    }

    this.currentIndex = index;

    const transformValue = -index * (100 / this.options.visibleSlides) + '%';
    this.slidesContainer.style.transition = `transform ${this.options.transitionDuration / 1000}s ease-in-out`;
    this.slidesContainer.style.transform = `translateX(${transformValue})`;
  }

  setupEventListeners() {
    this.container.addEventListener('mouseenter', () => {
      this.stopSlider();
    });

    this.container.addEventListener('mouseleave', () => {
      if (this.options.autoPlay) {
        this.startSlider();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.showSlide(this.currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        this.showSlide(this.currentIndex + 1);
      }
    });
  }

  updateSlidesWidth() {
    const slideWidthPercentage = 100 / this.options.visibleSlides;
    this.slides.forEach(slide => {
      slide.style.flex = `0 0 ${slideWidthPercentage}%`;
    });
  }
}