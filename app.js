// Application data - simulating persistent storage without using localStorage
let appData = {
  categories: [
    {
      id: "productivity",
      name: "Produktivitas", 
      icon: "briefcase",
      links: [
        {id: "montecarlo", name: "Monte Carlo", url: "https://github.com/mauliar/forwork.git", icon: "✉️"},
        {id: "gdrive", name: "Google Drive", url: "https://drive.google.com", icon: "💾"},
        {id: "notion", name: "Notion", url: "https://notion.so", icon: "📝"},
        {id: "trello", name: "Trello", url: "https://trello.com", icon: "📋"},
        {id: "slack", name: "Slack", url: "https://slack.com", icon: "💬"}
      ]
    },
    {
      id: "social",
      name: "Media Sosial",
      icon: "users", 
      links: [
        {id: "linkedin", name: "LinkedIn", url: "https://linkedin.com", icon: "💼"},
        {id: "instagram", name: "Instagram", url: "https://instagram.com", icon: "📷"},
        {id: "twitter", name: "Twitter/X", url: "https://x.com", icon: "🐦"},
        {id: "facebook", name: "Facebook", url: "https://facebook.com", icon: "👥"},
        {id: "whatsapp", name: "WhatsApp Web", url: "https://web.whatsapp.com", icon: "💬"}
      ]
    },
    {
      id: "development",
      name: "Pengembangan",
      icon: "code",
      links: [
        {id: "github", name: "GitHub", url: "https://github.com", icon: "🐙"},
        {id: "stackoverflow", name: "Stack Overflow", url: "https://stackoverflow.com", icon: "❓"},
        {id: "mdn", name: "MDN Web Docs", url: "https://developer.mozilla.org", icon: "📚"},
        {id: "codepen", name: "CodePen", url: "https://codepen.io", icon: "✏️"},
        {id: "vscode", name: "VS Code Online", url: "https://vscode.dev", icon: "💻"}
      ]
    },
    {
      id: "entertainment",
      name: "Hiburan",
      icon: "play",
      links: [
        {id: "youtube", name: "YouTube", url: "https://youtube.com", icon: "📺"},
        {id: "netflix", name: "Netflix", url: "https://netflix.com", icon: "🎬"},
        {id: "spotify", name: "Spotify", url: "https://spotify.com", icon: "🎵"},
        {id: "twitch", name: "Twitch", url: "https://twitch.tv", icon: "🎮"},
        {id: "reddit", name: "Reddit", url: "https://reddit.com", icon: "🤖"}
      ]
    },
    {
      id: "shopping", 
      name: "Belanja",
      icon: "shopping-cart",
      links: [
        {id: "tokopedia", name: "Tokopedia", url: "https://tokopedia.com", icon: "🛒"},
        {id: "shopee", name: "Shopee", url: "https://shopee.co.id", icon: "🛍️"},
        {id: "amazon", name: "Amazon", url: "https://amazon.com", icon: "📦"},
        {id: "blibli", name: "Blibli", url: "https://blibli.com", icon: "🏪"},
        {id: "bukalapak", name: "Bukalapak", url: "https://bukalapak.com", icon: "🏬"}
      ]
    },
    {
      id: "finance",
      name: "Keuangan", 
      icon: "dollar-sign",
      links: [
        {id: "banking", name: "Internet Banking", url: "#", icon: "🏦"},
        {id: "ewallet", name: "E-Wallet", url: "#", icon: "💳"},
        {id: "investment", name: "Investasi", url: "#", icon: "📈"},
        {id: "paypal", name: "PayPal", url: "https://paypal.com", icon: "💰"},
        {id: "wise", name: "Wise", url: "https://wise.com", icon: "🌍"}
      ]
    },
    {
      id: "learning",
      name: "Belajar",
      icon: "book",
      links: [
        {id: "coursera", name: "Coursera", url: "https://coursera.org", icon: "🎓"},
        {id: "udemy", name: "Udemy", url: "https://udemy.com", icon: "📖"},
        {id: "khan", name: "Khan Academy", url: "https://khanacademy.org", icon: "🧮"},
        {id: "youtube-edu", name: "YouTube Education", url: "https://youtube.com/education", icon: "🎞️"},
        {id: "duolingo", name: "Duolingo", url: "https://duolingo.com", icon: "🦉"}
      ]
    },
    {
      id: "utilities",
      name: "Utilitas",
      icon: "settings", 
      links: [
        {id: "translate", name: "Google Translate", url: "https://translate.google.com", icon: "🌐"},
        {id: "speedtest", name: "Speed Test", url: "https://fast.com", icon: "⚡"},
        {id: "password", name: "Password Manager", url: "#", icon: "🔐"},
        {id: "calendar", name: "Calendar", url: "https://calendar.google.com", icon: "📅"},
        {id: "maps", name: "Maps", url: "https://maps.google.com", icon: "🗺️"}
      ]
    }
  ],
  recentLinks: [],
  settings: {
    theme: "light",
    showRecentLinks: true,
    columnsDesktop: 4,
    columnsTablet: 2,
    columnsMobile: 1
  }
};

