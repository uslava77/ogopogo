/**
 * Ogopogo Coatings - Main JavaScript File
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    loadHeaderAndFooter(); 
    initializeContactForm(); 
    addScrollAnimations();   
});

async function loadHeaderAndFooter() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        try {
            const response = await fetch('header.html');
            if (response.ok) {
                const headerHTML = await response.text();
                headerPlaceholder.innerHTML = headerHTML;
                initializeNavigation(); // Initialize nav & hamburger AFTER header is loaded
            } else {
                console.error('Failed to load header:', response.status);
                headerPlaceholder.innerHTML = '<p style="color:red;">Error loading header. Please check console.</p>';
            }
        } catch (error) {
            console.error('Error fetching header:', error);
            headerPlaceholder.innerHTML = '<p style="color:red;">Error loading header. Please check console.</p>';
        }
    }

    if (footerPlaceholder) {
        try {
            const response = await fetch('footer.html'); 
            if (response.ok) {
                const footerHTML = await response.text();
                footerPlaceholder.innerHTML = footerHTML;
            } else {
                console.error('Failed to load footer:', response.status);
                footerPlaceholder.innerHTML = '<p style="color:red;">Error loading footer. Please check console.</p>';
            }
        } catch (error) {
            console.error('Error fetching footer:', error);
            footerPlaceholder.innerHTML = '<p style="color:red;">Error loading footer. Please check console.</p>';
        }
    }
}


/**
 * Handle mobile navigation toggling and active class
 */
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // This assumes header.html has been loaded and its content is in headerPlaceholder
    const headerElement = document.querySelector('#header-placeholder header'); // Get the actual header element

    if (!headerElement) {
        // console.error("Header element not found for navigation initialization.");
        return; // Exit if header isn't there
    }

    const navLinks = headerElement.querySelectorAll('nav.main-nav ul li a'); 
    const hamburgerButton = headerElement.querySelector('.hamburger-menu');
    const mainNav = headerElement.querySelector('nav.main-nav');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Handle active class for index.html specifically if path is "/" or "/index.html"
        let isActive = false;
        if (linkPage === 'index.html' && (currentPage === '' || currentPage === 'index.html')) {
            isActive = true;
        } else if (linkPage !== 'index.html' && linkPage === currentPage) {
            isActive = true;
        }

        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); 
        }
    });

    // Hamburger Menu Toggle
    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            const isActive = hamburgerButton.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
            hamburgerButton.setAttribute('aria-expanded', isActive);
        });
    } else {
        // console.warn("Hamburger button or main navigation not found in the loaded header.");
    }
}

/**
 * Handle contact form submission
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service')?.value || '',
                message: document.getElementById('message').value
            };
            
            if (!validateForm(formData)) {
                return;
            }
            
            // For now, just an alert. Replace with actual submission logic if needed.
            alert('Thank you for your message! We will get back to you soon.'); 
            contactForm.reset();
        });
    }
}

/**
 * Validate form data
 */
function validateForm(formData) {
    if (!formData.name.trim()) {
        alert('Please enter your name.');
        return false;
    }
    if (!formData.email.trim()) {
        alert('Please enter your email address.');
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!formData.message.trim()) {
        alert('Please enter your message.');
        return false;
    }
    // Phone number is not strictly required by the HTML, so no validation for it here
    // unless you add 'required' to the HTML and corresponding validation logic.
    return true;
}

/**
 * Add scroll animations for better user experience
 */
function addScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal'); // Ensure you have this class on elements
    
    if (revealElements.length > 0) {
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) { // Adjust offset as needed
                    element.classList.add('revealed');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check for elements already in view
    }
}

// Note: DOMContentLoaded listeners are already set at the top for functions
// that don't directly depend on async loaded content or are called from loadHeaderAndFooter.