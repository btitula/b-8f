import PlaylistTags from "../../components/PlaylistTags";
import authSevice from "../../service/authSevice";
import { dateTimeUtils } from "@/utils/dateTime";
import homeHtml from "./home.html?raw";

import todayHitImageOne from "@/assets/images/home/todayHits/unnamed_1.jpg";
import todayHitImageTwo from "@/assets/images/home/todayHits/unnamed_2.jpg";
import todayHitImageThree from "@/assets/images/home/todayHits/unnamed_3.jpg";
import todayHitImageFour from "@/assets/images/home/todayHits/unnamed_4.jpg";
import todayHitImageFive from "@/assets/images/home/todayHits/unnamed_5.jpg";
import todayHitImageSix from "@/assets/images/home/todayHits/unnamed_6.jpg";
import todayHitImageSeven from "@/assets/images/home/todayHits/unnamed_7.jpg";
import todayHitImageEight from "@/assets/images/home/todayHits/unnamed_8.jpg";
import todayHitImageNine from "@/assets/images/home/todayHits/unnamed_9.jpg";
import todayHitImageTen from "@/assets/images/home/todayHits/unnamed_10.jpg";

import albumsForYouImageOne from "@/assets/images/home/albumsForYou/unnamed_1.jpg";
import albumsForYouImageTwo from "@/assets/images/home/albumsForYou/unnamed_2.jpg";
import albumsForYouImageThree from "@/assets/images/home/albumsForYou/unnamed_3.jpg";
import albumsForYouImageFour from "@/assets/images/home/albumsForYou/unnamed_4.jpg";
import albumsForYouImageFive from "@/assets/images/home/albumsForYou/unnamed_5.jpg";
import albumsForYouImageSeven from "@/assets/images/home/albumsForYou/unnamed_7.jpg";
import albumsForYouImageEight from "@/assets/images/home/albumsForYou/unnamed_8.jpg";
import albumsForYouImageNine from "@/assets/images/home/albumsForYou/unnamed_9.jpg";
import albumsForYouImageTen from "@/assets/images/home/albumsForYou/unnamed_10.jpg";

import tellUsWhichArtistsYouLikeImageOne from "@/assets/images/home/tellUsWhichArtistsYouLike/US_992_X_304.png";

const PlaylistTagsName = [
  {
    name: "Energize",
  },
  {
    name: "Relax",
  },
  {
    name: "Feel good",
  },
  {
    name: "Workout",
  },
  {
    name: "Commute",
  },
  {
    name: "Party",
  },
  {
    name: "Focus",
  },
  {
    name: "Sad",
  },
  {
    name: "Romance",
  },
  {
    name: "Sleep",
  },
];


