let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

function loadProducts() {
  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById('product-list');
      list.innerHTML = '';
      products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}"/>
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        list.appendChild(div);
      });
    });
}

function addToCart(id) {
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

updateCartCount();
loadProducts();
