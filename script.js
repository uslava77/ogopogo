/**
 * Ogopogo Coatings - Main JavaScript File
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    loadHeaderAndFooter(); // Call the function to load header and footer
    // Initialize other components after header/footer are potentially loaded
    // However, for nav active class, it's better to do it after header is loaded.
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
                initializeNavigation(); // Initialize nav after header is loaded
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
            const response = await fetch('footer.html'); // Use the cleaned footer.html
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
    // Call other initializations that depend on footer content if any
    // initializeContactForm(); // This can be called here or in DOMContentLoaded directly
    // addScrollAnimations(); // This can be called here or in DOMContentLoaded directly
}


/**
 * Handle mobile navigation toggling and active class
 */
function initializeNavigation() {
    // This function can be expanded later to include a mobile nav toggle button
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#header-placeholder nav ul li a'); // Target links within loaded header

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure others are not active
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
    return true;
}

/**
 * Add scroll animations for better user experience
 */
function addScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('revealed');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
    }
}

// Call functions that don't depend on async loaded content directly
document.addEventListener('DOMContentLoaded', function() {
    // loadHeaderAndFooter is already called above
    initializeContactForm(); // Safe to call here
    addScrollAnimations();   // Safe to call here
});