function generateQuickPicks() {
  const picks = [
    {
      title: "Peaches (feat. Daniel Caesar & Giveon)",
      artist: "Justin Bieber",
      plays: "1.2B plays",
      album: "Justice",
      explicit: true,
      image: "from-yellow-400 to-green-400"
    },
    {
      title: "Swim",
      artist: "Chase Atlantic",
      plays: "534M plays",
      album: "Chase Atlantic",
      explicit: true,
      image: "from-red-600 to-black"
    },
    {
      title: "Lose My Mind [From F1® The Movie] (feat. Doja Cat)",
      artist: "Don Toliver",
      plays: "137M plays",
      album: "Lose My Mind [From F1® ...]",
      explicit: false,
      image: "from-orange-500 to-yellow-600"
    },
    {
      title: "Hà Nội",
      artist: "Obito, Shiki & VSTRA",
      plays: "49M plays",
      album: "Đánh Đổi",
      explicit: false,
      image: "from-blue-400 to-cyan-300"
    },
    {
      title: "Moth To A Flame",
      artist: "Swedish House Mafia & Th...",
      plays: "",
      album: "Dawn FM (Alternate Wo...",
      explicit: false,
      image: "from-blue-900 to-purple-900"
    },
    {
      title: "Still With You",
      artist: "Jung Kook",
      plays: "141M plays",
      album: "Still With You",
      explicit: false,
      image: "from-blue-500 to-indigo-600"
    },
    {
      title: "CHANEL",
      artist: "Tyla",
      plays: "19M plays",
      album: "CHANEL",
      explicit: true,
      image: "from-pink-300 to-white"
    },
    {
      title: "Agora Hills",
      artist: "Doja Cat",
      plays: "388M plays",
      album: "Scarlet",
      explicit: true,
      image: "from-gray-100 to-gray-300"
    },
    // Additional items for carousel demonstration
    {
      title: "Anti-Hero",
      artist: "Taylor Swift",
      plays: "900M plays",
      album: "Midnights",
      explicit: false,
      image: "from-purple-400 to-pink-400"
    },
    {
      title: "Flowers",
      artist: "Miley Cyrus",
      plays: "1.5B plays",
      album: "Endless Summer Vacation",
      explicit: false,
      image: "from-pink-500 to-rose-500"
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      plays: "2.1B plays",
      album: "Harry's House",
      explicit: false,
      image: "from-sky-400 to-blue-500"
    },
    {
      title: "Calm Down",
      artist: "Rema & Selena Gomez",
      plays: "800M plays",
      album: "Rave & Roses",
      explicit: false,
      image: "from-green-400 to-teal-400"
    },
    {
      title: "Kill Bill",
      artist: "SZA",
      plays: "950M plays",
      album: "SOS",
      explicit: true,
      image: "from-red-400 to-orange-400"
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      explicit: true,
      image: "from-gray-800 to-gray-900"
    },
    {
      title: "Unholy",
      artist: "Sam Smith & Kim Petras",
      plays: "700M plays",
      album: "Gloria",
      explicit: true,
      image: "from-red-500 to-black"
    },
    {
      title: "Snooze",
      artist: "SZA",
      plays: "450M plays",
      album: "SOS",
      explicit: false,
      image: "from-blue-300 to-indigo-400"
    },
    {
      title: "vampire",
      artist: "Olivia Rodrigo",
      plays: "650M plays",
      album: "GUTS",
      explicit: false,
      image: "from-purple-600 to-indigo-700"
    },
    {
      title: "greedy",
      artist: "Tate McRae",
      plays: "400M plays",
      album: "THINK LATER",
      explicit: false,
      image: "from-emerald-400 to-teal-500"
    },
    {
      title: "Paint The Town Red",
      artist: "Doja Cat",
      plays: "850M plays",
      album: "Scarlet",
      explicit: true,
      image: "from-red-600 to-rose-700"
    },
    {
      title: "cruel summer",
      artist: "Taylor Swift",
      plays: "1.8B plays",
      album: "Lover",
      explicit: false,
      image: "from-pink-400 to-blue-400"
    },

  ];

  // Group items column by column (4 items per column)
  let html = '<div class="quick-picks-page flex-shrink-0 grid grid-rows-4 gap-x-4 gap-y-2" style="grid-auto-flow: column;">';

  picks.forEach((pick, index) => {
    html += `
      <div class="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer transition-all duration-300 group">
        <div class="w-16 h-16 bg-gradient-to-br ${pick.image} rounded flex-shrink-0"></div>
        <div class="flex-1 min-w-0">
          <h3 class="text-white text-base font-normal truncate mb-1">${pick.title}</h3>
          <div class="flex items-center gap-2 text-sm text-white/60">
            ${pick.explicit ? '<span class="bg-white/60 text-black text-xs font-bold px-1 rounded">E</span>' : ''}
            <span class="truncate">${pick.artist}${pick.plays ? ' • ' + pick.plays : ''}${pick.album ? ' • ' + pick.album : ''}</span>
          </div>
        </div>
        <button class="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <i class="fa-solid fa-play text-white text-xl"></i>
        </button>
      </div>
    `;

    // After every 12 items (3 cols × 4 rows), start a new grid page
    if ((index + 1) % 12 === 0 && index !== picks.length - 1) {
      html += '</div><div class="quick-picks-page flex-shrink-0 grid grid-rows-4 gap-x-4 gap-y-2 ml-4" style="grid-auto-flow: column;">';
    }
  });

  html += '</div>';
  return html;
}

