//#region Helper Functions
const normalizeDate = (date) => {
  return date.toISOString().split("T")[0]; // Get YYYY-MM-DD format
}

const clearSelection = () => {
  document.querySelectorAll(".day").forEach((day) => {
    day.classList.remove("afternoon", "morning", "full", "disabled");
  });
}

const disableFullyOccupiedTiles = () => {
  document.querySelectorAll(".day").forEach((day) => {
    if (
      day.classList.contains("full") || (day.classList.contains("morning") && day.classList.contains("afternoon"))
    ) {
      day.classList.add("disabled");
    }
  });
}

export const UTILS = {
  normalizeDate,
  clearSelection,
  disableFullyOccupiedTiles
}
//#endregion