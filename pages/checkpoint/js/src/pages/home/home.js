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
    { title: "Tạ Từ Cuối Ngày", artist: "Any Remix" },
    { title: "Chillout Lounge", artist: "Relaxing Vibes" },
    { title: "Today's Top Hits", artist: "Spotify" },
    { title: "RapCaviar", artist: "Hip-Hop" },
    { title: "All Out 2000s", artist: "2000s" },
    { title: "Rock Classics", artist: "Classic Rock" },
    { title: "Chill Hits", artist: "Chill" },
    { title: "Peaceful Piano", artist: "Peaceful" },
  ];

  return picks.map(pick => `
    <div class="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 group">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex-shrink-0"></div>
        <div class="flex-1 min-w-0">
          <h3 class="text-white font-semibold truncate">${pick.title}</h3>
          <p class="text-white/60 text-sm truncate">${pick.artist}</p>
        </div>
        <button class="opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="fa-solid fa-play text-white text-xl"></i>
        </button>
      </div>
    </div>
  `).join('');
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

function generateListenAgain() {
  const items = [
    { title: "Indie Mix", artist: "Your personal mix" },
    { title: "Daily Mix 1", artist: "Pop & Rock" },
    { title: "Daily Mix 2", artist: "Electronic" },
    { title: "Discover Weekly", artist: "Your weekly mixtape" },
    { title: "Release Radar", artist: "New music friday" },
  ];

  return items.map(item => `
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

// Initialize carousel navigation
export function initCarouselTodayHits() {
  const carousel = document.getElementById('carousel-today-hits');
  const prevTodayHitsButton = document.getElementById('carousel-prev-today-hits');
  const nextTodayHitsButton = document.getElementById('carousel-next-today-hits');

  if (!carousel || !prevTodayHitsButton || !nextTodayHitsButton) return;

  // Scroll amount (adjust based on how many items you want to scroll)
  const scrollAmount = 100; // Width of items + gap

  prevTodayHitsButton.addEventListener('click', () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextTodayHitsButton.addEventListener('click', () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Optional: Update button states based on scroll position
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

const Home = async () => {
  // Convert the HTML string to a template by evaluating it
  // This allows the ${...} placeholders in the HTML to work
  const templateFunction = new Function(
    'PlaylistTagsName',
    'generateQuickPicks',
    'generateAlbums',
    'generateTodayHits',
    'generateListenAgain',
    'getHelloMessage',
    `return \`${homeHtml}\`;`
  );

  return templateFunction(
    PlaylistTagsName,
    generateQuickPicks,
    generateAlbums,
    generateTodayHits,
    generateListenAgain,
    getHelloMessage
  );
}

export default Home;