function generateAlbums() {
  const albums = [
    { title: "Midnight Dreams", artist: "The Weeknd" },
    { title: "Summer Vibes", artist: "Calvin Harris" },
    { title: "Neon Lights", artist: "Dua Lipa" },
    { title: "Golden Hour", artist: "JVKE" },
    { title: "Starboy", artist: "The Weeknd" },
  ];

  return albums.map(album => `
    <div class="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded mb-4 relative overflow-hidden">
        <button class="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <i class="fa-solid fa-play text-black"></i>
        </button>
      </div>
      <h3 class="text-white font-semibold truncate">${album.title}</h3>
      <p class="text-white/60 text-sm truncate">${album.artist}</p>
    </div>
  `).join('');
}

function generateTodayHits() {
  const albums = [
    {
      title: "The Hit List",
      subTitle: "KPop Demon Hunters Cast, Tate McRae, Sabrina Carpenter, Morgan Wallen",
      image: todayHitImageOne
    },
    {
      title: "K-HITLIST",
      subTitle: "IVE, aespa, BABYMONSTER, i-dle",
      image: todayHitImageTwo
    },
    {
      title: "Bollywood Hitlist",
      subTitle: "Amitabh Bhattacharya, Arijit Singh, Sachin-Jigar, Tanishk Bagchi",
      image: todayHitImageThree
    },
    {
      title: "NEON: Pop Hits",
      subTitle: "Tate McRae, Taylor Swift, Zara Larsson, Demi Lovato",
      image: todayHitImageFour
    },
    {
      title: "Tollywood Hitlist",
      subTitle: "Anirudh Ravichander, Thaman S, Krishna Kanth, M. M. Keeravaani",
      image: todayHitImageFive
    },
    {
      title: "K.ING",
      subTitle: "aespa, IVE, LE SSERAFIM, NewJeans",
      image: todayHitImageSix
    },
    {
      title: "Chroma: Today's Dance Hits",
      subTitle: "David Guetta, Tiësto, Martin Garrix, Hayla",
      image: todayHitImageSeven
    },
    {
      title: "Noise Riot: Rock Hits",
      subTitle: "Falling In Reverse, YUNGBLUD, Bad Omens, Poppy",
      image: todayHitImageEight
    },
    {
      title: "J-Hits!",
      subTitle: "Mrs. GREEN APPLE, Kenshi Yonezu, HANA, natori",
      image: todayHitImageNine
    },
    {
      title: "Heavy Stereo: Indie Rock",
      subTitle: "Sam Fender, The Charlatans, Wolf Alice, Mumford & Sons",
      image: todayHitImageTen
    },
  ];

  return albums.map(album => `
    <div class="carousel-item flex-shrink-0 w-[200px] rounded-md p-1 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded mb-4 relative overflow-hidden">
        <img src="${album.image}" alt="${album.title}" class="w-full h-full object-cover">

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        <div>
          <button class="absolute bottom-2 right-2 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer hover:bg-black/80 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-play text-white text-xl"></i>
          </button>

          <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-whiteopacity-0 group-hover:opacity-100 shadow-lg rounded-full cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-ellipsis-vertical text-white text-md"></i>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-white text-base font-semibold truncate cursor-pointer hover:underline">${album.title}</h3>
        <p class="text-white/60 text-base font-light truncate">${album.subTitle}</p>
      </div>
    </div>
  `).join('');
}

