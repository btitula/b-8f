const initElements = () => {
  const calendar = document.querySelector(".calendar");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthBtn = document.getElementById("button-previous-month");
  const nextMonthBtn = document.getElementById("button-next-month");

  const dialog = document.getElementById("booking-dialog");
  const openModalBtn = document.getElementById("button-open-modal-update-working-day");
  const closeDialogBtn = document.getElementById("button-close-dialog");

  return { calendar, currentMonthYear, prevMonthBtn, nextMonthBtn, dialog, openModalBtn, closeDialogBtn };
}

const getCurrenntDate = () => {
  let today = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  );
  let currentMonth = today.getUTCMonth();
  let currentYear = today.getUTCFullYear();

  return { currentMonth, currentYear };
}

const handleDayClick = (day) => {
  const thisDay = document.querySelector(`[data-date="${day.dataset.date}"]`);
  thisDay.classList.add("selected");

  // check and remove .selected from another day
  document.querySelectorAll(".day").forEach((day) => {
    if (day.dataset.date !== thisDay.dataset.date) {
      day.classList.remove("selected");
    }
  });
}

export const UTILS = {
  getCurrenntDate,
  initElements,
  handleDayClick
}