// Global variables
let currentEditingLink = null;
let draggedElement = null;
let filteredData = null;

// DOM elements
const elements = {
  searchInput: null,
  themeToggle: null,
  addLinkBtn: null,
  categoriesGrid: null,
  linkModal: null,
  linkForm: null,
  confirmModal: null,
  importFile: null,
  recentLinksSection: null,
  recentLinksContainer: null,
  totalLinks: null,
  totalCategories: null,
  recentCount: null
};

// Utility functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : 
               type === 'error' ? 'fa-exclamation-circle' : 
               'fa-info-circle';
  
  toast.innerHTML = `
    <i class="fas ${icon} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;
  
  const container = document.getElementById('toastContainer');
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => container.removeChild(toast), 300);
  }, 3000);
}

function getFontAwesomeIcon(iconName) {
  const iconMap = {
    'briefcase': 'fa-briefcase',
    'users': 'fa-users',
    'code': 'fa-code',
    'play': 'fa-play',
    'shopping-cart': 'fa-shopping-cart',
    'dollar-sign': 'fa-dollar-sign',
    'book': 'fa-book',
    'settings': 'fa-cog'
  };
  return iconMap[iconName] || 'fa-link';
}

// Theme management
function initTheme() {
  const savedTheme = appData.settings.theme;
  document.documentElement.setAttribute('data-color-scheme', savedTheme);
  updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  appData.settings.theme = newTheme;
  updateThemeToggleIcon(newTheme);
  
  showToast(`Tema berubah ke ${newTheme === 'light' ? 'terang' : 'gelap'}`);
}

function updateThemeToggleIcon(theme) {
  const icon = elements.themeToggle.querySelector('i');
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Recent links management
function addToRecentLinks(link, categoryName) {
  const recentLink = {
    ...link,
    categoryName,
    accessedAt: Date.now()
  };
  
  // Remove if already exists
  appData.recentLinks = appData.recentLinks.filter(l => l.id !== link.id);
  
  // Add to beginning
  appData.recentLinks.unshift(recentLink);
  
  // Keep only last 5 items
  appData.recentLinks = appData.recentLinks.slice(0, 5);
  
  updateRecentLinksDisplay();
  updateStats();
}

function updateRecentLinksDisplay() {
  if (!appData.settings.showRecentLinks || appData.recentLinks.length === 0) {
    elements.recentLinksSection.style.display = 'none';
    return;
  }
  
  elements.recentLinksSection.style.display = 'block';
  elements.recentLinksContainer.innerHTML = appData.recentLinks.map(link => `
    <a href="${link.url}" target="_blank" class="recent-link" data-link-id="${link.id}">
      <span class="link-icon">${link.icon}</span>
      <span>${link.name}</span>
      <small>(${link.categoryName})</small>
    </a>
  `).join('');
  
  // Add click handlers for recent links
  elements.recentLinksContainer.querySelectorAll('.recent-link').forEach(linkEl => {
    linkEl.addEventListener('click', (e) => {
      const linkId = linkEl.dataset.linkId;
      const link = appData.recentLinks.find(l => l.id === linkId);
      if (link) {
        addToRecentLinks(link, link.categoryName);
      }
    });
  });
}

// Statistics management
function updateStats() {
  const totalLinks = appData.categories.reduce((sum, cat) => sum + cat.links.length, 0);
  elements.totalLinks.textContent = totalLinks;
  elements.totalCategories.textContent = appData.categories.length;
  elements.recentCount.textContent = appData.recentLinks.length;
}

// Search functionality
function handleSearch() {
  const query = elements.searchInput.value.toLowerCase().trim();
  
  if (!query) {
    filteredData = null;
    renderCategories();
    return;
  }
  
  filteredData = appData.categories.map(category => ({
    ...category,
    links: category.links.filter(link => 
      link.name.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query)
    )
  })).filter(category => category.links.length > 0);
  
  renderCategories();
}

// Category and link rendering
function renderCategories() {
  const dataToRender = filteredData || appData.categories;
  
  if (dataToRender.length === 0) {
    elements.categoriesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-search"></i>
        </div>
        <p>Tidak ada link yang ditemukan untuk pencarian "${elements.searchInput.value}"</p>
      </div>
    `;
    return;
  }
  
  elements.categoriesGrid.innerHTML = dataToRender.map(category => `
    <div class="category-card" data-category-id="${category.id}">
      <div class="category-header">
        <div class="category-icon">
          <i class="fas ${getFontAwesomeIcon(category.icon)}"></i>
        </div>
        <h3 class="category-title">${category.name}</h3>
        <span class="category-count">${category.links.length}</span>
      </div>
      <div class="links-list" data-category-id="${category.id}">
        ${category.links.map(link => `
          <div class="link-item" draggable="true" data-link-id="${link.id}" data-category-id="${category.id}">
            <span class="link-icon">${link.icon}</span>
            <div class="link-content">
              <a href="${link.url}" target="_blank" class="link-name">${link.name}</a>
            </div>
            <div class="link-actions">
              <button class="link-action edit" title="Edit" data-link-id="${link.id}" data-category-id="${category.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="link-action delete" title="Hapus" data-link-id="${link.id}" data-category-id="${category.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  
  attachEventListeners();
}

// Event listeners
function attachEventListeners() {
  // Link clicks
  document.querySelectorAll('.link-name').forEach(link => {
    link.addEventListener('click', (e) => {
      const linkId = e.target.closest('.link-item').dataset.linkId;
      const categoryId = e.target.closest('.link-item').dataset.categoryId;
      const category = appData.categories.find(c => c.id === categoryId);
      const linkData = category?.links.find(l => l.id === linkId);
      
      if (linkData) {
        addToRecentLinks(linkData, category.name);
      }
    });
  });
  
  // Edit buttons
  document.querySelectorAll('.link-action.edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const linkId = btn.dataset.linkId;
      const categoryId = btn.dataset.categoryId;
      editLink(linkId, categoryId);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.link-action.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const linkId = btn.dataset.linkId;
      const categoryId = btn.dataset.categoryId;
      confirmDelete(linkId, categoryId);
    });
  });
  
  // Drag and drop
  document.querySelectorAll('.link-item').forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
  });
}

