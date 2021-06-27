// This function is used to make an Api request from the backend-server

makeRequest = () => {
        const qureyString = window.location.search;
        const urlParam = new URLSearchParams(qureyString);
        // This id constant is used to build the unique url for the each product page
        const id = urlParam.get('id');
        return fetch('http://localhost:3000/api/teddies/' + id)
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(response => {
            createPage(response)
        })
        .catch(function (error) {
            alert (
                "We\'re sorry the server is unavailable"
            )
        })
}

callForApi  = async () => {
    const requestPromise = makeRequest();
    const response = requestPromise;
}

callForApi();

// Function to create the individual product page for each unique id

createPage = (response) => {
    // Create constants for product page image
    const productImage = document.getElementById('productImage');
    const imgCard = document.createElement('div');
    const image = response.imageUrl;
    // Add bootstrap classes for product image
    productImage.classList.add('container-fluid', 'p-0', 'col-xl-6');
    // Add product image url
    productImage.innerHTML += '<img src="' + image + '" alt="Teddy Bear" class="img-fluid" style="height:100%; width:100%; object-fit:cover;">';
    // Append completed element to the page
    productImage.appendChild(imgCard);
    // Create constants for product name, description, and price
    const productCard = document.getElementById('productCard');
    const productDescription = document.createElement('div');
    const title = response.name;
    const description = response.description;
    const price = response.price;
    // Add bootstrap classes for product name, description and price
    productDescription.classList.add('mx-auto');
    productCard.classList.add('col-xl-6','p-0');
    // Add html for product name, description and price
    productDescription.innerHTML += '<h1 class="mx-auto shop-item-title w-auto">' + title + '</h1>';
    productDescription.innerHTML += '<p class="lead mx-auto w-auto">' + description + '</p>';
    productDescription.innerHTML += '<p class="lead mx-auto font-weight-bolder">' + '$' + price / 100 + '</p>';
    // Create constants for dropdown menu
    const dropdownMenu = document.createElement('form');
    const dropdownLabel = document.createElement('label');
    const dropdownOptions = document.createElement('select');
    // Add Bootstrap classes for dropdown menu
    dropdownMenu.classList.add('my-4');
    dropdownOptions.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'w-auto');
    dropdownLabel.classList.add('font-weight-bold');
    dropdownLabel.innerHTML = 'Choose your color&#58; &nbsp;';
    // Create For loop for dropdown menu "Choose your color"
    for (let i in response.colors) {
        const option = document.createElement('option');
        option.innerHTML = response.colors[i];
        option.setAttribute('value', response.colors[i]);
        dropdownOptions.appendChild(option);
    }
    // Append dropdown menu to page
    dropdownMenu.appendChild(dropdownLabel);
    dropdownMenu.appendChild(dropdownOptions);
    // Create constants for Add to Cart button
    const addToCart = document.createElement('button');
    const addedToCartAlert = document.createElement('div');
    // Add bootstrap classes for add to card button
    addToCart.setAttribute('type', 'submit');
    addToCart.classList.add('btn', 'btn-primary', 'add-to-cart', 'rounded','w-75','align-self-center','my-5');
    addToCart.textContent = 'Add to Cart';
    // Function that adds item to local storage
    addToCart.addEventListener('click', () => {
        let cartItems = [];
        const localStorageContent = localStorage.getItem('cart');
        if (localStorageContent === null) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(localStorageContent);
        }
        let product = {
            imageUrl: response.imageUrl,
            name: response.name,
            id: response._id,
            price: response.price,
            selectColors: dropdownOptions.value,
            quantity: 1
        };
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));

        addNumCart();
    });
    // Add alert for items that are added to the cart
    addToCart.onclick = function () {
        addedToCartAlert.classList.add('alert', 'alert-success', 'p-1', 'm-0', 'text-center', 'w-75', 'align-self-center');
        addedToCartAlert.setAttribute('role', 'alert');
        addedToCartAlert.textContent = response.name + ' ' + 'with' + ' ' + dropdownOptions.value + ' ' + 'Color' + ' ' + 'added to cart!';
    }
    // Append completed elements to the product page
    productCard.appendChild(productDescription);
    productCard.appendChild(dropdownMenu);
    productCard.appendChild(addToCart);
    productCard.appendChild(addedToCartAlert);
};


// Function to update items number in shopping cart.

function addNumCart() {
    const localStorageContent = localStorage.getItem('cart');
    if (localStorageContent) {
        let cartItemsArray = JSON.parse(localStorageContent);
        let cartItemsTotal = document.querySelector('.cartItemsTotal');
        cartItemsTotal.innerHTML = cartItemsArray.length;
    }
}
addNumCart();
