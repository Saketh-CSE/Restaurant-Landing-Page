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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // === DOM elements ===
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuContainer = document.getElementById('menu-items');
  const reservationForm = document.getElementById('reservationForm');

  // === Functions ===

  // Function to display menu items
  function displayMenuItems(items) {
      menuContainer.innerHTML = ''; // Clear existing items
      items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';
          
          // Map internal category name to a display-friendly name
          const categoryNames = {
              'vegetarian': 'Vegetarian',
              'non-vegetarian': 'Non-Veg',
              'special': 'Chef\'s Special'
          };
          const categoryDisplayName = categoryNames[item.category] || item.category;

          menuItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="menu-item-content">
                  <div class="menu-item-header">
                      <div>
                          <h3>${item.name}</h3>
                          <span class="category">${categoryDisplayName}</span>
                      </div>
                      <span class="price">${item.price}</span>
                  </div>
                  <p>${item.description}</p>
              </div>
          `;
          menuContainer.appendChild(menuItem);
      });
  }

  // Function to filter menu items based on category
  function filterMenu(category) {
      if (category === 'all') {
          displayMenuItems(menuItems);
      } else {
          const filteredItems = menuItems.filter(item => item.category === category);
          displayMenuItems(filteredItems);
      }
  }

  // Function to handle form submission
  function handleReservationSubmit(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way
      
      // Basic validation: check if required fields are filled
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
      
      if (name && email && phone && date && time && guests) {
          alert('Thank you for your reservation! We look forward to seeing you.');
          reservationForm.reset(); // Clear the form
      } else {
          alert('Please fill in all required fields.');
      }
  }

  // === Event Listeners ===

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
  });

  // Menu filter buttons
  filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          // Update active button style
          filterButtons.forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          
          // Filter the menu
          const category = e.target.dataset.filter;
          filterMenu(category);
      });
  });

  // Reservation form submission
  reservationForm.addEventListener('submit', handleReservationSubmit);

  // === Initial Page Load ===

  // Display all menu items by default when the page loads
  displayMenuItems(menuItems);
});
