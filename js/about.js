document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.about-container.container');
  const contents = document.querySelectorAll('.content');
  const cards = document.querySelectorAll('.card');
  const scrollbar = document.querySelector('.custom-scrollbar');
  const section1 = document.querySelector('.about-hero');
  const section2 = document.querySelector('.about-content');
  const section3 = document.querySelector('.about-gallery');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryOverlay = document.querySelector('.gallery-overlay');

  const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.25 });

  contents.forEach(c => contentObserver.observe(c));

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 120);
        });
        cardObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });
  if (section2) cardObserver.observe(section2);

  const sbObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (e.target === section1 || e.target === section2) {
          scrollbar.classList.add('active'); 
        }
        if (e.target === section3) {
          scrollbar.classList.remove('active'); 
        }
      }
    });
  }, { threshold: 0.55 });

  if (section1) sbObserver.observe(section1);
  if (section2) sbObserver.observe(section2);
  if (section3) sbObserver.observe(section3);

  function updateScrollbar() {
    const scrollTop = container.scrollTop;
    const total = container.scrollHeight - container.clientHeight;
    const pct = total > 0 ? (scrollTop / total) : 0;
    const min = 40;
    const max = Math.max(window.innerHeight - 200, 120);
    const height = Math.round(min + pct * (max - min));
    scrollbar.style.height = `${height}px`;
    const topOffset = 80 + pct * (window.innerHeight - 160 - height);
    scrollbar.style.top = `${Math.max(60, topOffset)}px`;
  }

  container.addEventListener('scroll', updateScrollbar, { passive: true });
  window.addEventListener('resize', updateScrollbar);
  updateScrollbar();

  const TOTAL = 20;
  for (let i = 1; i <= TOTAL; i++) {
    const d = document.createElement('div');
    d.className = 'grid-item';
    d.style.backgroundImage = `url('images/rp/rp${i}.png')`;
    d.style.backgroundColor = '#111';
    galleryGrid.appendChild(d);
  }

  const gridItems = Array.from(galleryGrid.children);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function animateGridOnce() {
    const indices = gridItems.map((_, i) => i);
    shuffle(indices);

    indices.forEach((idx, order) => {
      const delay = 80 * order + Math.floor(Math.random() * 160);
      setTimeout(() => {
        gridItems[idx].classList.add('visible');
      }, delay);
    });

    setTimeout(() => galleryOverlay.classList.add('visible'), 280);
  }

  let animated = false;
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !animated) {
        animated = true;
        animateGridOnce();
        galleryObserver.disconnect();
      }
    });
  }, { threshold: 0.25 });
  if (section3) galleryObserver.observe(section3);

  setTimeout(() => {
    contents.forEach(c => {
      const rect = c.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) c.classList.add('visible');
    });
    const rect2 = section2.getBoundingClientRect();
    if (rect2.top < window.innerHeight && rect2.bottom > 0) {
      cards.forEach((card, i) => setTimeout(() => card.classList.add('visible'), i * 120));
      scrollbar.classList.add('active');
    }
    updateScrollbar();
  }, 80);
});

gridItems.forEach((item, i) => {
  item.style.animationDelay = `${i * 0.3}s`;
});
