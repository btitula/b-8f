import { CONSTANTS } from "./constants.js";
import { UTILS } from "./utils.js";

const { getCurrenntDate, initElements, handleDayClick } = UTILS;
const { PUPILS } = CONSTANTS;


const { calendar, currentMonthYear, prevMonthBtn, nextMonthBtn, dialog, openModalBtn, closeDialogBtn } = initElements();
const { currentMonth, currentYear } = getCurrenntDate();


const updateCalendar = () => {
  calendar.innerHTML = "";
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getUTCDate();

  currentMonthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long', year: 'numeric' })}`;

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


openModalBtn.addEventListener("click", () => {
  const selectedDay = document.querySelector(".selected");
  if (!selectedDay) {
    alert("Please select a day first");
    return;
  }

  dialog.showModal();
  dialog.classList.add("hide");

  const currentDate = document.getElementById("currentDate");
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
    <button 
      id="button-submit-tracking-status"
      type="submit"
      class="bg-[#4a00e0] text-white px-4 py-2 border-0 rounded cursor-pointer text-base hover:bg-[#3a00b3] transition-colors"
    >
      Send Tracking Status
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
        <li class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-300 ring-2 ring-white/80 hover:z-10">
          ${dateString}
        </li>
      </ul>
    `;
    const selectedPupils = document.querySelectorAll(".checkbox-wrapper-47 input[type='checkbox']:checked");
    const ul = thisDay.querySelector('ul');
    let insertAfterLi = ul.querySelector('li'); // The first li

    selectedPupils.forEach((pupil) => {
      const li = document.createElement('li');
      li.className = "px-2 py-2 h-8 rounded-full flex items-center justify-center text-sm font-normal ring-2 ring-white/80 hover:z-10";
      li.style.backgroundColor = pupil.dataset.color;
      li.textContent = pupil.name;

      // Insert directly after the first <li>
      insertAfterLi.insertAdjacentElement('afterend', li);
      insertAfterLi = li; // Ensure next is inserted after the last inserted
    });

  });
  closeDialogBtn.click();
});