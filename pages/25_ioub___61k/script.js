import { UTILS } from './scripts/utils.js';
import { MANGA_ITEMS_LIST } from './scripts/mangaItemsList.js';
import { MANGA_CARTS } from './scripts/mangaCarts.js';
const { renderSaleBadge } = UTILS;

const { renderMangaItemsList } = MANGA_ITEMS_LIST;
const { showMangaCartCount, renderMangaCartController, createMangaCartController, renderMangaCartContent } = MANGA_CARTS;

function init() {
  showMangaCartCount(document);
  renderMangaItemsList(document);
  document.querySelectorAll('.sale-badge').forEach(renderSaleBadge);
  renderMangaCartController(document);
  createMangaCartController(document);
  renderMangaCartContent(document);
}

init();
