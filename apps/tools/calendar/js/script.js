import { CONSTANTS } from "./constants.js";
import { UTILS } from "./utils.js";

const { PUPILS, LOCAL_STORAGE_KEY } = CONSTANTS;
const { getCurrentDate, initElements, handleDayClick } = UTILS;
const { calendar, currentMonthYear, prevMonthBtn, nextMonthBtn, dialog, openModalBtn, generateReportBtn, closeDialogBtn } = initElements();

let { currentMonth, currentYear } = getCurrentDate();

// ============================================================================
// INITIALIZATION & STORAGE HELPERS
// ============================================================================

/**
 * Initialize localStorage with default pupils data if not exists
 */
(function bootstrapPupils() {
  const hasPupils = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!hasPupils) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(PUPILS));
  }
})();

/**
 * Load pupils data from localStorage
 * @returns {Array} Array of pupil objects
 */
const loadPupils = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

/**
 * Save pupils data to localStorage
 * @param {Array} pupils - Array of pupil objects to save
 */
const savePupils = (pupils) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pupils));

/**
 * Check if a pupil has a specific date in their tracking status
 * @param {Object} pupil - Pupil object
 * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
 * @returns {boolean}
 */
const hasDate = (pupil, dateISO) => {
  return Array.isArray(pupil.trackingStatus) && pupil.trackingStatus.some(t => t.date === dateISO);
};

/**
 * Add a date to pupil's tracking status
 * @param {Object} pupil - Pupil object
 * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
 */
const addDate = (pupil, dateISO) => {
  if (!Array.isArray(pupil.trackingStatus)) {
    pupil.trackingStatus = [];
  }
  if (!hasDate(pupil, dateISO)) {
    pupil.trackingStatus.push({ date: dateISO });
  }
};

/**
 * Remove a date from pupil's tracking status
 * @param {Object} pupil - Pupil object
 * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
 */
const removeDate = (pupil, dateISO) => {
  if (!Array.isArray(pupil.trackingStatus)) return;
  pupil.trackingStatus = pupil.trackingStatus.filter(t => t.date !== dateISO);
};

// ============================================================================
// DATA MANIPULATION FUNCTIONS
// ============================================================================

/**
 * Set tracking status for a specific date
 * Updates pupils who should be tracked and removes tracking from others
 * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
 * @param {number[]} pupilIds - Array of pupil IDs to track for this date
 */
const setTrackingForDate = (dateISO, pupilIds) => {
  const pupils = loadPupils();

  // Add date to selected pupils
  pupilIds.forEach(id => {
    const pupil = pupils.find(p => p.id === Number(id));
    if (pupil) {
      addDate(pupil, dateISO);
    }
  });

  // Remove date from unselected pupils
  pupils.forEach(pupil => {
    if (!pupilIds.includes(pupil.id)) {
      removeDate(pupil, dateISO);
    }
  });

  savePupils(pupils);
};

/**
 * Get all pupils who have tracking status for a specific date
 * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
 * @returns {Array} Array of pupil objects tracked on this date
 */
const getPupilsByDate = (dateISO) => {
  const pupils = loadPupils();
  return pupils.filter(pupil => {
    return (pupil.trackingStatus || []).some(t => t.date === dateISO);
  });
};

/**
 * Auto-assign pupils to days based on their registrationDay
 * @param {number} year - Year to process
 * @param {number} month - Month to process (0-11)
 */
const autoAssignPupilsByRegistrationDay = (year, month) => {
  const pupils = loadPupils();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get the number of days in the month
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Process each day in the month
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
    const date = new Date(year, month, dayNumber);
    const dayName = dayNames[date.getDay()];
    const dateISO = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;

    // Find pupils who should be on this day
    const pupilsForThisDay = pupils.filter(pupil => {
      return Array.isArray(pupil.registrationDay) && pupil.registrationDay.includes(dayName);
    });

    // Auto-assign these pupils to this date
    pupilsForThisDay.forEach(pupil => {
      addDate(pupil, dateISO);
    });
  }

  savePupils(pupils);
};


// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Render calendar day with pupils' tracking data from localStorage
 * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
 */
const renderCalendarDataFromStorage = (dateISO) => {
  const dayEl = document.querySelector(`[data-date="${dateISO}"]`);
  if (!dayEl) return;

  const trackedPupils = getPupilsByDate(dateISO);
  const dateNumber = new Date(`${dateISO}T00:00:00Z`).getUTCDate();
  const dayName = dayEl.dataset.dayName || ''; // Get stored day name

  // If no pupils tracked for this date, show day name with date number in badge format
  if (!trackedPupils.length) {
    dayEl.classList = "day";
    dayEl.innerHTML = `
      <ul class="mt-1 flex items-center justify-start [&>li:not(:first-child)]:-ml-2 pr-1">
        <li class="px-2 py-2 h-8 rounded-full flex items-center justify-center gap-1 text-sm font-medium bg-gray-200 ring-1 ring-slate-300/60 hover:z-10">
          <span>${dayName}</span>
          <span class="w-6 h-6 rounded-full bg-slate-300/40 flex items-center justify-center text-sm font-medium">
            ${dateNumber}
          </span>
        </li>
      </ul>
    `;
    return;
  }

  // Build date number element
  const dateElement = `
    <li class="px-2 py-2 h-8 rounded-full flex items-center justify-center gap-2 text-sm font-medium bg-gray-300 ring-2 ring-white/80 hover:z-10">
      <span>${dayName}</span> 
      <span class="w-6 h-6 rounded-full bg-gray-400/30 flex items-center justify-center text-sm font-medium">
        ${dateNumber}
      </span>
    </li>
  `;

  // Build pupil badges
  const pupilBadges = trackedPupils.map(pupil => `
    <li class="px-2 py-2 h-8 rounded-full flex items-center justify-center text-sm font-normal ring-2 ring-white/80 hover:z-10"
        style="background:${pupil.color}" 
        title="${pupil.name}">
      ${pupil.name}
    </li>
  `).join('');

  // Update day element with tracked pupils
  dayEl.classList = 'updated';
  dayEl.innerHTML = `
    <ul class="mt-1 flex items-center justify-end [&>li:not(:first-child)]:-ml-2 pr-1">
      ${dateElement}${pupilBadges}
    </ul>
  `;
};

/**
 * Render all days in the current month with tracking data
 */
const renderCurrentMonthDaysOnCalendar = () => {
  document.querySelectorAll('.calendar .day').forEach(dayEl => {
    renderCalendarDataFromStorage(dayEl.dataset.date);
  });
};

/**
 * Update calendar display for current month
 * Clears existing calendar and generates new day elements
 */
const updateCalendar = () => {
  // Auto-assign pupils based on their registration days for the current month
  autoAssignPupilsByRegistrationDay(currentYear, currentMonth);

  calendar.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Update month/year display
  currentMonthYear.textContent = firstDay.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  // Generate day elements
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
    const date = new Date(currentYear, currentMonth, dayNumber);
    const dayName = dayNames[date.getDay()]; // Monday, Tuesday, ...

    const dayEl = document.createElement("div");
    dayEl.className = "day";

    // Set ISO date format (YYYY-MM-DD)
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    dayEl.dataset.date = dateString;
    dayEl.dataset.dayName = dayName; // Store only the day name string

    // Set initial display with day name and number
    dayEl.innerHTML = `
      <ul class="mt-1 flex items-center justify-start [&>li:not(:first-child)]:-ml-2 pr-1">
        <li class="px-2 py-2 h-8 rounded-full flex items-center justify-center gap-1 text-sm font-medium bg-gray-200 ring-2 ring-white/80 hover:z-10">
          <span>${dayName}</span>
          <span class="w-6 h-6 rounded-full bg-gray-400/30 flex items-center justify-center text-sm font-medium">
            ${dayNumber}
          </span>
        </li>
      </ul>
    `;

    dayEl.addEventListener("click", () => handleDayClick(dayEl));
    calendar.appendChild(dayEl);
  }
}


// ============================================================================
// EVENT LISTENERS - NAVIGATION
// ============================================================================

