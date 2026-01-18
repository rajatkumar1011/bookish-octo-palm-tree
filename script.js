// ===== Theme Management =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a fun animation to the button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 8px 32px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Explore Features Button =====
const exploreBtn = document.getElementById('explore-btn');
exploreBtn.addEventListener('click', () => {
    const featuresSection = document.getElementById('features');
    const offset = 80;
    const targetPosition = featuresSection.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// ===== Color Palette Generator =====
const generateColorsBtn = document.getElementById('generate-colors');
const colorBoxes = document.querySelectorAll('.color-box');

function generateRandomGradient() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 30 + Math.floor(Math.random() * 60)) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 60%) 100%)`;
}

generateColorsBtn.addEventListener('click', () => {
    colorBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.background = generateRandomGradient();
            box.style.transform = 'scale(1.1)';
            setTimeout(() => {
                box.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
});

// ===== Ripple Effect =====
const rippleContainer = document.getElementById('ripple-container');

rippleContainer.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// ===== Counter =====
let counter = 0;
const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const resetBtn = document.getElementById('reset');

function animateCounter(newValue) {
    const duration = 500;
    const start = parseInt(counterDisplay.textContent);
    const end = newValue;
    const range = end - start;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(start + range * easeOutQuad);
        
        counterDisplay.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counterDisplay.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

incrementBtn.addEventListener('click', () => {
    counter++;
    animateCounter(counter);
    incrementBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        incrementBtn.style.transform = 'scale(1)';
    }, 100);
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    animateCounter(0);
    resetBtn.style.transform = 'rotate(360deg) scale(0.95)';
    setTimeout(() => {
        resetBtn.style.transform = 'rotate(0deg) scale(1)';
    }, 300);
});

// ===== Form Submission =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.querySelector('span').textContent = 'Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
        
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and showcase items
document.querySelectorAll('.feature-card, .showcase-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Parallax Effect on Hero Cards =====
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 5;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Particle System Enhancement =====
const backgroundAnimation = document.querySelector('.background-animation');
const particleCount = 5;

// Add more interactive particles on mouse move
let mouseParticles = [];

document.addEventListener('mousemove', (e) => {
    // Throttle particle creation
    if (Math.random() > 0.95) {
        createMouseParticle(e.clientX, e.clientY);
    }
});

function createMouseParticle(x, y) {
    if (mouseParticles.length > 10) {
        const oldParticle = mouseParticles.shift();
        oldParticle.remove();
    }
    
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'radial-gradient(circle, var(--primary), transparent)';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.5';
    particle.style.transition = 'all 1s ease';
    particle.style.zIndex = '9999';
    
    document.body.appendChild(particle);
    mouseParticles.push(particle);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(2)';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
        mouseParticles = mouseParticles.filter(p => p !== particle);
    }, 1000);
}

// ===== Dynamic Gradient on Scroll =====
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = Math.floor(scrollPercent * 360);
    
    // Update gradient subtly based on scroll position
    document.documentElement.style.setProperty('--scroll-hue', hue);
});

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '2rem';
    message.style.fontWeight = 'bold';
    message.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
    message.style.WebkitBackgroundClip = 'text';
    message.style.WebkitTextFillColor = 'transparent';
    message.style.zIndex = '10000';
    message.style.animation = 'fadeInUp 1s ease';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
}

// ===== Performance Optimization =====
// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Console Easter Egg =====
console.log(
    '%c🚀 Welcome to Stellar UI!',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px 20px; border-radius: 10px;'
);
console.log(
    '%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A',
    'font-size: 14px; color: #667eea; font-style: italic;'
);
