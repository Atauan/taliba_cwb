// Taliba_Cwb Bio Links - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupLinkButtons();
    setupViewCounter();
    setupParallaxEffect();
    setupHoverEffects();
    animateOnLoad();
    addEasterEggs();
}

// Setup link button functionality
function setupLinkButtons() {
    const linkButtons = document.querySelectorAll('.link-button[data-url]');
    
    linkButtons.forEach(button => {
        // Skip coming soon buttons
        if (button.classList.contains('coming-soon')) {
            return;
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            
            if (url && url !== '#') {
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Open link in new tab
                try {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    console.log('Opening URL:', url); // Debug log
                } catch (error) {
                    console.error('Error opening URL:', error);
                    // Fallback: try direct navigation
                    window.location.href = url;
                }
                
                // Track click (increment view counter)
                incrementViewCounter();
            }
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make focusable and add cursor pointer
        button.setAttribute('tabindex', '0');
        button.style.cursor = 'pointer';
    });
    
    // Add ripple effect to clickable buttons
    addRippleEffect();
}

// Setup view counter
function setupViewCounter() {
    const counter = document.getElementById('viewCounter');
    if (!counter) return;
    
    let currentCount = getViewCount();
    
    // Animate counter on load
    animateCounter(counter, 0, currentCount, 2000);
    
    // Increment on page load
    setTimeout(() => {
        incrementViewCount();
    }, 1000);
}

function getViewCount() {
    // Since we can't use localStorage, we'll simulate with a base number
    // and add some randomness for demo purposes
    const baseViews = 1247;
    const randomAdd = Math.floor(Math.random() * 50);
    return baseViews + randomAdd;
}

function incrementViewCount() {
    // Simulate incrementing view count
    const counter = document.getElementById('viewCounter');
    if (!counter) return;
    
    const currentValue = parseInt(counter.textContent.replace(/\D/g, '')) || 0;
    const newValue = currentValue + 1;
    
    animateCounter(counter, currentValue, newValue, 500);
}

function incrementViewCounter() {
    // Called when links are clicked
    incrementViewCount();
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const change = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (change * easeOutCubic));
        
        element.textContent = current.toLocaleString('pt-BR');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end.toLocaleString('pt-BR');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Setup parallax effect
function setupParallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxBg.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Setup hover effects
function setupHoverEffects() {
    const avatar = document.querySelector('.avatar-placeholder');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Avatar hover effect
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Social icons hover effect
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Animate elements on load
function animateOnLoad() {
    const elements = document.querySelectorAll('.profile-header, .link-button, .page-footer');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 200); // Added delay for better loading effect
    });
}

// Add ripple effect to buttons
function addRippleEffect() {
    // Add animation keyframes to document if not exists
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const buttons = document.querySelectorAll('.link-button:not(.coming-soon)');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(event) {
            createRipple(event, this);
        });
    });
}

function createRipple(event, button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add('ripple');
    
    // Add ripple styles
    const rippleStyles = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.1);
        pointer-events: none;
    `;
    
    circle.style.cssText = rippleStyles;
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 600);
}

// Add some easter eggs for gaming community
function addEasterEggs() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg: Add special effect
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            
            // Show message
            showEasterEggMessage();
            konamiCode = [];
        }
    });
}

function showEasterEggMessage() {
    const message = document.createElement('div');
    message.textContent = '🎮 SCUM Master Descoberto! 🎮';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--neon-green);
        color: var(--dark-black);
        padding: 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Add fade in/out animation for easter egg
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(easterEggStyle);

// Debug function to test links manually
function testLinks() {
    console.log('Testing links...');
    const buttons = document.querySelectorAll('.link-button[data-url]');
    buttons.forEach((button, index) => {
        const url = button.getAttribute('data-url');
        console.log(`Button ${index + 1}: ${url}`);
    });
}