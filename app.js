document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-bar ul li');
  const sectionMap = {
    'Canvas': '.hero-content',
    'Skills': '.skills-section',
    'Artist': '.artist-section',
    'Commission': '.create-section'
  };

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sectionSelector = sectionMap[link.textContent.trim()];
      if (sectionSelector) {
        const section = document.querySelector(sectionSelector);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // Highlight nav link on scroll
  const sections = Object.entries(sectionMap).map(([key, selector]) => ({
    key,
    selector,
    el: document.querySelector(selector)
  }));


  function highlightNav() {
    let current = null;
    const scrollY = window.scrollY + window.innerHeight / 3;
    sections.forEach(({ key, el }) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          current = key;
        }
      }
    });
    navLinks.forEach(link => {
      if (link.textContent.trim() === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Scroll to Commission section when Get In Touch is clicked
    const getInTouchBtn = document.querySelector('.header-buttons .secondary');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const commissionSection = document.querySelector('.create-section');
        if (commissionSection) {
            commissionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        });
    }

    const viewWorkBtn = document.querySelector('.header-buttons .primary');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(f) {
        f.preventDefault();
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        });
    }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
});