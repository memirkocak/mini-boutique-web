async function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        document.getElementById('product-detail').innerHTML = '<p>Produit non trouvé</p>';
        return;
    }
    
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        
        const productImage = document.getElementById('product-image');
        productImage.src = product.image;
        productImage.alt = product.title;
        
        document.getElementById('product-title').textContent = product.title;
        
        const productCategory = document.getElementById('product-category');
        productCategory.textContent = product.category;
        productCategory.setAttribute('aria-label', `Catégorie : ${product.category}`);
        
        document.getElementById('product-description').textContent = product.description;
        
        const productPrice = document.getElementById('product-price');
        productPrice.textContent = `${product.price} €`;
        productPrice.setAttribute('aria-label', `Prix : ${product.price} euros`);
        
        const productRating = document.getElementById('product-rating');
        productRating.textContent = `Note: ${product.rating.rate}/5 (${product.rating.count} avis)`;
        productRating.setAttribute('aria-label', `Note : ${product.rating.rate} sur 5, ${product.rating.count} avis`);
        
    } catch (error) {
        document.getElementById('product-detail').innerHTML = '<p>Erreur lors du chargement du produit</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProduct);

