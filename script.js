const categoryIcons = {
  electronics: '📱',
  clothing: '👕',
  'keys-id': '🔑',
  other: '📦'
};

const categoryColors = {
  electronics: 'blue',
  clothing: 'pink',
  'keys-id': 'purple',
  other: 'yellow'
};

const STORAGE_KEY = 'campusconnect_listings';

let listings = [];

// Load listings from localStorage on page load
function loadListings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      listings = JSON.parse(stored);
    } catch (e) {
      console.error('Error loading listings from localStorage:', e);
      listings = getDefaultListings();
    }
  } else {
    listings = getDefaultListings();
  }
}

// Get default sample listings
function getDefaultListings() {
  return [
    { name: 'Blue Hydro Flask', category: 'other', status: 'found', location: 'Library, 2nd floor', date: '2024-12-18', icon: '💧', color: 'blue', description: 'Blue 32oz bottle with a small sticker.' },
    { name: 'Wireless Earbuds', category: 'electronics', status: 'lost', location: 'Science Hall, Room 204', date: '2024-12-17', icon: '🎧', color: 'yellow', description: 'White case, left earbud missing.' },
    { name: 'Black Canvas Backpack', category: 'other', status: 'found', location: 'Student Union', date: '2024-12-16', icon: '🎒', color: 'mint', description: 'Black backpack with a green keychain.' },
    { name: 'Silver Watch', category: 'other', status: 'lost', location: 'Recreation Center', date: '2024-12-15', icon: '⌚', color: 'pink', description: 'Silver watch with a dark leather strap.' },
    { name: 'Green Knit Beanie', category: 'clothing', status: 'found', location: 'Arts Building lobby', date: '2024-12-15', icon: '🧢', color: 'purple', description: 'Forest green, one-size knit beanie.' },
    { name: 'Student ID Card', category: 'keys-id', status: 'lost', location: 'Main quad', date: '2024-12-14', icon: '🆔', color: 'blue', description: 'Student ID in a clear plastic sleeve.' }
  ];
}

// Save listings to localStorage
function saveListings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error('Error saving listings to localStorage:', e);
  }
}

const listingGrid = document.querySelector('#listing-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');
const categoryFilter = document.querySelector('#category-filter');
const statusFilter = document.querySelector('#status-filter');

function getTimeAgo(dateString) {
  const itemDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  itemDate.setHours(0, 0, 0, 0);
  
  const diffTime = today - itemDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderListings() {
  const query = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const status = statusFilter.value;
  
  const filtered = listings.filter((item) => {
    const searchable = `${item.name} ${item.location} ${item.description}`.toLowerCase();
    return (
      searchable.includes(query) &&
      (category === 'all' || item.category === category) &&
      (status === 'all' || item.status === status)
    );
  });

  listingGrid.innerHTML = filtered
    .map(
      (item) => `
    <article class="listing-card">
      <div class="item-visual ${item.color}">
        <span class="status ${item.status}">${item.status.toUpperCase()}</span>
        <span aria-hidden="true">${item.icon}</span>
      </div>
      <div class="item-info">
        <h3>${item.name}</h3>
        <p class="item-meta">
          <span>⌖ ${item.location}</span>
          <span>📅 ${getTimeAgo(item.date)}</span>
        </p>
        <div class="item-footer">
          <span>${item.description}</span>
        </div>
      </div>
    </article>`
    )
    .join('');

  emptyState.hidden = filtered.length !== 0;
  document.querySelector('#items-count').textContent = String(listings.length);
}

[searchInput, categoryFilter, statusFilter].forEach((control) =>
  control.addEventListener('input', renderListings)
);

document.querySelectorAll('[data-scroll-to]').forEach((button) =>
  button.addEventListener('click', () =>
    document.getElementById(button.dataset.scrollTo).scrollIntoView({ behavior: 'smooth' })
  )
);

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelector('#report-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);

  const newItem = {
    name: data.get('name'),
    category: data.get('category'),
    status: data.get('status'),
    location: data.get('location'),
    date: data.get('date'),
    icon: categoryIcons[data.get('category')],
    color: categoryColors[data.get('category')],
    description: data.get('description')
  };

  listings.unshift(newItem);
  saveListings();
  renderListings();
  form.reset();

  const message = document.querySelector('#form-message');
  message.textContent = '✓ Your item has been posted to the community board!';
  message.classList.add('visible');

  setTimeout(() => {
    message.classList.remove('visible');
  }, 3000);

  document.querySelector('#browse').scrollIntoView({ behavior: 'smooth' });
});

// Load listings on page load and render
loadListings();
renderListings();
