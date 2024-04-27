const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const categorySelect = document.getElementById("category-select");
const productContainer = document.getElementById("product-container");

// Fetch products from the API
async function fetchProducts() {
  const url = 'https://fakestoreapi.com/products';

  try {
    const response = await fetch(url);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display products on the page
function displayProducts(products) {
  productContainer.innerHTML = ''; // Clear previous products

  products.forEach(product => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });
}

// Create HTML for a single product card
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('productCard');

  let image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;
  image.className = "productImage";

  let title = document.createElement("h3");
  title.innerText = product.title;

  let price = document.createElement("p");
  price.innerText = `$ ${product.price}`
  productCard.append(image, title, price);
    
    return productCard;
  }
  // <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
  
// Event listener for search input
searchInput.addEventListener("input", async function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") {
    productContainer.innerHTML = fetchProducts(); 
    // return;
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${searchTerm}`);
    const product = await response.json();

    if (product.id !== undefined) {
      productContainer.innerHTML = createProductCard(product).outerHTML;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    productContainer.innerHTML = "<p>No product found</p>";
  }
});

// Event listener for sorting products
sortSelect.addEventListener("change", fetchProductsBySort);

// Event listener for filtering products by category
categorySelect.addEventListener("change", fetchProductsByCategory);

// Fetch and display products sorted by price
async function fetchProductsBySort() {
  // const sort = sortSelect.value;
  let url = `https://fakestoreapi.com/products?sort=${sortSelect.value}`;

  // console.log(sortSelect.value);

  try {
    const response = await fetch(url);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Fetch and display products filtered by category
async function fetchProductsByCategory() {
  const selectedCategory = categorySelect.value;
  let url = 'https://fakestoreapi.com/products';

  if (selectedCategory !== 'all') {
    url += `/category/${selectedCategory}`;
  }

  try {
    const response = await fetch(url);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Call the fetchProducts function to fetch and display products
fetchProducts();