// Drag and drop functionality
function handleDragStart(e) {
  draggedElement = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  
  const target = e.target.closest('.link-item');
  if (target && target !== draggedElement) {
    target.classList.add('drag-over');
  }
}

function handleDrop(e) {
  e.preventDefault();
  const target = e.target.closest('.link-item');
  
  if (target && target !== draggedElement) {
    const targetCategoryId = target.dataset.categoryId;
    const draggedCategoryId = draggedElement.dataset.categoryId;
    
    if (targetCategoryId === draggedCategoryId) {
      // Reorder within same category
      reorderLinks(draggedElement, target, targetCategoryId);
    }
  }
  
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
  draggedElement = null;
}

function reorderLinks(draggedEl, targetEl, categoryId) {
  const category = appData.categories.find(c => c.id === categoryId);
  const draggedLinkId = draggedEl.dataset.linkId;
  const targetLinkId = targetEl.dataset.linkId;
  
  const draggedIndex = category.links.findIndex(l => l.id === draggedLinkId);
  const targetIndex = category.links.findIndex(l => l.id === targetLinkId);
  
  if (draggedIndex !== -1 && targetIndex !== -1) {
    const draggedLink = category.links.splice(draggedIndex, 1)[0];
    category.links.splice(targetIndex, 0, draggedLink);
    
    renderCategories();
    showToast('Link berhasil dipindahkan');
  }
}

