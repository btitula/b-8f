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
    name: 'HiHi Teo',
    birthDateYear: 2025,
    price: 150000,
    gender: 'male',
    avatar: '',
    color: '#FE546E',
    trackingStatus: [],
  },
  {
    id: 2,
    name: 'Haha Tom',
    birthDateYear: 2025,
    price: 200000,
    gender: 'female',
    avatar: '',
    color: '#01EDC7',
    trackingStatus: [],
  },
  {
    id: 3,
    name: 'HoHo Ti',
    birthDateYear: 2022,
    price: 100000,
    gender: 'female',
    avatar: '',
    color: '#FFA500',
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
