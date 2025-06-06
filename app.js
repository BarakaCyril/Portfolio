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

  // Scroll to Commission section when Start your Story is clicked
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


  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // Skill details data
  const skillDetails = {
    'Web Design': {
      icon: 'icons/skills-icons/paint.svg',
      colorClass: 'orange',
      description: 'Designing and building beautiful, responsive websites with a focus on user experience, accessibility, and modern aesthetics.',
      list: [
        'Responsive layouts',
        'Modern CSS & HTML',
        'UI/UX best practices',
        'Performance optimization',
        'Cross-browser compatibility'
      ]
    },
    'Illustration': {
      icon: 'icons/skills-icons/pencil.svg',
      colorClass: 'blue',
      description: 'Creating custom illustrations and digital art to bring stories, brands, and ideas to life.',
      list: [
        'Digital painting',
        'Vector & raster art',
        'Storyboarding',
        'Character design',
        'Editorial illustration'
      ]
    },
    'Graphic Design': {
      icon: 'icons/skills-icons/palette.svg',
      colorClass: 'green',
      description: 'Crafting visual identities, marketing materials, and graphics that communicate clearly and memorably.',
      list: [
        'Logo & branding',
        'Print & digital assets',
        'Infographics',
        'Layout & composition',
        'Color theory'
      ]
    },
    'UI/UX Design': {
      icon: 'icons/skills-icons/paint.svg',
      colorClass: 'purple',
      description: 'Designing intuitive interfaces and seamless user experiences for web and mobile applications.',
      list: [
        'Wireframing & prototyping',
        'User flows',
        'Interaction design',
        'Usability testing',
        'Accessibility'
      ]
    },
    'Branding': {
      icon: 'icons/skills-icons/type.svg',
      colorClass: 'yellow',
      description: 'Building cohesive brand identities that tell compelling stories and connect with audiences.',
      list: [
        'Logo design',
        'Brand guidelines',
        'Visual storytelling',
        'Typography',
        'Brand strategy'
      ]
    },
    'Creative Direction': {
      icon: 'icons/skills-icons/star.svg',
      colorClass: 'pink',
      description: 'Leading creative projects from concept to execution, ensuring a unified vision and impactful results.',
      list: [
        'Art direction',
        'Project leadership',
        'Concept development',
        'Team collaboration',
        'Client communication'
      ]
    }
  };

  // Modal logic
  const modal = document.getElementById('skill-modal');
  const modalClose = document.querySelector('.skill-modal-close');
  const modalTitle = document.getElementById('modal-skill-title');
  const modalIcon = document.getElementById('modal-skill-icon');
  const modalDesc = document.getElementById('modal-skill-description');
  const modalList = document.getElementById('modal-skill-list');

  document.querySelectorAll('.explore-skill').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = btn.closest('.skills-card');
      const title = card.querySelector('.skills-title').textContent.trim();
      const details = skillDetails[title];
      if (details) {
        modalTitle.textContent = title;
        modalIcon.innerHTML = `<div class="skills-icon ${details.colorClass}"><img src="${details.icon}" alt="${title}"></div>`;
        modalDesc.textContent = details.description;
        modalList.innerHTML = details.list.map(item => `<li>${item}</li>`).join('');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('open') && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
  });

  // Custom FormSubmit AJAX logic for collab-form
  const collabForm = document.querySelector('.collab-form');
  const collabConfirmation = document.getElementById('collab-confirmation');
  if (collabForm && collabConfirmation) {
    collabForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(collabForm);
      fetch(collabForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          collabForm.style.display = 'none';
          collabConfirmation.style.display = 'block';
          collabConfirmation.innerHTML = `
            <div class="confirmation-message">
              <h3>Thank you for reaching out! 🎨</h3>
              <p>Your message has been sent. I'll get back to you within 24 hours.<br>Let's create something amazing together!</p>
            </div>
          `;
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(() => {
        collabConfirmation.style.display = 'block';
        collabConfirmation.innerHTML = `
          <div class="confirmation-message error">
            <h3>Oops! Something went wrong.</h3>
            <p>Please try again later or contact me directly at <a href="mailto:Barakacyril2006@gmail.com">Barakacyril2006@gmail.com</a>.</p>
          </div>
        `;
      });
    });
  }
});