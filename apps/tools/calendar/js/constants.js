/**
 * @typedef {Object} Pupil
 * @property {number} id - Unique identifier for the pupil
 * @property {string} name - Full name of the pupil
 * @property {number} birthDateYear - Birth year of the pupil
 * @property {string} gender - Gender of the pupil
 * @property {string} avatar - URL to avatar image (empty string if none)
 * @property {string} color - Hex color code for visual identification
 * @property {Array<{date: string}>} trackingStatus - Array of tracked dates in ISO format
 */

/**
 * Default pupils data
 * This will be used to initialize localStorage if no data exists
 * @type {Pupil[]}
 */
const PUPILS = [
  {
    id: 1,
    name: 'John Doe',
    birthDateYear: 2025,
    gender: 'male',
    avatar: '',
    color: '#FE546E',
    trackingStatus: [],
  },
  {
    id: 2,
    name: 'Jane Mike',
    birthDateYear: 2025,
    gender: 'female',
    avatar: '',
    color: '#01EDC7',
    trackingStatus: [],
  }
];

/**
 * LocalStorage key for storing pupils data
 * @type {string}
 */
const LOCAL_STORAGE_KEY = 'NuajtiQ95xkH12zI_calendar_pupils'; // pragma: allowlist secret`

/**
 * Application constants
 * @type {{PUPILS: Pupil[], LOCAL_STORAGE_KEY: string}}
 */
export const CONSTANTS = {
  PUPILS,
  LOCAL_STORAGE_KEY
};
