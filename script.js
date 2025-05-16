document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contact-form form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent actual form submission for demo
            alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
            form.reset(); // Reset form fields after submission
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const body = document.querySelector('body');

    hamburger.addEventListener('click', function () {
        body.classList.toggle('nav-active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            body.classList.remove('nav-active');
        });
    });
});
