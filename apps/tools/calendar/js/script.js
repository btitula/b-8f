import { UTILS } from "./utils.js";
import { CONSTANTS } from "./constants.js";
const { normalizeDate, clearSelection, disableFullyOccupiedTiles } = UTILS;
const { PUPILS } = CONSTANTS;

//#region Landing Toggle
const calendarContainer = document.querySelector(".calendar-container");
document.querySelector(".cta button").addEventListener("click", () => {
  calendarContainer.classList.toggle("hidden");
  document.querySelector(".cta").classList.toggle("hidden");
});
//#endregion

//#region Booking & Calendar Logic

//#region Starting Variables
const calendar = document.querySelector(".calendar");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const dialog = document.getElementById("bookingDialog");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeDialogBtn = document.getElementById("closeDialog");
const submitBookingBtn = document.querySelector(".submit-btn");

let today = new Date(
  Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  )
);
let currentMonth = today.getUTCMonth();
let currentYear = today.getUTCFullYear();

// console.log(`${currentMonth} ${currentYear} ${today}`);


let selectingStart = true;
let startDate = null;
let endDate = null;
//#endregion

//#region Predefined Dates -> Integrate DB Here
const occupiedDates = [
  { startDate: "2024-12-10", endDate: "2024-12-15" },
  { startDate: "2024-12-03", endDate: "2024-12-04" },
  { startDate: "2024-12-08", endDate: "2024-12-10" },
  { startDate: "2024-12-29", endDate: "2025-01-03" },
  { startDate: "2025-03-01", endDate: "2025-05-02" },
];
occupiedDates.sort((a, b) => {
  return (
    new Date(`${a.startDate}T00:00:00Z`) - new Date(`${b.startDate}T00:00:00Z`)
  );
});
//#endregion



const updateCalendar = () => {
  calendar.innerHTML = "";
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getUTCDate();
  // console.log(`${firstDay} ${lastDay} ${daysInMonth}`);


  currentMonthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long', year: 'numeric' })}`;

  // console.log(currentMonthYear.textContent);


  for (let i = 1; i <= daysInMonth + 1; i++) {
    const day = document.createElement("div");
    day.className = "day";
    const span = document.createElement("span");
    span.textContent = i;

    // Set data-date for div day element
    // Example: <div class="day" data-date="2025-10-01"><span>1</span></div>
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    day.dataset.date = dateString;


    day.appendChild(span);
    day.addEventListener("click", () => handleDayClick(day));
    calendar.appendChild(day);
  }
}

const handleDayClick = (day) => {
  const selectedDate = new Date(`${day.dataset.date}T00:00:00Z`);
  const thisDay = document.querySelector(`[data-date="${day.dataset.date}"]`);
  // console.log(`${thisDay.dataset.date} is selected`);
  thisDay.classList.add("selected");

  // check and remove .selected from another day
  document.querySelectorAll(".day").forEach((day) => {
    if (day.dataset.date !== thisDay.dataset.date) {
      day.classList.remove("selected");
    }
  });

  // alert(`You clicked on ${thisDay.dataset.date}`);
}

prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});

updateCalendar();


//#region Event Listeners
openModalBtn.addEventListener("click", () => {
  dialog.showModal();
  dialog.classList.add("hide");

  const currentDate = document.getElementById("currentDate");
  const selectedDay = document.querySelector(".selected");
  currentDate.textContent = `${selectedDay.dataset.date}`;


  bookingForm.innerHTML = "";

  PUPILS.forEach((pupil) => {
    bookingForm.insertAdjacentHTML('beforeend', `
      <div class="checkbox-wrapper-47">
        <input type="checkbox" name="${pupil.name}" data-color="${pupil.color}" id="cb-${pupil.id}" />
        <label for="cb-${pupil.id}">${pupil.name}</label>
      </div>
    `);
  });
  bookingForm.insertAdjacentHTML('beforeend', `
    <button class="submit-btn-test" type="submit">
      Send booking request
    </button>
  `);
  setTimeout(() => {
    dialog.classList.remove("hide");
    dialog.classList.add("show");
  }, 10);
});

closeDialogBtn.addEventListener("click", () => {
  dialog.classList.remove("show");
  dialog.classList.add("hide");
  setTimeout(() => {
    dialog.close();
  }, 300); // Match the transition duration
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialogBtn.click();
  }
});

const getRandomColor = () => {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let randomColorHex = `#${randomColor}`;
  return randomColorHex;
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("bookingForm submitted");

  const selectedDates = document.querySelectorAll(".selected");
  const selectedDatesArray = Array.from(selectedDates).map((date) => date.dataset.date);

  selectedDatesArray.forEach((date) => {
    const thisDay = document.querySelector(`[data-date="${date}"]`);
    const dateString = new Date(`${date}T00:00:00Z`).toLocaleDateString('default', { day: 'numeric' });
    console.log(`${thisDay} is updated`);
    thisDay.classList = 'updated';

    /**
     * <ul class="mt-1 flex flex-wrap items-center [&>li:not(:first-child)]:-ml-2">
          <li
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-red-300 ring-2 ring-white hover:z-10">
            Foo
          </li>
     */


    thisDay.innerHTML = `
      <ul class="mt-1 flex items-center justify-end [&>li:not(:first-child)]:-ml-2">
        <li class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-300 ring-2 ring-white hover:z-10">
          ${dateString}
        </li>
      </ul>
    `;
    const selectedPupils = document.querySelectorAll(".checkbox-wrapper-47 input[type='checkbox']:checked");
    const ul = thisDay.querySelector('ul');
    let insertAfterLi = ul.querySelector('li'); // The first li

    selectedPupils.forEach((pupil) => {
      const li = document.createElement('li');
      li.className = "px-2 py-2 h-8 rounded-full flex items-center justify-center text-sm font-medium";
      li.classList.add(`bg-[${pupil.dataset.color}]`, "ring-2", "ring-white", "hover:z-10");
      li.textContent = pupil.name;
      // Insert directly after the first <li>
      insertAfterLi.insertAdjacentElement('afterend', li);
      insertAfterLi = li; // Ensure next is inserted after the last inserted
    });

  });
  closeDialogBtn.click();
});