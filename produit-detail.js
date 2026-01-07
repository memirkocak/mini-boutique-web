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
        
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.title;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `${product.price} €`;
        document.getElementById('product-rating').textContent = `Note: ${product.rating.rate}/5 (${product.rating.count} avis)`;
        
    } catch (error) {
        document.getElementById('product-detail').innerHTML = '<p>Erreur lors du chargement du produit</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProduct);

