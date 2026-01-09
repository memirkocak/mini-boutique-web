async function fetchFeaturedProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        const products = await response.json();
        
        displayFeaturedProducts(products);
        
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        const productsGrid = document.getElementById('featured-products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = '<p>Erreur lors du chargement des produits.</p>';
        }
    }
}

function displayFeaturedProducts(products) {
    const productsGrid = document.getElementById('featured-products-grid');
    
    if (!productsGrid) {
        console.error("La grille de produits n'a pas été trouvée");
        return;
    }
    
    productsGrid.innerHTML = '';
    
    const limitedProducts = products.slice(0, 4);
    
    limitedProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('aria-label', `Produit : ${product.title}, ${product.price} €`);
    
    const imageWrapper = document.createElement('div');
    
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    image.className = 'product-image';
    image.loading = 'lazy';
    
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
    productPrice.setAttribute('aria-label', `Prix : ${product.price} euros`);
    productPrice.textContent = `${product.price} € `;
    
    const productButton = document.createElement('a');
    productButton.href = `produit-detail.html?id=${product.id}`;
    productButton.className = 'button button-primary button-product';
    productButton.setAttribute('aria-label', `Voir les détails du produit ${product.title}`);
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
    if (document.getElementById('featured-products-grid')) {
        fetchFeaturedProducts();
    }
});