/**
 * Navigate to previous month
 */
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
  renderCurrentMonthDaysOnCalendar();
});

/**
 * Navigate to next month
 */
nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
  renderCurrentMonthDaysOnCalendar();
});

// Initialize calendar on page load
updateCalendar();
renderCurrentMonthDaysOnCalendar();

// ============================================================================
// EVENT LISTENERS - MODAL/DIALOG
// ============================================================================

/**
 * Open modal to update tracking status for selected day
 */
openModalBtn.addEventListener("click", () => {
  const selectedDay = document.querySelector(".selected");
  if (!selectedDay) {
    alert("Please select a day first");
    return;
  }

  dialog.showModal();
  dialog.classList.add("hide");

  // Display selected date in modal
  const currentDate = document.getElementById("currentDate");
  const selectedDate = selectedDay.dataset.date;
  currentDate.textContent = selectedDate;

  // Get pupils already tracked for this date
  const trackedPupils = getPupilsByDate(selectedDate);
  const trackedPupilIds = trackedPupils.map(p => p.id);

  // Build form with pupil checkboxes
  bookingForm.innerHTML = "";
  PUPILS.forEach((pupil) => {
    // Check if this pupil is already tracked for the selected date
    const isChecked = trackedPupilIds.includes(pupil.id) ? 'checked' : '';

    bookingForm.insertAdjacentHTML('beforeend', `
      <div class="checkbox-wrapper-47">
        <input type="checkbox"
               name="${pupil.name}"
               value="${pupil.id}"
               data-color="${pupil.color}"
               id="cb-${pupil.id}"
               ${isChecked} />
        <label for="cb-${pupil.id}">${pupil.name}</label>
      </div>
    `);
  });

  // Add submit button
  bookingForm.insertAdjacentHTML('beforeend', `
    <button class="flex-none mt-2 mb-2  bg-[#4a00e0] text-white px-5 py-1 border-0 rounded cursor-pointer text-basehover:bg-[#3a00b3] transition-colors hover:bg-[#3a00b3]"
      id = "button-submit-tracking-status"
      type = "submit"
      class="bg-[#4a00e0] text-white px-4 py-2 border-0 rounded cursor-pointer text-base hover:bg-[#3a00b3] transition-colors">
        Send Tracking Status
    </button >
  `);

  // Animate modal appearance
  setTimeout(() => {
    dialog.classList.remove("hide");
    dialog.classList.add("show");
  }, 10);
});

/**
 * Close modal with animation
 */
closeDialogBtn.addEventListener("click", () => {
  dialog.classList.remove("show");
  dialog.classList.add("hide");
  setTimeout(() => {
    dialog.close();
  }, 300);
});

/**
 * Close modal when clicking outside (backdrop click)
 */
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialogBtn.click();
  }
});

/**
 * Handle form submission - update tracking status for selected pupils
 */
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get all selected dates
  const selectedDates = document.querySelectorAll(".selected");

  console.log('selectedDates', selectedDates);
  const selectedDatesArray = Array.from(selectedDates).map(dayEl => dayEl.dataset.date);

  // Get selected pupils from checkboxes
  const selectedPupilCheckboxes = document.querySelectorAll(".checkbox-wrapper-47 input[type='checkbox']:checked");
  const selectedPupilIds = Array.from(selectedPupilCheckboxes).map(checkbox => Number(checkbox.value));

  // Update tracking status for each selected date
  selectedDatesArray.forEach(dateISO => {
    setTrackingForDate(dateISO, selectedPupilIds);
    renderCalendarDataFromStorage(dateISO);
  });

  // Close modal
  closeDialogBtn.click();
});

// ============================================================================
// EVENT LISTENERS - REPORT
// ============================================================================

/**
 * Navigate to report page with current month parameter
 */
generateReportBtn.addEventListener("click", () => {
  // Format current month as YYYY-MM
  const monthParam = `${currentYear} -${String(currentMonth + 1).padStart(2, '0')} `;

  // Navigate to report.html with month parameter
  window.location.href = `report.html ? month = ${monthParam} `;
});