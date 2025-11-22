let contextTarget = null;
let contextMenu = null;
let isContextMenuInitialized = false;

/**
 * Hide the context menu and remove highlight from target
 */
const hideMenu = (target) => {
  if (!contextMenu) return;

  contextMenu.classList.add('hidden');
  target?.classList.remove('bg-white/10');
  contextTarget = null;
};

/**
 * Position and show the context menu at cursor position
 */
const placeMenu = (x, y) => {
  if (!contextMenu) return;

  contextMenu.style.left = x + 'px';
  contextMenu.style.top = y + 'px';
  contextMenu.classList.remove('hidden');
};

// ============================================================================
// Context Menu Actions
// ============================================================================

/**
 * Action handlers for context menu items
 * Each action receives the target element that was right-clicked
 */
const contextMenuActions = {
  'right-click-start-mix': (item) => {
    console.log('Start mix:', item);
  },
  'right-click-play-next': (item) => {
    console.log('Play next:', item);
  },
  'right-click-add-to-queue': (item) => {
    console.log('Add to queue:', item);
  },
  'right-click-add-to-liked-songs': (item) => {
    console.log('Add to liked songs:', item);
  },
  'right-click-save-to-playlist': (item) => {
    console.log('Save to playlist:', item);
  },
  'right-click-share': (item) => {
    console.log('Share:', item);
  },
  'right-click-not-interested': (item) => {
    console.log('Not interested:', item);
  },
};

// ============================================================================
// Context Menu Setup
// ============================================================================

/**
 * Initialize global context menu event handlers
 * This only needs to be called once
 */
function initGlobalContextMenuHandlers() {
  if (isContextMenuInitialized || !contextMenu) return;

  // Hide menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) {
      hideMenu(contextTarget);
    }
  });

  // Hide menu on scroll
  document.addEventListener('scroll', () => {
    hideMenu(contextTarget);
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideMenu(contextTarget);
  });

  // Handle menu item clicks
  contextMenu.addEventListener('click', (e) => {
    const li = e.target.closest('[data-action]');
    if (!li) return;

    const action = li.getAttribute('data-action');
    console.log('Action:', action);
    console.log('Context target:', contextTarget);

    if (contextMenuActions[action]) {
      contextMenuActions[action](contextTarget);
    }

    hideMenu(contextTarget);
  });

  isContextMenuInitialized = true;
  console.log('✅ Global context menu handlers initialized');
}

/**
 * Add right-click context menu to a specific carousel
 * @param {string} carouselId - The ID of the carousel element
 * @param {string} sectionName - Name for debugging purposes
 */
function addContextMenuToCarousel(carouselId, sectionName = 'carousel') {
  const carousel = document.getElementById(carouselId);

  if (!carousel) {
    console.warn(`Carousel not found: ${carouselId}`);
    return;
  }

  carousel.addEventListener('contextmenu', (e) => {
    const item = e.target.closest('.carousel-item');

    if (!item) return;

    e.preventDefault();
    hideMenu(contextTarget);

    contextTarget = item;
    contextTarget.classList.add('bg-white/10');
    placeMenu(e.clientX, e.clientY);

    console.log(`Context menu opened for: ${sectionName}`);
  });

  console.log(`Context menu added to: ${sectionName} (${carouselId})`);
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Initialize all context menus for the Home page
 */
export function initContextMenus() {
  // Get context menu element (shared across all carousels)
  contextMenu = document.getElementById('context-menu');

  if (!contextMenu) {
    console.error('Context menu element not found!');
    return;
  }

  // Initialize global handlers (only once)
  initGlobalContextMenuHandlers();

  // Add context menu to each carousel
  const carousels = [
    { id: 'carousel-new-music-videos-for-you', name: 'Music Videos For You' },
    { id: 'carousel-today-hits', name: 'Today Hits' },
    { id: 'carousel-albums-for-you', name: 'Albums For You' },
    { id: 'trending-community-playlists', name: 'Trending Community Playlists' },
  ];

  carousels.forEach(({ id, name }) => {
    addContextMenuToCarousel(id, name);
  });
}

export function initHomeEvents() {
  initContextMenus();

  // Add other event initializers here
  // initPlayButtons();
  // initFilterPills();
  // etc.
}
