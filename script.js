/**
 * Ogopogo Coatings - Main JavaScript File
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all necessary components
    initializeNavigation();
    initializeContactForm();
    
    // Add scroll animations
    addScrollAnimations();
});

/**
 * Handle mobile navigation toggling
 */
function initializeNavigation() {
    // This function can be expanded later to include a mobile nav toggle button
    // For now, we're using CSS media queries to handle responsive navigation
    
    // Make sure the active class is applied to the current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Handle contact form submission
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service')?.value || '',
                message: document.getElementById('message').value
            };
            
            // Validate form data
            if (!validateForm(formData)) {
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

/**
 * Validate form data
 */
function validateForm(formData) {
    // Basic validation
    if (!formData.name.trim()) {
        alert('Please enter your name.');
        return false;
    }
    
    if (!formData.email.trim()) {
        alert('Please enter your email address.');
        return false;
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!formData.message.trim()) {
        alert('Please enter your message.');
        return false;
    }
    
    return true;
}

/**
 * Add scroll animations for better user experience
 */
function addScrollAnimations() {
    // This function can be expanded with animation libraries
    // or custom scroll-based animations in the future
    
    // Simple scroll reveal effect for elements with the 'scroll-reveal' class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        window.addEventListener('scroll', function() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('revealed');
                }
            });
        });
        
        // Trigger initial check in case elements are already in view
        window.dispatchEvent(new Event('scroll'));
    }
}