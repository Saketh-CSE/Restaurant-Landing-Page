// Menu data
const menuItems = [
    {
        id: 1,
        name: "Grilled Salmon",
        price: "$28",
        description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
        image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "non-vegetarian"
    },
    {
        id: 2,
        name: "Truffle Risotto",
        price: "$24",
        description: "Creamy arborio rice with black truffle and parmesan cheese",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "vegetarian"
    },
    {
        id: 3,
        name: "Wagyu Beef Steak",
        price: "$45",
        description: "Premium wagyu beef cooked to your preference with seasonal vegetables",
        image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "special"
    },
    {
        id: 4,
        name: "Mediterranean Bowl",
        price: "$18",
        description: "Fresh quinoa bowl with roasted vegetables and tahini dressing",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "vegetarian"
    },
    {
        id: 5,
        name: "Lobster Thermidor",
        price: "$38",
        description: "Classic French preparation with brandy cream sauce",
        image: "https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "special"
    },
    {
        id: 6,
        name: "Duck Confit",
        price: "$32",
        description: "Slow-cooked duck leg with garlic potatoes and cherry sauce",
        image: "https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "non-vegetarian"
    },
    {
        id: 7,
        name: "Vegan Buddha Bowl",
        price: "$22",
        description: "Nutrient-packed bowl with quinoa, avocado, and tahini dressing",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "vegetarian"
    },
    {
        id: 8,
        name: "Chef's Tasting Menu",
        price: "$65",
        description: "7-course journey through our chef's seasonal favorites",
        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "special"
    },
    {
        id: 9,
        name: "Pan-Seared Chicken",
        price: "$26",
        description: "Free-range chicken breast with wild mushroom risotto",
        image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "non-vegetarian"
    }
];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuContainer = document.getElementById('menu-items');
const reservationForm = document.getElementById('reservationForm');
const modal = document.getElementById('confirmationModal');
const closeModalBtn = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    setMinDate();
    initializeEventListeners();
});

// Menu functionality
function initializeMenu() {
    displayMenuItems(menuItems);
}

function displayMenuItems(items) {
    menuContainer.innerHTML = '';
    items.forEach(item => {
        const menuItem = createMenuItemElement(item);
        menuContainer.appendChild(menuItem);
    });
}

function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-content">
            <div class="menu-item-header">
                <div>
                    <h3>${item.name}</h3>
                    <span class="category">${getCategoryDisplayName(item.category)}</span>
                </div>
                <span class="price">${item.price}</span>
            </div>
            <p>${item.description}</p>
        </div>
    `;
    return menuItem;
}

function getCategoryDisplayName(category) {
    const categoryNames = {
        'vegetarian': 'Vegetarian',
        'non-vegetarian': 'Non-Veg',
        'special': 'Chef\'s Special'
    };
    return categoryNames[category] || category;
}

// Filter functionality
function filterMenu(category) {
    if (category === 'all') {
        displayMenuItems(menuItems);
    } else {
        const filteredItems = menuItems.filter(item => item.category === category);
        displayMenuItems(filteredItems);
    }
}

// Navigation functionality
function initializeEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Menu filters
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Reservation form
    reservationForm.addEventListener('submit', handleReservationSubmit);

    // Modal close
    closeModalBtn.addEventListener('click', closeConfirmationModal);
    window.addEventListener('click', handleModalClick);

    // Scroll event for navbar
    window.addEventListener('scroll', handleScroll);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
    
    // Scroll to section
    scrollToSection(targetId.substring(1));
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

function handleFilterClick(e) {
    const category = e.target.dataset.filter;
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter menu items
    filterMenu(category);
}

function handleReservationSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (validateReservationForm()) {
        // Show confirmation modal
        showConfirmationModal();
        
        // Reset form
        reservationForm.reset();
    }
}

function validateReservationForm() {
    const formData = new FormData(reservationForm);
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field.charAt(0).toUpperCase() + field.slice(1)} field.`);
            return false;
        }
    }
    
    // Validate email format
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Validate phone format
    const phone = formData.get('phone');
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }
    
    return true;
}

function showConfirmationModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleModalClick(e) {
    if (e.target === modal) {
        closeConfirmationModal();
    }
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 44, 44, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 44, 44, 0.95)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function setMinDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formattedDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedDate);
}

// Gallery lightbox functionality (basic implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // In a full implementation, you would open a lightbox here
        console.log('Gallery item clicked - lightbox would open here');
    });
});

// Smooth scrolling for CTA button
function scrollToReservation() {
    scrollToSection('reservation');
}

// Add some interactive feedback for form inputs
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Add loading animation for menu items
function addLoadingAnimation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Call loading animation after menu items are displayed
setTimeout(addLoadingAnimation, 100);

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add some micro-interactions
document.querySelectorAll('.cta-button, .submit-button, .modal-button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});