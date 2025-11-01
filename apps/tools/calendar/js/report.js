import { CONSTANTS } from "./constants.js";
const { LOCAL_STORAGE_KEY } = CONSTANTS;

// ===== Helpers =====
const toCurrency = (n, locale = 'vi-VN', currency = 'VND') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(n || 0);

const getInitials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map(s => s[0].toUpperCase()).join('');

const sameMonth = (iso, month) => iso.startsWith(month + '-');
const fmtDM = (iso) => {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

// ===== Core =====
function generateMonthlyReportHTML(month, pupils) {
  // Per pupil
  const perPupil = pupils.map(p => {
    const days = [...new Set((p.trackingStatus || [])
      .map(t => t.date)
      .filter(d => sameMonth(d, month))
      .sort())];
    const sessions = days.length;
    const price = p.price || 0;
    const total = price * sessions;
    return {
      id: p.id, name: p.name, year: p.birthDateYear,
      avatar: p.avatar, color: p.color || '#9CA3AF',
      price, days, sessions, total
    };
  });

  // Totals
  const active = perPupil.filter(x => x.sessions > 0);
  const totalMoney = active.reduce((s, x) => s + x.total, 0);
  const totalStudents = active.length;
  const totalTeachingDays = new Set(active.flatMap(x => x.days)).size;

  // Sort by sessions desc
  perPupil.sort((a, b) => b.sessions - a.sessions || a.name.localeCompare(b.name));

  // Summary
  const summary = `
    <section class="mb-8">
      <div class="flex items-end justify-between flex-wrap gap-3">
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Báo cáo tháng <span class="text-indigo-700">${month}</span></h1>
        <div class="flex gap-2">
          <button onclick="window.location.href='index.html'" class="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition">
            <i class="fa-solid fa-arrow-left mr-1"></i> Quay lại
          </button>
          <button onclick="window.print()" class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            <i class="fa-solid fa-print mr-1"></i> In / Tải PDF
          </button>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="rounded-2xl border bg-white p-5 shadow-sm">
          <div class="text-gray-500 text-sm">Tổng tiền</div>
          <div class="mt-1 text-3xl font-bold text-gray-900">${toCurrency(totalMoney)}</div>
        </div>
        <div class="rounded-2xl border bg-white p-5 shadow-sm">
          <div class="text-gray-500 text-sm">Tổng số ngày dạy</div>
          <div class="mt-1 text-3xl font-bold text-gray-900">${totalTeachingDays}</div>
        </div>
        <div class="rounded-2xl border bg-white p-5 shadow-sm">
          <div class="text-gray-500 text-sm">Tổng số học sinh</div>
          <div class="mt-1 text-3xl font-bold text-gray-900">${totalStudents}</div>
        </div>
      </div>
    </section>
  `;

  // Cards
  const cards = perPupil.map(p => {
    const avatar =
      p.avatar
        ? `<img src="${p.avatar}" alt="${p.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm">`
        : `<div class="w-12 h-12 rounded-full grid place-items-center ring-2 ring-white shadow-sm text-white font-bold"
             style="background:${p.color}">${getInitials(p.name)}</div>`;

    const daysHTML = p.days.length
      ? `<ul class="flex flex-wrap gap-2">
           ${p.days.map(d => `<li class="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">${fmtDM(d)}</li>`).join('')}
         </ul>`
      : `<div class="text-xs text-gray-400 italic">Không có buổi trong tháng</div>`;

    return `
      <article class="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
        <header class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-3">
          <div class="text-xs uppercase tracking-wider opacity-90">Đơn giá / buổi</div>
          <div class="text-2xl font-bold">${toCurrency(p.price)}</div>
        </header>

        <div class="p-5 space-y-4">
          <div class="flex items-center gap-3">
            ${avatar}
            <div>
              <div class="font-semibold text-gray-900">${p.name}</div>
              <div class="text-xs text-gray-500">Năm sinh: ${p.year ?? '-'}</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-xl bg-gray-50 p-3">
              <div class="text-gray-500 text-xs">Số buổi</div>
              <div class="font-semibold">${p.sessions}</div>
            </div>
            <div class="rounded-xl bg-green-50 p-3">
              <div class="text-green-700 text-xs">Tổng tiền</div>
              <div class="font-semibold text-green-700">${toCurrency(p.total)}</div>
            </div>
          </div>

          <div>
            <div class="text-xs text-gray-500 mb-2">Các ngày học</div>
            ${daysHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');

  return `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-6xl mx-auto p-4 sm:p-6">
        ${summary}
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${cards}
        </section>
      </div>
    </div>
  `;
}

// ===== Initialize and Render =====

/**
 * Get URL parameter value
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value or null if not found
 */
const getURLParameter = (name) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
};

/**
 * Get current month in YYYY-MM format
 * @returns {string} Current month formatted as YYYY-MM
 */
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Load pupils data from localStorage
const loadPupils = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
const pupils = loadPupils();

// Get month from URL parameter or default to current month
const monthParam = getURLParameter('month') || getCurrentMonth();

// Render the report
document.getElementById('report').innerHTML = generateMonthlyReportHTML(monthParam, pupils);
