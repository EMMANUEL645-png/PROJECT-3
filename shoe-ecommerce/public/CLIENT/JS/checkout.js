import { getCart, clearCart, formatNaira, DELIVERY_FEE, FREE_DELIVERY_ABOVE } from './cart.js';
import { getProductById } from './products.js';

const EXPRESS_FEE = 8000;
const form = document.getElementById('checkout-form');

if (getCart().length === 0) {
  window.location.href = 'cart.html';
}

function getSubtotal() {
  const cart = getCart();
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = getProductById(cart[i].id);
    if (product) subtotal += product.price * cart[i].qty;
  }
  return subtotal;
}

function getDeliveryFee(subtotal) {
  if (form.elements['delivery'].value === 'express') return EXPRESS_FEE;
  return subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
}

function showSummary() {
  const cart = getCart();
  const subtotal = getSubtotal();
  const delivery = getDeliveryFee(subtotal);

  let itemCount = 0;
  for (let i = 0; i < cart.length; i++) {
    itemCount += cart[i].qty;
  }

  document.getElementById('checkout-item-count').textContent = itemCount;
  document.getElementById('checkout-subtotal').textContent = formatNaira(subtotal);
  document.getElementById('checkout-delivery').textContent =
    delivery === 0 ? 'Free' : formatNaira(delivery);
  document.getElementById('checkout-total').textContent = formatNaira(subtotal + delivery);

  const standardPrice = document.getElementById('standard-price');
  if (standardPrice) {
    standardPrice.textContent =
      subtotal >= FREE_DELIVERY_ABOVE ? 'Free' : formatNaira(DELIVERY_FEE);
  }
}

form.addEventListener('change', function (e) {
  if (e.target.name === 'delivery') showSummary();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const items = [];
  for (let i = 0; i < cart.length; i++) {
    const product = getProductById(cart[i].id);
    if (product) {
      items.push({ id: product.id, name: product.name, price: product.price, qty: cart[i].qty });
    }
  }

  const subtotal = getSubtotal();
  const delivery = getDeliveryFee(subtotal);
  const data = new FormData(form);

  const order = {
    id: 'SS-' + Date.now().toString().slice(-7),
    date: new Date().toISOString(),
    status: 'processing',
    customer: {
      name: data.get('first_name') + ' ' + data.get('last_name'),
      email: data.get('email'),
      phone: data.get('phone')
    },
    address: {
      line1: data.get('address_line1'),
      line2: data.get('address_line2'),
      city: data.get('city'),
      state: data.get('state'),
      postalCode: data.get('postal_code'),
      country: data.get('country')
    },
    deliveryMethod: data.get('delivery'),
    paymentMethod: data.get('payment'),
    items: items,
    subtotal: subtotal,
    delivery: delivery,
    total: subtotal + delivery
  };

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  clearCart();

  document.querySelector('.checkout-layout').hidden = true;
  document.getElementById('order-success-number').textContent = order.id;
  document.getElementById('order-success-total').textContent = formatNaira(order.total);
  document.getElementById('order-success-contact').textContent = order.customer.email;
  document.getElementById('order-success').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

showSummary();

