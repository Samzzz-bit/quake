const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const scrollbar = document.querySelector('.custom-scrollbar');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.content').classList.add('visible');

      if (entry.target.id === "home") {
        scrollbar.classList.remove("active");
      } else {
        scrollbar.classList.add("active");
      }
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

container.addEventListener('scroll', () => {
  const scrollHeight = container.scrollHeight - container.clientHeight;
  const scrollTop = container.scrollTop;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollbar.style.height = `${progress}%`;
});
