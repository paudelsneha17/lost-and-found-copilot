const listings = [
  { name: 'Blue Hydro Flask', category: 'other', status: 'found', location: 'Library, 2nd floor', time: '12 min ago', icon: '🥤', color: 'blue', description: 'Blue 32oz bottle with a small sticker.' },
  { name: 'Wireless Earbuds', category: 'electronics', status: 'lost', location: 'Science Hall, Room 204', time: '1 hr ago', icon: '🎧', color: 'yellow', description: 'White case, left earbud missing.' },
  { name: 'Black Canvas Backpack', category: 'bags', status: 'found', location: 'Student Union', time: '3 hrs ago', icon: '🎒', color: 'mint', description: 'Black backpack with a green keychain.' },
  { name: 'Silver Watch', category: 'accessories', status: 'lost', location: 'Recreation Center', time: 'Yesterday', icon: '⌚', color: 'pink', description: 'Silver watch with a dark leather strap.' },
  { name: 'Green Knit Beanie', category: 'clothing', status: 'found', location: 'Arts Building lobby', time: 'Yesterday', icon: '🧢', color: 'purple', description: 'Forest green, one-size knit beanie.' },
  { name: 'Student ID Card', category: 'other', status: 'lost', location: 'Main quad', time: '2 days ago', icon: '💳', color: 'blue', description: 'Student ID in a clear plastic sleeve.' }
];

const listingGrid = document.querySelector('#listing-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');
const categoryFilter = document.querySelector('#category-filter');
const statusFilter = document.querySelector('#status-filter');

function renderListings() {
  const query = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const status = statusFilter.value;
  const filtered = listings.filter((item) => {
    const searchable = `${item.name} ${item.location} ${item.description}`.toLowerCase();
    return searchable.includes(query) && (category === 'all' || item.category === category) && (status === 'all' || item.status === status);
  });
  listingGrid.innerHTML = filtered.map((item) => `
    <article class="listing-card">
      <div class="item-visual ${item.color}"><span class="status ${item.status}">${item.status}</span><span aria-hidden="true">${item.icon}</span></div>
      <div class="item-info"><h3>${item.name}</h3><p class="item-meta"><span>⌖ ${item.location}</span><span>◷ ${item.time}</span></p><div class="item-footer"><span>${item.description}</span><button type="button" data-contact="${item.name}">View details →</button></div></div>
    </article>`).join('');
  emptyState.hidden = filtered.length !== 0;
  document.querySelector('#items-count').textContent = String(24 + Math.max(0, listings.length - 6));
}

[searchInput, categoryFilter, statusFilter].forEach((control) => control.addEventListener('input', renderListings));
listingGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-contact]');
  if (button) window.alert(`Thanks for your interest in the ${button.dataset.contact}. Sign in to connect with the reporter.`);
});

document.querySelectorAll('[data-scroll-to]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.scrollTo).scrollIntoView({ behavior: 'smooth' })));
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); });

document.querySelector('#report-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  listings.unshift({ name: data.get('name'), category: data.get('category'), status: data.get('status'), location: data.get('location'), time: 'Just now', icon: data.get('status') === 'found' ? '📦' : '🔎', color: 'blue', description: data.get('description') || 'No additional details provided.' });
  renderListings();
  form.reset();
  const message = document.querySelector('#form-message');
  message.textContent = 'Your item has been posted to the community board!';
  message.classList.add('visible');
  document.querySelector('#browse').scrollIntoView({ behavior: 'smooth' });
});

renderListings();
