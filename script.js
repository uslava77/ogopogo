document.addEventListener('DOMContentLoaded', function() {
    loadHeaderAndFooter();
    initializeContactForm();
    addScrollAnimations();
    initializeImageGallery();
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
                initializeNavigation();
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

function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const headerElement = document.querySelector('#header-placeholder header');

    if (!headerElement) {
        return;
    }

    const navLinks = headerElement.querySelectorAll('nav.main-nav ul li a');
    const hamburgerButton = headerElement.querySelector('.hamburger-menu');
    const mainNav = headerElement.querySelector('nav.main-nav');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
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

    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            const isActive = hamburgerButton.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
            hamburgerButton.setAttribute('aria-expanded', isActive);
        });
    }
}

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
        revealOnScroll();
    }
}

function initializeImageGallery() {
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    if (!galleryWrapper) {
        return;
    }

    const galleryContainer = galleryWrapper.querySelector('.gallery-container');
    const scrollLeftButton = galleryWrapper.querySelector('.gallery-scroll-btn.left');
    const scrollRightButton = galleryWrapper.querySelector('.gallery-scroll-btn.right');
    const galleryItems = galleryContainer ? galleryContainer.querySelectorAll('.gallery-item a') : [];
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;

    if (galleryContainer && scrollLeftButton && scrollRightButton) {
        const scrollAmount = 300;

        scrollLeftButton.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightButton.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    if (lightbox && lightboxImage && lightboxClose && lightboxCaption && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                const imageSrc = this.getAttribute('href');
                const captionText = this.getAttribute('data-caption');

                lightboxImage.src = imageSrc;
                lightboxCaption.textContent = captionText;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightboxImage.src = '';
            lightboxCaption.textContent = '';
        });

        lightbox.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.remove('active');
                lightboxImage.src = '';
                lightboxCaption.textContent = '';
            }
        });
    }
}