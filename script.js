// =================================
// Mobile Navigation
// =================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});

// =================================
// Google Calendar Booking Integration
// =================================

const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.app.google/hmuYQSHou1MxmD2bA';

// Function to open Google Calendar booking
function bookConsultation() {
    // Open the Google Calendar booking link in a new tab
    window.open(GOOGLE_CALENDAR_BOOKING_URL, '_blank');

    // Optional: Track the event with analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'book_consultation_clicked', {
            'event_category': 'engagement',
            'event_label': 'Book AI Consultation'
        });
    }
}

// Add event listeners to all booking buttons
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = [
        'bookConsultation',
        'heroBookBtn',
        'ctaBookBtn',
        'servicesCtaBtn',
        'aboutCtaBtn',
        'caseStudiesCtaBtn',
        'contactPageBookBtn'
    ];

    bookingButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                bookConsultation();
            });
        }
    });
});

// =================================
// Smooth Scrolling for Anchor Links
// =================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// =================================
// Form Submission Handling
// =================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Reset button
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = '#10b981';

                // Reset form
                contactForm.reset();

                // Show success message
                alert('Thank you for your message! Our team will get back to you within 24 hours.');

                // Reset button after 3 seconds
                setTimeout(function() {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);

                // Optional: Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'engagement',
                        'event_label': 'Contact Form'
                    });
                }
            }, 1500);

            // TODO: Replace the setTimeout above with actual form submission to your backend
            // Example using fetch:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = '#10b981';
                contactForm.reset();
                alert('Thank you for your message! Our team will get back to you within 24 hours.');
            })
            .catch(error => {
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                submitButton.style.background = '#ef4444';
                alert('Sorry, there was an error sending your message. Please try again or email us directly.');
            })
            .finally(() => {
                setTimeout(function() {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            });
            */
        });
    }
});

// =================================
// Scroll Animations
// =================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    const animatedElements = document.querySelectorAll(
        '.service-card, .industry-card, .feature-card, .value-card, .team-card, .case-study'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// =================================
// Active Navigation Link
// =================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// =================================
// Counter Animation for Stats
// =================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number, .result-number, .metric-number');

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent.trim();
                const number = parseInt(text.replace(/[^0-9]/g, ''));

                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    setTimeout(() => {
                        animateCounter(entry.target, number);
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        // Only animate numeric counters
        const text = counter.textContent.trim();
        if (/^\d+/.test(text)) {
            counterObserver.observe(counter);
        }
    });
});

// =================================
// Sticky Navbar on Scroll
// =================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }

    lastScroll = currentScroll;
});

// =================================
// Back to Top Button (Optional)
// =================================
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s;
        z-index: 999;
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.background = 'var(--primary-dark)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = 'var(--primary-color)';
    });
});

// =================================
// Print/Console Message
// =================================
console.log('%c BearingNorthAI ', 'background: #2563eb; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c AI Advisory & Implementation for UAE ', 'color: #64748b; font-size: 12px;');
console.log('%c Visit us at: https://bearingnorthai.ae ', 'color: #2563eb; font-size: 12px;');
