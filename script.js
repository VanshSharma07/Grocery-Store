// Function to add a product to the cart
function addToCart(product) {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ product: product, quantity: 1 });
    }

    // Change button text to 'Added'
    const addButton = document.getElementById(`add-to-cart-${product.id}`);
    if (addButton) {
        addButton.textContent = 'Added';

        // Revert button text after 1.5 seconds
        setTimeout(() => {
            addButton.textContent = 'Add to Cart';
        }, 1500);

        // Add click animation class
        addButton.classList.add('clicked');

        // Remove click animation class after animation completes
        addButton.addEventListener('animationend', () => {
            addButton.classList.remove('clicked');
        });
    }
}

// Sample product data
const products = [
    { id: 1, name: 'Potato', category: 'vegetables', price: 30, image: 'potato.png' },
    { id: 2, name: 'Tomato', category: 'fruits', price: 50, image: 'tomato2.png' },
    // { id: 3, name: 'product 3', category: 'fruits', price: 2.49, image: 'orange.jpg' },
    // { id: 4, name: 'product 4', category: 'vegetables', price: 0.75, image: 'carrot.jpg' },
    // { id: 5, name: 'product 5', category: 'vegetables', price: 1.25, image: 'tomato.jpg' },
    // { id: 6, name: 'product 7', category: 'fruits', price: 0.99, image: 'banana.jpg' },
    // { id: 7, name: 'product 8', category: 'fruits', price: 2.49, image: 'orange.jpg' },
    // { id: 8, name: 'product 6', category: 'fruits', price: 1.99, image: 'apple.jpg' },
    // { id: 9, name: 'product 9', category: 'vegetables', price: 0.75, image: 'carrot.jpg' },
    // { id: 10, name: 'product 10', category: 'Dairy Products', price: 1.25, image: 'tomato.jpg' },
    // { id: 11, name: 'product 11', category: 'fruits', price: 1.99, image: 'apple.jpg' },
    // { id: 12, name: 'product 12', category: 'fruits', price: 0.99, image: 'banana.jpg' },
    // { id: 13, name: 'product 13', category: 'fruits', price: 2.49, image: 'orange.jpg' },
    // { id: 14, name: 'product 14', category: 'vegetables', price: 0.75, image: 'carrot.jpg' },
    // { id: 15, name: 'product 15', category: 'vegetables', price: 1.25, image: 'tomato.jpg' },
    // { id: 16, name: 'product 16', category: 'fruits', price: 1.99, image: 'apple.jpg' },
    // { id: 17, name: 'product 17', category: 'fruits', price: 0.99, image: 'banana.jpg' },
    // { id: 18, name: 'product 18', category: 'fruits', price: 2.49, image: 'orange.jpg' },
    // { id: 19, name: 'product 19', category: 'vegetables', price: 0.75, image: 'carrot.jpg' },
    // { id: 20, name: 'product 20', category: 'vegetables', price: 1.25, image: 'tomato.jpg' },
    // { id: 21, name: 'product 21', category: 'fruits', price: 1.99, image: 'apple.jpg' },
    // { id: 22, name: 'product 22', category: 'fruits', price: 0.99, image: 'banana.jpg' },
    // { id: 23, name: 'product 23', category: 'fruits', price: 2.49, image: 'orange.jpg' },
    // { id: 24, name: 'product 24', category: 'vegetables', price: 0.75, image: 'carrot.jpg' },
    // { id: 25, name: 'product 25', category: 'vegetables', price: 1.25, image: 'tomato.jpg' }
    // Add more products as needed
];

let cartItems = [];
// Function to display products in the store
function displayProducts() {
    const store = document.getElementById('store');

    // Clear existing content
    store.innerHTML = '';

    // Loop through each category
    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
        // Filter products by category
        const categoryProducts = products.filter(product => product.category === category);

        // Create category section
        const section = document.createElement('section');
        section.classList.add('category-section');
        section.id = category.toLowerCase();
        
        // Create heading for category
        const heading = document.createElement('h2');
        heading.textContent = category;
        section.appendChild(heading);

        // Create and append product cards to the category section
        categoryProducts.forEach(product => {
            const productCard = createProductCard(product);
            section.appendChild(productCard);
        });

        // Append the category section to the store
        store.appendChild(section);
    });
}

// Function to create a product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;

    const name = document.createElement('h3');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `Rs ${product.price.toFixed(2)}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('button');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.id = `add-to-cart-${product.id}`; // Set button ID
    addToCartBtn.addEventListener('click', () => addToCart(product));

    productCard.appendChild(image);
    productCard.appendChild(name);
    productCard.appendChild(price);
    productCard.appendChild(addToCartBtn);

    return productCard;
}

// Function to display the cart
function displayCart() {
    const cartModal = document.getElementById('cartModal');
    const cartContent = document.getElementById('cartContent');
    cartContent.innerHTML = ''; // Clear existing content

    if (cartItems.length === 0) {
        cartContent.textContent = 'Your cart is empty.';
    } else {
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.textContent = `${item.product.name} - Quantity: ${item.quantity}`;
            cartContent.appendChild(cartItem);
        });
    }

    cartModal.style.display = 'block';

    // Add event listener to close button
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the login/signup button and modal
    const loginSignupBtn = document.getElementById("loginSignupBtn");
    const loginSignupModal = document.getElementById("loginSignupModal");

    // Get the close button for the modal
    const closeBtn = loginSignupModal.querySelector(".close");

    // Open the modal when the button is clicked
    loginSignupBtn.addEventListener("click", () => {
        loginSignupModal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", () => {
        loginSignupModal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === loginSignupModal) {
            loginSignupModal.style.display = "none";
        }
    });
});


    // Handle login form submission
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Your login form submission logic here
    });

    // Handle signup form submission
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Your signup form submission logic here
    });


// Function to filter products based on search and category
function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();

        return (productName.includes(searchInput) || searchInput === '') &&
               (productCategory === category || category === '');
    });

    displayFilteredProducts(filteredProducts);
}

// Function to display filtered products
function displayFilteredProducts(filteredProducts) {
    const store = document.getElementById('store');
    store.innerHTML = ''; // Clear existing content

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        store.appendChild(productCard);
    });
}

// Event listeners
document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('category').addEventListener('change', filterProducts);
document.getElementById('viewCart').addEventListener('click', displayCart);

// Display products when the page loads
window.onload = displayProducts;
