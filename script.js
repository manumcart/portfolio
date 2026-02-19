// ===== TEMA CLARO/OSCURO =====
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function getTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? 'dark' : 'light';
}

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
}

let currentTheme = getTheme();
setTheme(currentTheme);

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  });
}

prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    currentTheme = e.matches ? 'dark' : 'light';
    setTheme(currentTheme);
  }
});

// ===== BARRA DE PROGRESO =====
window.addEventListener('scroll', function() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ===== LOGO CLICK TO TOP =====
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

// Observar secciones
document.querySelectorAll('.reveal-section').forEach(section => {
  observer.observe(section);
});

// Observar items del portfolio
const workItems = document.querySelectorAll('.work-item');
workItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(item);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Si es para cerrar lightbox
    if (href === '#_') {
      e.preventDefault();
      closeLightbox();
      return;
    }
    
    // Si es lightbox de imagen, permitir comportamiento default
    if (href.startsWith('#img')) return;
    
    // Navegación normal con smooth scroll
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== CERRAR LIGHTBOX =====
function closeLightbox() {
  window.location.hash = '#!';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (window.location.hash.startsWith('#img')) {
      closeLightbox();
    }
  }
});

// ===== COPIAR EMAIL =====
const emailText = document.querySelector('.email-text');
if (emailText) {
  emailText.addEventListener('click', function() {
    const email = this.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Email copied!';
        this.style.color = 'var(--accent-color)';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.log('Error al copiar:', err);
      });
    }
  });
}

// ===== VIDEOS PERFORMANCE =====
const videos = document.querySelectorAll('video');
if (videos.length > 0) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(err => {
          console.log('Autoplay prevented:', err);
        });
      } else {
        entry.target.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  videos.forEach(video => {
    videoObserver.observe(video);
  });
}

// ===== CONSOLE MESSAGE =====
console.log('%c🎨 Portfolio by MANU', 'color: #4a86e8; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion ✨', 'color: #888; font-size: 14px;');
