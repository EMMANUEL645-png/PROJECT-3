import { getProductById } from './products.js';

export const DELIVERY_FEE = 5000;
export const FREE_DELIVERY_ABOVE = 150000;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateBadge();
}

export function getCart() {
  return cart;
}

export function clearCart() {
  cart = [];
  saveCart();
}

export function formatNaira(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function updateBadge() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = total;
}

function addToCart(id, qty = 1) {
  const found = cart.find(item => item.id === id);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ id: id, qty: qty });
  }
  saveCart();
}

function changeQty(id, change) {
  const found = cart.find(item => item.id === id);
  if (!found) return;
  found.qty += change;
  if (found.qty < 1) found.qty = 1;
  saveCart();
  displayCart();
}

function deleteItem(id) {
  if (confirm('Remove this item from your cart?')) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
  }
  displayCart();
}

function displayCart() {
  const list = document.getElementById('cart-content');
  if (!list) return; // not on the cart page

  let html = '';
  let subtotal = 0;

  for (let index = 0; index < cart.length; index++) {
    const item = cart[index];
    const product = getProductById(item.id);
    if (!product) continue;

    const lineTotal = product.price * item.qty;
    subtotal += lineTotal;

    html += `
      <article class="cart-item">
        <div class="cart-item__thumb">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="cart-item__details">
          <h3 class="cart-item__name">${product.name}</h3>
          <p class="cart-item__unit-price">${formatNaira(product.price)} each</p>
        </div>
        <div class="cart-item__controls">
          <div class="cart-item__stepper">
            <button type="button" class="qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
            <input class="qty-input" value="${item.qty}" readonly aria-label="Quantity">
            <button type="button" class="qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item__line-total">${formatNaira(lineTotal)}</span>
          <button type="button" class="btn-remove" onclick="deleteItem('${item.id}')" aria-label="Remove ${product.name}">✕</button>
        </div>
      </article>`;
  }

  list.innerHTML = html;
  document.getElementById('cart-empty').hidden = cart.length > 0;

  let delivery = 0;
  if (cart.length > 0 && subtotal < FREE_DELIVERY_ABOVE) delivery = DELIVERY_FEE;

  document.getElementById('cart-subtotal').textContent = formatNaira(subtotal);
  document.getElementById('cart-delivery').textContent =
    cart.length === 0 ? '—' : (delivery === 0 ? 'Free' : formatNaira(delivery));
  document.getElementById('cart-total').textContent = formatNaira(subtotal + delivery);

  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].qty;
  }
  const countEl = document.getElementById('cart-item-count');
  if (countEl) countEl.textContent = totalItems;

  const checkoutBtn = document.querySelector('a[href="checkout.html"]');
  if (checkoutBtn) {
    const isEmpty = cart.length === 0;
    checkoutBtn.classList.toggle('is-disabled', isEmpty);
    checkoutBtn.setAttribute('aria-disabled', String(isEmpty));
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.innerHTML = message + ' <a href="cart.html">View cart</a>';
  toast.classList.add('is-visible');
  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 3000);
}

document.querySelectorAll('.js-add-to-cart').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const id = btn.dataset.productId;
    addToCart(id);
    const product = getProductById(id);
    showToast((product ? product.name : 'Item') + ' added to cart');
  });
});

window.changeQty = changeQty;
window.deleteItem = deleteItem;

updateBadge();
displayCart();

