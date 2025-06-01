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

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    let currentIndex = 0;
    const slideCount = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance when hovering over the slider
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize the slider
    updateSlider();
});

// Existing mobile menu code
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    body.classList.toggle('nav-active');
});

// Accordion functionality for bread page
document.addEventListener('DOMContentLoaded', function () {
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const content = document.getElementById(this.getAttribute('aria-controls'));

            // Toggle current accordion
            this.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                content.setAttribute('aria-hidden', isExpanded);
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                }
            }
        });
    });
});

// Quantity Selector Functionality
document.addEventListener('DOMContentLoaded', function () {
    const quantitySelectors = document.querySelectorAll('.hoeveelheid-selector');

    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.min-btn');
        const plusBtn = selector.querySelector('.plus-btn');
        const input = selector.querySelector('.hoeveelheid-input');

        // Ensure input starts at 0
        input.value = 0;

        minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                currentValue--;
                input.value = currentValue;
            }
        });

        plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let currentValue = parseInt(input.value) || 0;
            currentValue++;
            input.value = currentValue;
        });
    });
});

// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add cart icon to navigation
    const nav = document.querySelector('.nav-links');
    if (nav) {
        const cartLink = document.createElement('li');
        cartLink.innerHTML = `
            <a href="../pages/winkelwagen.html" class="cart-icon">
                🛒 <span class="cart-count">0</span>
            </a>
        `;
        nav.appendChild(cartLink);
    }

    // Handle Bestellen buttons
    const bestelButtons = document.querySelectorAll('.bestel-btn');
    bestelButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.dataset.product;
            const price = parseFloat(this.dataset.price);
            const quantityInput = this.closest('.brood-card').querySelector('.hoeveelheid-input');
            const quantity = parseInt(quantityInput.value) || 0;

            if (quantity > 0) {
                addToCart(product, price, quantity);
                quantityInput.value = 0;
            } else {
                alert('Selecteer eerst een aantal');
            }
        });
    });

    // Add to cart function
    function addToCart(product, price, quantity) {
        const existingItem = cart.find(item => item.product === product);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                product,
                price,
                quantity
            });
        }

        saveCart();
        updateCartCount();
        showAddedToCartMessage(product);
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart count in navigation
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Show "Added to cart" message
    function showAddedToCartMessage(product) {
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.textContent = `${product} toegevoegd aan winkelwagen`;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    // Initialize shopping cart page if we're on it
    if (document.querySelector('.winkelwagen-section')) {
        initializeCartPage();
    }
});

// Initialize shopping cart page
function initializeCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.querySelector('.winkelwagen-items');
    const subtotalElement = document.querySelector('.subtotal');
    const deliveryCostElement = document.querySelector('.delivery-cost');
    const totalElement = document.querySelector('.total-amount');

    // Clear existing items
    cartItems.innerHTML = '';

    // Add items to cart
    cart.forEach(item => {
        const itemElement = createCartItemElement(item);
        cartItems.appendChild(itemElement);
    });

    // Update totals
    updateCartTotals();

    // Handle checkout button
    const checkoutButton = document.querySelector('.afrekenen-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
}

// Create cart item element
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <div class="cart-item-details">
            <div class="cart-item-title">${item.product}</div>
            <div class="cart-item-price">€${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-minus">-</button>
            <input type="number" value="${item.quantity}" min="0" readonly>
            <button class="quantity-plus">+</button>
        </div>
        <button class="cart-item-remove">❌</button>
    `;

    // Add event listeners
    const minusBtn = div.querySelector('.quantity-minus');
    const plusBtn = div.querySelector('.quantity-plus');
    const removeBtn = div.querySelector('.cart-item-remove');

    minusBtn.addEventListener('click', () => updateItemQuantity(item.product, -1));
    plusBtn.addEventListener('click', () => updateItemQuantity(item.product, 1));
    removeBtn.addEventListener('click', () => removeItem(item.product));

    return div;
}

// Update item quantity
function updateItemQuantity(product, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.product === product);

    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        if (item.quantity === 0) {
            cart = cart.filter(i => i.product !== product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        initializeCartPage();
    }
}

// Remove item from cart
function removeItem(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.product !== product);
    localStorage.setItem('cart', JSON.stringify(cart));
    initializeCartPage();
}

// Update cart totals
function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCost = subtotal > 25 ? 0 : 4.95;
    const total = subtotal + deliveryCost;

    document.querySelector('.subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.querySelector('.delivery-cost').textContent = `€${deliveryCost.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `€${total.toFixed(2)}`;
}

// Handle checkout
function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Je winkelwagen is leeg');
        return;
    }

    // Here you would typically redirect to a checkout page or show a checkout form
    alert('Bedankt voor je bestelling! We nemen zo snel mogelijk contact met je op.');
    localStorage.removeItem('cart');
    window.location.href = '../index.html';
}
