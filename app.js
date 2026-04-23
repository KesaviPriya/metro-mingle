// MetroMingle JavaScript

// Menu toggle for mobile
const menuBars = document.getElementById('menu-bars');
const navbar = document.querySelector('.navbar');

if (menuBars) {
  menuBars.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
}

// Swiper initialization
if (typeof Swiper !== 'undefined') {
  const homeSlider = new Swiper('.home-slider', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  });
}

// Theme toggler
const themeToggler = document.querySelector('.theme-toggler');
const themeButtons = document.querySelectorAll('.theme-btn');

if (themeToggler) {
  document.querySelector('.toggle-btn').addEventListener('click', () => {
    themeToggler.classList.toggle('active');
  });

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.style.background;
      document.documentElement.style.setProperty('--main-color', color);
    });
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handler for API endpoints
document.querySelectorAll('form').forEach(form => {
  // Only handle forms that point to /api/ endpoints
  if (form.action && form.action.includes('/api/')) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          alert(result.message || 'Success!');
          // Redirect based on form type
          if (form.action.includes('event-booking')) {
            window.location.href = 'regform.html';
          } else if (form.action.includes('payment')) {
            window.location.href = 'main1.html';
          } else if (form.action.includes('contact')) {
            window.location.href = 'main1.html';
          } else if (form.action.includes('login')) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'main1.html';
          } else if (form.action.includes('signup')) {
            window.location.href = 'log.php';
          }
        } else {
          alert(result.error || 'Something went wrong');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Network error. Please try again.');
      }
    });
  }
});
