// Wait for the entire HTML document to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Original Scroll Animations ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => scrollObserver.observe(el));


    // --- Feature 1: Shrinking Header on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // When scrolled more than 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Feature 2: Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5 // Section is considered active when 50% is visible
    });

    sections.forEach(section => navObserver.observe(section));


    // --- Feature 3: Live Contact Form Validation ---
    const contactForm = document.querySelector('.contact-form form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const setValidationState = (input, isValid) => {
        if (isValid) {
            input.style.borderColor = '#2E7D32'; // Green
        } else {
            input.style.borderColor = '#C62828'; // Red
        }
    };

    nameInput.addEventListener('input', () => setValidationState(nameInput, nameInput.value.trim() !== ''));
    emailInput.addEventListener('input', () => setValidationState(emailInput, validateEmail(emailInput.value)));
    messageInput.addEventListener('input', () => setValidationState(messageInput, messageInput.value.trim() !== ''));

    contactForm.addEventListener('submit', (e) => {
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailValid = validateEmail(emailInput.value);
        const isMessageValid = messageInput.value.trim() !== '';

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            e.preventDefault(); // Stop the form from submitting
            alert('Please fill out all fields correctly before sending.');
            // Re-check and show error states
            setValidationState(nameInput, isNameValid);
            setValidationState(emailInput, isEmailValid);
            setValidationState(messageInput, isMessageValid);
        } else {
            // Optional: You can show a success message here
            alert('Thank you for your message!');
        }
    });
    
    
    // --- Feature 4: Custom Mouse Cursor ---
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});