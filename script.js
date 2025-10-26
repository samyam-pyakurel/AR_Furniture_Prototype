document.addEventListener('DOMContentLoaded', () => {
  // NAV links scroll
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target');
      if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else if (target === 'inventory') document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
      else document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Browse more
  const browseMoreBtn = document.getElementById('browseMoreBtn');
  if (browseMoreBtn) browseMoreBtn.addEventListener('click', () => { document.getElementById('inventory').scrollIntoView({behavior:'smooth'}); });

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
    const tax = +(subtotal * 0.086).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  };

  // Add-to-cart inventory buttons
  document.querySelectorAll('.addInventory').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name || 'Item';
      const price = parseFloat(btn.dataset.price || '0');
      cart.push({ name, price });
      updateCartUI();
      btn.textContent = 'Added';
      btn.disabled = true;
      setTimeout(()=>{btn.textContent='Add to cart'; btn.disabled=false;},900);
    });
  });

  // Cart icon scrolls to cart summary
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) cartIcon.addEventListener('click', () => { document.getElementById('cartSummary').scrollIntoView({behavior:'smooth'}); });

  // Forms
  document.getElementById('joinForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks for joining! (prototype)');
    document.getElementById('joinForm').reset();
  });
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Logged in (prototype)');
    document.getElementById('loginForm').reset();
  });

  // Signup button scroll
  document.getElementById('signupBtn').addEventListener('click', () => {
    document.getElementById('joinForm').scrollIntoView({behavior:'smooth'});
  });

  // initial render
  updateCartUI();
});
