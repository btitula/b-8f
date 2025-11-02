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
    name: 'Nhím',
    birthDateYear: 2018,
    price: 250000,
    gender: 'male',
    avatar: '',
    color: '#ff595e',
    registrationDay: [
      'Wednesday',
      'Friday',
      'Sunday'
    ],
    trackingStatus: [],
  },
  {
    id: 2,
    name: 'Angie',
    birthDateYear: 2016,
    price: 325000,
    gender: 'female',
    avatar: '',
    color: '#ff924c',
    registrationDay: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    trackingStatus: [],
  },
  {
    id: 3,
    name: 'Anna',
    birthDateYear: 2013,
    price: 125000,
    gender: 'female',
    avatar: '',
    color: '#ffca3a',
    registrationDay: [
      'Monday',
      'Tuesday',
      'Thursday',
    ],
    trackingStatus: [],
  },
  {
    id: 4,
    name: 'Rio',
    birthDateYear: 2015,
    price: 220000,
    gender: 'male',
    avatar: '',
    color: '#c5ca30',
    registrationDay: [
      'Wednesday',
      'Friday'
    ],
    trackingStatus: [],
  },
  {
    id: 5,
    name: 'Thành',
    birthDateYear: 2015,
    price: 220000,
    gender: 'male',
    avatar: '',
    color: '#8ac926',
    registrationDay: [
      'Wednesday',
      'Friday'
    ],
    trackingStatus: [],
  },
  {
    id: 6,
    name: 'Hân',
    birthDateYear: 2012,
    price: 160000,
    gender: 'female',
    avatar: '',
    color: '#52a675',
    registrationDay: [
      'Wednesday',
      'Friday'
    ],
    trackingStatus: [],
  },
  {
    id: 7,
    name: 'Thỏ',
    birthDateYear: 2015,
    price: 250000,
    gender: 'female',
    avatar: '',
    color: '#1982c4',
    registrationDay: [
      'Thursday',
    ],
    trackingStatus: [],
  },
  {
    id: 8,
    name: 'Chip',
    birthDateYear: 2018,
    price: 359000,
    gender: 'female',
    avatar: '',
    color: '#4267ac',
    registrationDay: [
      'Saturday',
    ],
    trackingStatus: [],
  },
  {
    id: 9,
    name: 'Chi',
    birthDateYear: 2017,
    price: 125000,
    gender: 'female',
    avatar: '',
    color: '#6a4c93',
    registrationDay: [
      'Saturday',
    ],
    trackingStatus: [],
  },
  {
    id: 10,
    name: 'Honey',
    birthDateYear: 2018,
    price: 250000,
    gender: 'female',
    avatar: '',
    color: '#b5a6c9',
    registrationDay: [
      'Sunday',
    ],
    trackingStatus: [],
  },
  {
    id: 11,
    name: 'Buffon',
    birthDateYear: 2017,
    price: 225000,
    gender: 'male',
    avatar: '',
    color: '#56a14f',
    registrationDay: [
      'Monday',
      'Wednesday',
      'Friday',
      'Saturday',
    ],
    trackingStatus: [],
  },
  {
    id: 12,
    name: 'Ivy',
    birthDateYear: 2014,
    price: 450000,
    gender: 'female',
    avatar: '',
    color: '#9378d1',
    registrationDay: [
      'Saturday',
    ],
    trackingStatus: [],
  },
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
