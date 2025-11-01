/**
 * Initialize and return references to all DOM elements
 * @returns {Object} Object containing all DOM element references
 */
const initElements = () => {
  const calendar = document.querySelector(".calendar");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthBtn = document.getElementById("button-previous-month");
  const nextMonthBtn = document.getElementById("button-next-month");
  const dialog = document.getElementById("booking-dialog");
  const openModalBtn = document.getElementById("button-open-modal-update-working-day");
  const closeDialogBtn = document.getElementById("button-close-dialog");

  return { 
    calendar, 
    currentMonthYear, 
    prevMonthBtn, 
    nextMonthBtn, 
    dialog, 
    openModalBtn, 
    closeDialogBtn 
  };
};

/**
 * Get current date information in UTC
 * @returns {Object} Object with currentMonth and currentYear
 */
const getCurrentDate = () => {
  const now = new Date();
  const today = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    )
  );
  
  return { 
    currentMonth: today.getUTCMonth(),
    currentYear: today.getUTCFullYear()
  };
};

/**
 * Handle day click event - mark day as selected and deselect others
 * @param {HTMLElement} dayEl - The day element that was clicked
 */
const handleDayClick = (dayEl) => {
  console.log('dayEl', dayEl);
  // Reset classes and mark as selected
  dayEl.classList = 'day';
  dayEl.classList.add("selected");

  const haveUl = dayEl.querySelector('ul') ? true : false;
  if (haveUl) {
    dayEl.classList.remove("updated");
  }

  // Remove 'selected' class from all other days
  document.querySelectorAll(".day").forEach((otherDay) => {
    if (otherDay.dataset.date !== dayEl.dataset.date) {
      otherDay.classList.remove("selected");
    }
  });
};

export const UTILS = {
  getCurrentDate,
  initElements,
  handleDayClick
};
