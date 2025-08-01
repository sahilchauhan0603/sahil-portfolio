// Enhanced Portfolio JavaScript with Modern Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initContactForm();
    initSkillBars();
    initScrollProgress();
    initNavbarEffects();
    initSmoothScrolling();
    initMobileOptimizations();
    initPerformanceOptimizations();
});

// Enhanced Navigation System
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle with enhanced animations
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links or outside
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
        if (navToggle) {
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }

    // Enhanced smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight || 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    // Use scrollTo with smooth behavior
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active state immediately
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                }
                
                closeMobileMenu();
            }
        });
    });

    // Enhanced active nav link detection - FIXED
    const updateActiveNavLink = throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight || 80;
        const scrollTop = window.pageYOffset;
        
        let current = '';
        
        // Find the current section in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // If at the very top, set home as active
        if (scrollTop < 100) {
            current = 'home';
        }

        // Update active nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Full-Stack Web Developer 💻',
        'Team Leader 🤝',
        'Competitive Programmer 🤖',
        'Open-Source Contributor 👨‍💻',
        'Cricket Enthusiast 🏏',
        'Car Lover 🏎️',
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 300; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation after a brief delay
    setTimeout(typeText, 1000);
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create different observers for different animation types
    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats(entry.target);
                }
                
                if (entry.target.classList.contains('skill-category')) {
                    setTimeout(() => animateSkillBars(entry.target), 300);
                }
                
                if (entry.target.classList.contains('achievement-item')) {
                    animateAchievement(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                // Unobserve after animation to improve performance
                fadeUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-up animation
    const elementsToObserve = document.querySelectorAll(`
        .hero-content,
        .hero-avatar,
        .section-header,
        .about-content,
        .hero-stats,
        .skill-category,
        .project-card,
        .achievement-item,
        .cert-card,
        .profile-card,
        .contact-item,
        .timeline-item
    `);
    
    elementsToObserve.forEach(el => {
        // Add initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        fadeUpObserver.observe(el);
    });
}

// Animate statistics numbers
function animateStats(statsContainer) {
    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isGPA = finalValue.includes('.');
        const numericValue = parseFloat(finalValue);
        
        let currentValue = 0;
        const increment = isGPA ? 0.05 : (numericValue > 100 ? 10 : 1);
        const duration = 2000;
        const stepTime = duration / (numericValue / increment);
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(counter);
            }
            
            if (isGPA) {
                stat.textContent = currentValue.toFixed(2);
            } else if (finalValue.includes('+')) {
                stat.textContent = Math.floor(currentValue) + '+';
            } else {
                stat.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
            }
        }, stepTime);
    });
}

// Enhanced skill bar animations
function initSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

function animateSkillBars(skillCategory) {
    const progressBars = skillCategory.querySelectorAll('.skill-progress');
    
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
            
            // Add number counting animation
            const percentElement = bar.parentElement.nextElementSibling;
            if (percentElement && percentElement.classList.contains('skill-percent')) {
                animateNumber(percentElement, 0, parseInt(targetWidth), '%');
            }
        }, index * 100);
    });
}

// Animate numbers with suffix
function animateNumber(element, start, end, suffix = '') {
    const duration = 1500;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;
    let current = start;
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            current = end;
            clearInterval(counter);
        }
        
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// Animate achievement items
function animateAchievement(achievement) {
    const icon = achievement.querySelector('.achievement-icon');
    
    if (icon) {
        setTimeout(() => {
            icon.style.animation = 'float 2s ease-in-out infinite';
        }, 300);
    }
}

// Animate project cards
function animateProjectCard(card) {
    const techTags = card.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'all 0.3s ease-out';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Enhanced Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-control');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Enhanced input validation with real-time feedback
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
        input.addEventListener('focus', (e) => {
            e.target.classList.add('focused');
        });
    });
    
    // Handle form submission with enhanced UX
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput({ target: input })) {
                isValid = false;
            }
        });
        
        if (isValid) {
            await handleFormSubmission(form, { name, email, subject, message });
        } else {
            showFormError('Please fill in all fields correctly.');
        }
    });
}