// Modal management
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  
  // Focus trap
  const focusableElements = modal.querySelectorAll('button, input, select, textarea');
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
}

// Link management
function addNewLink() {
  currentEditingLink = null;
  document.getElementById('modalTitle').textContent = 'Tambah Link Baru';
  
  // Populate category options
  const categorySelect = document.getElementById('linkCategory');
  categorySelect.innerHTML = '<option value="">Pilih kategori...</option>' +
    appData.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
  
  // Clear form
  document.getElementById('linkForm').reset();
  
  showModal('linkModal');
}

function editLink(linkId, categoryId) {
  const category = appData.categories.find(c => c.id === categoryId);
  const link = category?.links.find(l => l.id === linkId);
  
  if (!link) return;
  
  currentEditingLink = { linkId, categoryId };
  document.getElementById('modalTitle').textContent = 'Edit Link';
  
  // Populate category options
  const categorySelect = document.getElementById('linkCategory');
  categorySelect.innerHTML = '<option value="">Pilih kategori...</option>' +
    appData.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
  
  // Fill form with link data
  document.getElementById('linkName').value = link.name;
  document.getElementById('linkUrl').value = link.url;
  document.getElementById('linkCategory').value = categoryId;
  document.getElementById('linkIcon').value = link.icon;
  
  showModal('linkModal');
}

function saveLink(e) {
  e.preventDefault();
  
  const name = document.getElementById('linkName').value.trim();
  const url = document.getElementById('linkUrl').value.trim();
  const categoryId = document.getElementById('linkCategory').value;
  const icon = document.getElementById('linkIcon').value.trim() || '🔗';
  
  if (!name || !url || !categoryId) {
    showToast('Mohon lengkapi semua field yang wajib diisi', 'error');
    return;
  }
  
  const category = appData.categories.find(c => c.id === categoryId);
  if (!category) {
    showToast('Kategori tidak ditemukan', 'error');
    return;
  }
  
  if (currentEditingLink) {
    // Edit existing link
    const oldCategory = appData.categories.find(c => c.id === currentEditingLink.categoryId);
    const linkIndex = oldCategory?.links.findIndex(l => l.id === currentEditingLink.linkId);
    
    if (linkIndex !== -1) {
      const link = oldCategory.links[linkIndex];
      
      // If category changed, move link
      if (currentEditingLink.categoryId !== categoryId) {
        oldCategory.links.splice(linkIndex, 1);
        category.links.push({ ...link, name, url, icon });
      } else {
        // Update in same category
        link.name = name;
        link.url = url;
        link.icon = icon;
      }
      
      showToast('Link berhasil diperbarui');
    }
  } else {
    // Add new link
    const newLink = {
      id: generateId(),
      name,
      url,
      icon
    };
    
    category.links.push(newLink);
    showToast('Link berhasil ditambahkan');
  }
  
  hideModal('linkModal');
  renderCategories();
  updateStats();
}

