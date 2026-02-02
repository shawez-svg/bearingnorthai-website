// =================================
// BearingNorthAI - Main JavaScript
// =================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Early Access Modal
    const modal = document.getElementById('earlyAccessModal');
    const modalClose = document.getElementById('modalClose');
    const earlyAccessForm = document.getElementById('earlyAccessForm');
    
    // All buttons that should open the modal
    const earlyAccessTriggers = [
        'earlyAccess',
        'heroEarlyAccess',
        'whatsappWaitlist',
        'moreProductsWaitlist',
        'ctaEarlyAccess'
    ];
    
    earlyAccessTriggers.forEach(triggerId => {
        const trigger = document.getElementById(triggerId);
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                if (modal) {
                    modal.classList.add('active');
                }
            });
        }
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Early Access Form Submission
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value;
            
            // Disable form while submitting
            emailInput.disabled = true;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Joining...</span>';
            
            try {
                // TODO: Replace with actual API endpoint
                // For now, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <h3>🎉 You're on the list!</h3>
                    <p>Thanks for your interest in BearingNorthAI. We'll keep you updated on our products.</p>
                    <button class="btn-primary" onclick="document.getElementById('earlyAccessModal').classList.remove('active')" style="width: 100%; justify-content: center; margin-top: 16px; border: none; cursor: pointer;">
                        <span>Got it</span>
                    </button>
                `;
                
                // Store email in localStorage (temporary solution)
                const waitlist = JSON.parse(localStorage.getItem('bearingnorth_waitlist') || '[]');
                waitlist.push({ email, timestamp: new Date().toISOString() });
                localStorage.setItem('bearingnorth_waitlist', JSON.stringify(waitlist));
                
            } catch (error) {
                console.error('Error:', error);
                submitBtn.innerHTML = '<span>Try Again</span>';
                emailInput.disabled = false;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .spec-item, .visual-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
});