// Enhanced form validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    
    // Remove existing validation classes
    input.classList.remove('error', 'success');
    
    // Check if field is empty
    if (!value) {
        input.classList.add('error');
        showFieldError(input, 'This field is required');
        isValid = false;
    } else {
        // Specific validation rules
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('error');
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                input.classList.add('success');
                clearFieldError(input);
            }
        } else if (input.name === 'name') {
            if (value.length < 2) {
                input.classList.add('error');
                showFieldError(input, 'Name must be at least 2 characters');
                isValid = false;
            } else {
                input.classList.add('success');
                clearFieldError(input);
            }
        } else if (input.name === 'message') {
            if (value.length < 10) {
                input.classList.add('error');
                showFieldError(input, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                input.classList.add('success');
                clearFieldError(input);
            }
        } else {
            input.classList.add('success');
            clearFieldError(input);
        }
    }
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s ease-out;
    `;
    
    input.parentElement.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 50);
}

function clearFieldError(input) {
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('error', 'success');
    clearFieldError(input);
}

// Simulate form submission with enhanced feedback
async function handleFormSubmission(form, data) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i class="btn-icon">⏳</i>';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="btn-icon">✅</i>';
        submitBtn.style.background = 'var(--color-success)';
        
        // Reset form
        form.reset();
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('error', 'success', 'focused');
            clearFieldError(input);
        });
        
        showFormSuccess('Thank you! Your message has been sent successfully.');
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 3000);
        
    } catch (error) {
        showFormError('Sorry, there was an error sending your message. Please try again.');
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

function showFormSuccess(message) {
    showNotification(message, 'success');
}

function showFormError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: var(--space-16) var(--space-24);
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
        color: white;
        border-radius: var(--radius-base);
        font-weight: var(--font-weight-medium);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    const updateProgress = throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, 16);
    
    window.addEventListener('scroll', updateProgress);
}

// Enhanced Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const updateNavbar = throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 16);
    
    window.addEventListener('scroll', updateNavbar);
}

// Enhanced Smooth Scrolling - FIXED
function initSmoothScrolling() {
    // Smooth scroll for all anchor links that aren't already handled by navigation
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
                const offsetTop = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle "Back to Top" link specifically
    document.querySelectorAll('a[href="#home"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Mobile Optimizations
function initMobileOptimizations() {
    // Reduce animations on mobile for better performance
    if (window.innerWidth <= 768) {
        document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
        document.documentElement.style.setProperty('--transition-bounce', 'all 0.3s ease');
    }
    
    // Handle viewport height on mobile
    const updateVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateVH();
    window.addEventListener('resize', throttle(updateVH, 250));
    
    // Optimize touch interactions
    document.querySelectorAll('.btn, .nav-link, .social-link, .project-card').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load non-critical animations
    const lazyAnimations = document.querySelectorAll('.floating-badges, .shape');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                animationObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyAnimations.forEach(element => {
        element.style.animationPlayState = 'paused';
        animationObserver.observe(element);
    });
    
    // Preload critical images
    const criticalImages = ['hero-avatar'];
    criticalImages.forEach(selector => {
        const img = document.querySelector(`.${selector} img`);
        if (img && !img.complete) {
            img.loading = 'eager';
        }
    });
    
    // Optimize scroll listeners
    let ticking = false;
    
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-dependent operations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// Enhanced Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    function createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.project-card, .achievement-item, .cert-card, .profile-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || '';
            if (!this.style.transform.includes('scale')) {
                this.style.transform += ' scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
    
    // Add loading state for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = originalText + ' <span style="opacity: 0.6;">↗</span>';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    });
});

// Add CSS for animations that need to be defined in JS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-control.error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 3px rgba(192, 21, 47, 0.1) !important;
    }
    
    .form-control.success {
        border-color: var(--color-success) !important;
        box-shadow: 0 0 0 3px rgba(50, 184, 198, 0.1) !important;
    }
    
    .form-control.focused {
        transform: translateY(-1px);
    }
    
    .btn.loading {
        pointer-events: none;
        opacity: 0.8;
    }
    
    .touch-active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
    
    .nav-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .hero {
            min-height: calc(100vh - 70px);
            min-height: calc(var(--vh, 1vh) * 100 - 70px);
        }
    }
`;

document.head.appendChild(style);

// Initialize performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('Portfolio loaded and optimized for performance');
    });
}

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
    
    // Disable animations for accessibility
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
    });
}