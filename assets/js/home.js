// Highlight the section currently being read without changing browser history.
const sectionLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updateNavigation() {
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 140) active = section;
  }
  for (const link of sectionLinks) {
    if (active && link.getAttribute('href') === '#' + active.id) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

let scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    updateNavigation();
    scheduled = false;
  });
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
