// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:emansarahafi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    formStatus.textContent = '✓ Opening your email client... If it doesn\'t open automatically, please email me at emansarahafi@gmail.com';
    formStatus.className = 'form-status success';
    
    // Reset form after a short delay
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// Animate Skill Tags on Scroll
const animateSkillTags = () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        const tagPosition = tag.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (tagPosition < screenPosition) {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
};

// Skills animation with Intersection Observer
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill categories first
            const categories = entry.target.querySelectorAll('.skill-category');
            categories.forEach((category, catIndex) => {
                setTimeout(() => {
                    category.classList.add('visible');
                    
                    // Then animate skill tags within this category
                    const skillTags = category.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, tagIndex) => {
                        setTimeout(() => {
                            tag.classList.add('visible');
                        }, tagIndex * 50); // Stagger tags by 50ms
                    });
                }, catIndex * 100); // Stagger categories by 100ms
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (excluding skill-category which has its own observer)
const animateElements = document.querySelectorAll('.project-card, .timeline-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing Effect for Hero Section (Optional Enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
let index = 0;

function typeWriter() {
    if (index < originalText.length) {
        heroSubtitle.textContent = originalText.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Uncomment to enable typing effect
heroSubtitle.textContent = '';
typeWriter();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Console Message
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking to hire or collaborate? Feel free to reach out!', 'color: #8b5cf6; font-size: 14px;');