function confirmDelete(linkId, categoryId) {
  const category = appData.categories.find(c => c.id === categoryId);
  const link = category?.links.find(l => l.id === linkId);
  
  if (!link) return;
  
  document.getElementById('confirmMessage').textContent = 
    `Apakah Anda yakin ingin menghapus link "${link.name}"?`;
  
  document.getElementById('confirmOk').onclick = () => {
    deleteLink(linkId, categoryId);
    hideModal('confirmModal');
  };
  
  showModal('confirmModal');
}

function deleteLink(linkId, categoryId) {
  const category = appData.categories.find(c => c.id === categoryId);
  const linkIndex = category?.links.findIndex(l => l.id === linkId);
  
  if (linkIndex !== -1) {
    const deletedLink = category.links.splice(linkIndex, 1)[0];
    
    // Remove from recent links
    appData.recentLinks = appData.recentLinks.filter(l => l.id !== linkId);
    
    renderCategories();
    updateRecentLinksDisplay();
    updateStats();
    showToast(`Link "${deletedLink.name}" berhasil dihapus`);
  }
}

// Export/Import functionality
function exportData() {
  const dataStr = JSON.stringify(appData, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dashboard-links-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast('Data berhasil diekspor');
}

function importData() {
  document.getElementById('importFile').click();
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target.result);
      
      // Basic validation
      if (importedData.categories && Array.isArray(importedData.categories)) {
        appData = { ...appData, ...importedData };
        renderCategories();
        updateRecentLinksDisplay();
        updateStats();
        showToast('Data berhasil diimpor');
      } else {
        showToast('Format file tidak valid', 'error');
      }
    } catch (error) {
      showToast('Error saat membaca file', 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // Reset file input
}

// Initialize application
function init() {
  // Cache DOM elements
  elements.searchInput = document.getElementById('searchInput');
  elements.themeToggle = document.getElementById('themeToggle');
  elements.addLinkBtn = document.getElementById('addLinkBtn');
  elements.categoriesGrid = document.getElementById('categoriesGrid');
  elements.linkModal = document.getElementById('linkModal');
  elements.linkForm = document.getElementById('linkForm');
  elements.confirmModal = document.getElementById('confirmModal');
  elements.importFile = document.getElementById('importFile');
  elements.recentLinksSection = document.getElementById('recentLinksSection');
  elements.recentLinksContainer = document.getElementById('recentLinksContainer');
  elements.totalLinks = document.getElementById('totalLinks');
  elements.totalCategories = document.getElementById('totalCategories');
  elements.recentCount = document.getElementById('recentCount');
  
  // Initialize theme
  initTheme();
  
  // Render initial content
  renderCategories();
  updateRecentLinksDisplay();
  updateStats();
  
  // Event listeners
  elements.searchInput.addEventListener('input', handleSearch);
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.addLinkBtn.addEventListener('click', addNewLink);
  elements.linkForm.addEventListener('submit', saveLink);
  elements.importFile.addEventListener('change', handleImportFile);
  
  document.getElementById('exportBtn').addEventListener('click', exportData);
  document.getElementById('importBtn').addEventListener('click', importData);
  
  // Modal event listeners
  document.getElementById('closeModal').addEventListener('click', () => hideModal('linkModal'));
  document.getElementById('cancelBtn').addEventListener('click', () => hideModal('linkModal'));
  document.getElementById('confirmCancel').addEventListener('click', () => hideModal('confirmModal'));
  
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hideModal(overlay.parentElement.id);
      }
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'k':
          e.preventDefault();
          elements.searchInput.focus();
          break;
        case 'n':
          e.preventDefault();
          addNewLink();
          break;
      }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
      const visibleModal = document.querySelector('.modal:not(.hidden)');
      if (visibleModal) {
        hideModal(visibleModal.id);
      }
    }
  });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
