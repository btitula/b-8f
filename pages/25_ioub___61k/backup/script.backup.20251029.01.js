import { UTILS } from './utils.js';
const { renderSaleBadge, createCartController, renderMangaItems, renderCartController, showCartCount, renderCartContent } = UTILS;

function init() {
  showCartCount(document);
  renderMangaItems(document);
  document.querySelectorAll('.sale-badge').forEach(renderSaleBadge);
  renderCartController(document);
  createCartController(document);
  renderCartContent(document);
}

init();