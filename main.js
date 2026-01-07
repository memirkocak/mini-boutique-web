let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json();
        
        displayProducts(allProducts);
        
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = '<p>Erreur lors du chargement des produits.</p>';
        }
    }
}

function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) {
        console.error("La grille de produits n'a pas été trouvée");
        return;
    }
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function filterProductsByCategory(category) {
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

function createProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-image-wrapper';
    
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    image.className = 'product-image';
    
    imageWrapper.appendChild(image);
    
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    
    const productName = document.createElement('h3');
    productName.className = 'product-name';
    productName.textContent = product.title;
    
    const productDescription = document.createElement('p');
    productDescription.className = 'product-description';
    productDescription.textContent = product.category;
    
    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = `${product.price} € `;
    
    const productButton = document.createElement('a');
    productButton.href = `#produit-${product.id}`;
    productButton.className = 'button button-primary button-product';
    productButton.textContent = 'Voir le produit';
    
    productInfo.appendChild(productName);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productButton);
    
    article.appendChild(imageWrapper);
    article.appendChild(productInfo);
    
    return article;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.products-grid')) {
        fetchProducts();
        
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                filterProductsByCategory(e.target.value);
            });
        }
    }
});

