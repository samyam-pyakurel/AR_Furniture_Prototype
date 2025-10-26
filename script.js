/* Basic behavior:
   - nav links scroll to sections or show content
   - Add-to-cart buttons add items, update subtotal / tax / total
   - Browse and cart icon toggles
*/

document.addEventListener('DOMContentLoaded', () => {
  // NAV links: we'll simply scroll to major areas
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target');
      if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      if (target === 'inventory') {
        document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'shop' || target === 'about' || target === 'contact') {
        // for demo, scroll to hero for non-existent pages
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Browse more button scrolls to inventory
  const browseMoreBtn = document.getElementById('browseMoreBtn');
  if (browseMoreBtn) {
    browseMoreBtn.addEventListener('click', () => {
      document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Simple cart model
  let cart = [];

  const updateCartUI = () => {
    const listEl = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('grandTotal');

    if (cart.length === 0) {
      listEl.innerHTML = 'Your cart is empty';
    } else {
      listEl.innerHTML = '';
      cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} — $${Number(item.price).toFixed(2)}`;
        listEl.appendChild(div);
      });
    }

    const subtotal = cart.reduce((s, i) => s + Number(i.price), 0);
    const tax = +(subtotal * 0.086).toFixed(2); // example tax 8.6%
    const total = +(subtotal + tax).toFixed(2);

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  };

  // Add inventory button(s)
  document.querySelectorAll('.addInventory').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name || 'Item';
      const price = parseFloat(btn.dataset.price || '0');
      cart.push({ name, price });
      updateCartUI();
      // visual feedback
      btn.textContent = 'Added';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Add to cart'; btn.disabled = false; }, 1000);
    });
  });

  // Optional: cart icon scroll to cart summary
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      document.getElementById('cartSummary').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Forms: simple prevent default
  document.getElementById('joinForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks for joining! (Prototype only)');
  });
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Logged in (prototype).');
  });

  // Signup button quick scroll
  document.getElementById('signupBtn').addEventListener('click', () => {
    document.getElementById('joinForm').scrollIntoView({ behavior: 'smooth' });
  });

  // initial cart UI render
  updateCartUI();
});