function generateAlbumsForYou() {
  const albums = [
    {
      title: "Ruby",
      subTitle: "Album • JENNIE",
      image: albumsForYouImageOne
    },

    {
      title: "KPop Demon Hunters(Soundtrack from the Netflix Film)",
      subTitle: "Album • KPop Demon",
      image: albumsForYouImageTwo
    },
    {
      title: "Dear Min",
      subTitle: "Album • MIN",
      image: albumsForYouImageThree
    },
    {
      title: "Nine Track Mind(Japan Special Edition)",
      subTitle: "Album • Charlie Puth",
      image: albumsForYouImageFour
    },
    {
      title: "Starboy",
      subTitle: "Album • The Weeknd",
      image: albumsForYouImageFive
    },
    {
      title: "KPop Demon Hunters(Soundtrack from the Netflix Film)",
      subTitle: "Album • KPop Demon",
      image: albumsForYouImageSeven
    },
    {
      title: "Gieo",
      subTitle: "Album • Ngọt",
      image: albumsForYouImageEight
    },
    {
      title: "m-tp M-TP",
      subTitle: "Album • Sơn Tùng M-TP",
      image: albumsForYouImageNine
    },
    {
      title: "YOSHO HAI MONTAGEM",
      subTitle: "Album • Torbahed, ZODIVK & BLOK3",
      image: albumsForYouImageTen
    },
  ];

  return albums.map(album => `
    <div class="carousel-item flex-shrink-0 w-[200px] rounded-md p-1 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded mb-4 relative overflow-hidden">
        <img src="${album.image}" alt="${album.title}" class="w-full h-full object-cover">

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        <div>
          <button class="absolute bottom-2 right-2 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer hover:bg-black/80 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-play text-white text-xl"></i>
          </button>

          <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-whiteopacity-0 group-hover:opacity-100 shadow-lg rounded-full cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-ellipsis-vertical text-white text-md"></i>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-white text-base font-semibold truncate cursor-pointer hover:underline">${album.title}</h3>
        <p class="text-white/60 text-base font-light truncate">${album.subTitle}</p>
      </div>
    </div>
  `).join('');
}


function generateListenAgain() {
  const items = [
    { title: "Indie Mix", artist: "Your personal mix" },
    { title: "Daily Mix 1", artist: "Pop & Rock" },
    { title: "Daily Mix 2", artist: "Electronic" },
    { title: "Discover Weekly", artist: "Your weekly mixtape" },
    { title: "Release Radar", artist: "New music friday" },
  ];

  return items.map(item => `
    <h3 class="text-white text-2xl font-semibold mb-4">Listen again</h3>
    <div class="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-orange-500 to-red-500 rounded mb-4 relative overflow-hidden">
        <button class="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <i class="fa-solid fa-play text-black"></i>
        </button>
      </div>
      <h3 class="text-white font-semibold truncate">${item.title}</h3>
      <p class="text-white/60 text-sm truncate">${item.artist}</p>
    </div>
  `).join('');
}

function getHelloMessage() {
  return dateTimeUtils.getHelloMessage();
}

function tellUsWhichArtistsYouLikeImage() {
  return `
    <div class="basis-2/3">
      <img src="${tellUsWhichArtistsYouLikeImageOne}" alt="Tell us which artists you like"
        class="w-[80%] object-cover object-center block mx-auto">
    </div>
  `;
}


// Initialize carousel navigation
export function initCarouselTodayHits() {
  const carousel = document.getElementById('carousel-today-hits');
  const prevTodayHitsButton = document.getElementById('carousel-prev-today-hits');
  const nextTodayHitsButton = document.getElementById('carousel-next-today-hits');

  if (!carousel || !prevTodayHitsButton || !nextTodayHitsButton) return;

  // Calculate exact width of one item (including gap)
  const getItemWidth = () => {
    const items = carousel.querySelectorAll('.carousel-item');
    if (items.length < 2) return carousel.clientWidth / 5;

    // Get position of first and second items
    const firstItem = items[0];
    const secondItem = items[1];

    if (firstItem && secondItem) {
      const firstRect = firstItem.getBoundingClientRect();
      const secondRect = secondItem.getBoundingClientRect();
      // Distance between start of item 1 and start of item 2 (includes gap)
      return Math.abs(secondRect.left - firstRect.left);
    }

    // Fallback: divide visible width by 5
    return carousel.clientWidth / 5;
  };

  prevTodayHitsButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextTodayHitsButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Update button states based on scroll position
  const updateButtonStates = () => {
    const isAtStart = carousel.scrollLeft === 0;
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;

    prevTodayHitsButton.style.opacity = isAtStart ? '0.3' : '1';
    prevTodayHitsButton.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

    nextTodayHitsButton.style.opacity = isAtEnd ? '0.3' : '1';
    nextTodayHitsButton.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
  };

  carousel.addEventListener('scroll', updateButtonStates);
  updateButtonStates(); // Initial state
}

