import PlaylistTags from "../../components/PlaylistTags";
import authSevice from "../../service/authSevice";
import { dateTimeUtils } from "@/utils/dateTime";
import homeHtml from "./home.html?raw";

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
    { title: "Hit List", artist: "Demon Slayers Cast, Tate..." },
    { title: "K-HITLIST", artist: "IVE, aespa, BABYMONSTER" },
    { title: "Bollywood Hitlist", artist: "Amitabh Bhattacharya" },
    { title: "NEON: Pop Hits", artist: "Tate McRae, Taylor Swift" },
    { title: "Tollywood Hitlist", artist: "Anirudh Ravichander" },
    { title: "K.ING", artist: "aespa, IVE, LE SSERAFIM" },
    { title: "Chill Vibes", artist: "Various Artists" },
    { title: "Summer Hits 2024", artist: "Top Artists" },
    { title: "Workout Energy", artist: "Fitness Beats" },
    { title: "Evening Relaxation", artist: "Calm Sounds" },
    { title: "Party Mix", artist: "DJ Collection" },
    { title: "Focus Flow", artist: "Instrumental" },
  ];

  return albums.map(album => `
    <div class="carousel-item flex-shrink-0 w-[200px] bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded mb-4 relative overflow-hidden">
        <button class="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <i class="fa-solid fa-play text-black"></i>
        </button>
      </div>
      <h3 class="text-white font-semibold text-sm truncate">${album.title}</h3>
      <p class="text-white/60 text-xs truncate">${album.artist}</p>
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