export function initCarouselQuickPicks() {
  const carousel = document.getElementById('carousel-quick-picks');
  const prevButton = document.getElementById('carousel-prev-quick-picks');
  const nextButton = document.getElementById('carousel-next-quick-picks');

  if (!carousel || !prevButton || !nextButton) return;

  // Calculate exact width of one column (including gap)
  const getColumnWidth = () => {
    const items = carousel.querySelectorAll('.quick-picks-page > div');
    if (items.length < 4) return carousel.clientWidth / 3;

    // Get position of first item in column 1 and first item in column 2
    const firstItem = items[0];
    const fifthItem = items[4]; // First item of second column (after 4 rows)

    if (firstItem && fifthItem) {
      const firstRect = firstItem.getBoundingClientRect();
      const fifthRect = fifthItem.getBoundingClientRect();
      // Distance between start of column 1 and start of column 2
      return Math.abs(fifthRect.left - firstRect.left);
    }

    // Fallback: divide by 3
    return carousel.clientWidth / 3;
  };

  prevButton.addEventListener('click', () => {
    const scrollAmount = getColumnWidth();
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextButton.addEventListener('click', () => {
    const scrollAmount = getColumnWidth();
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Update button states based on scroll position
  const updateButtonStates = () => {
    const isAtStart = carousel.scrollLeft === 0;
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;

    prevButton.style.opacity = isAtStart ? '0.3' : '1';
    prevButton.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

    nextButton.style.opacity = isAtEnd ? '0.3' : '1';
    nextButton.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
  };

  carousel.addEventListener('scroll', updateButtonStates);
  updateButtonStates(); // Initial state
}

export function initCarouselAlbumsForYou() {
  const carousel = document.getElementById('carousel-albums-for-you');
  const prevAlbumsForYouButton = document.getElementById('carousel-prev-albums-for-you');
  const nextAlbumsForYouButton = document.getElementById('carousel-next-albums-for-you');

  if (!carousel || !prevAlbumsForYouButton || !nextAlbumsForYouButton) return;

  // Calculate exact width of one item (including gap)
  const getItemWidth = () => {
    const items = carousel.querySelectorAll('.carousel-item');
    if (items.length < 2) return carousel.clientWidth / 5;

    // Get position of first and second items
    const firstItem = items[0];
    const secondItem = items[1];

    if (firstItem && secondItem) {
      const firstRect = firstItem.getBoundingClientRect();
      const secondRect = secondItem.getBoundingClientRect();
      // Distance between start of item 1 and start of item 2 (includes gap)
      return Math.abs(secondRect.left - firstRect.left);
    }

    // Fallback: divide visible width by 5
    return carousel.clientWidth / 5;
  };

  prevAlbumsForYouButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextAlbumsForYouButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Update button states based on scroll position
  const updateButtonStates = () => {
    const isAtStart = carousel.scrollLeft === 0;
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;

    prevAlbumsForYouButton.style.opacity = isAtStart ? '0.3' : '1';
    prevAlbumsForYouButton.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

    nextAlbumsForYouButton.style.opacity = isAtEnd ? '0.3' : '1';
    nextAlbumsForYouButton.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
  };

  carousel.addEventListener('scroll', updateButtonStates);
  updateButtonStates(); // Initial state
}

const Home = async () => {
  // Convert the HTML string to a template by evaluating it
  // This allows the ${...} placeholders in the HTML to work
  const templateFunction = new Function(
    'PlaylistTagsName',
    'generateQuickPicks',
    'generateAlbums',
    'generateTodayHits',
    'generateAlbumsForYou',
    'generateListenAgain',
    'getHelloMessage',
    'tellUsWhichArtistsYouLikeImage',
    `return \`${homeHtml}\`;`
  );

  return templateFunction(
    PlaylistTagsName,
    generateQuickPicks,
    generateAlbums,
    generateTodayHits,
    generateAlbumsForYou,
    generateListenAgain,
    getHelloMessage,
    tellUsWhichArtistsYouLikeImage,
  );
}

export default Home;
