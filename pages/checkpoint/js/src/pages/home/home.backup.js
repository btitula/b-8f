import { dateTimeUtils } from "@/utils/dateTime";
import homeHtml from "./home.html?raw";


import menuRightClickPlayNextSvg from "@/assets/images/home/menuRightClick/playNext.svg?raw";
import menuRightClickAddToQueueSvg from "@/assets/images/home/menuRightClick/addToQueue.svg?raw";
import menuRightClickAddToLikedSongsSvg from "@/assets/images/home/menuRightClick/addToLikedSongs.svg?raw";
import menuRightClickSaveToPlaylistSvg from "@/assets/images/home/menuRightClick/saveToPlaylist.svg?raw";
import menuRightClickShareSvg from "@/assets/images/home/menuRightClick/share.svg?raw";
import menuRightClickNotInterestedSvg from "@/assets/images/home/menuRightClick/notInterested.svg?raw";
import menuRightClickStartMixSvg from "@/assets/images/home/menuRightClick/startMix.svg?raw";

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

import quickPicksImageOne from "@/assets/images/home/quickPicks/unnamed_7.jpg"
import quickPicksImageTwo from "@/assets/images/home/quickPicks/unnamed_8.jpg"
import quickPicksImageThree from "@/assets/images/home/quickPicks/unnamed_9.jpg"
import quickPicksImageFour from "@/assets/images/home/quickPicks/unnamed_10.jpg"
import quickPicksImageFive from "@/assets/images/home/quickPicks/unnamed_11.jpg"
import quickPicksImageSix from "@/assets/images/home/quickPicks/unnamed_12.jpg"
import quickPicksImageSeven from "@/assets/images/home/quickPicks/unnamed_13.jpg"
import quickPicksImageEight from "@/assets/images/home/quickPicks/unnamed_14.jpg"
import quickPicksImageNine from "@/assets/images/home/quickPicks/unnamed_15.jpg"
import quickPicksImageTen from "@/assets/images/home/quickPicks/unnamed_16.jpg"
import quickPicksImageEleven from "@/assets/images/home/quickPicks/unnamed_17.jpg"
import quickPicksImageTwelve from "@/assets/images/home/quickPicks/unnamed_18.jpg"
import quickPicksImageThirteen from "@/assets/images/home/quickPicks/unnamed_19.jpg"
import quickPicksImageFourteen from "@/assets/images/home/quickPicks/unnamed_20.jpg"
import quickPicksImageFifteen from "@/assets/images/home/quickPicks/unnamed_21.jpg"
import quickPicksImageSixteen from "@/assets/images/home/quickPicks/unnamed_22.jpg"
import quickPicksImageSeventeen from "@/assets/images/home/quickPicks/unnamed_23.jpg"
import quickPicksImageEighteen from "@/assets/images/home/quickPicks/unnamed_24.jpg"
import quickPicksImageNineteen from "@/assets/images/home/quickPicks/unnamed_25.jpg"
import quickPicksImageTwenty from "@/assets/images/home/quickPicks/unnamed_26.jpg"
import quickPicksImageTwentyOne from "@/assets/images/home/quickPicks/unnamed_27.jpg"
import quickPicksImageTwentyTwo from "@/assets/images/home/quickPicks/unnamed_28.jpg"
import quickPicksImageTwentyThree from "@/assets/images/home/quickPicks/unnamed_29.jpg"
import quickPicksImageTwentyFour from "@/assets/images/home/quickPicks/unnamed_30.jpg"
import quickPicksImageTwentyFive from "@/assets/images/home/quickPicks/unnamed_31.jpg"
import quickPicksImageTwentySix from "@/assets/images/home/quickPicks/unnamed_32.jpg"

import trendingCommunityPlaylistImageOne from "@/assets/images/home/trendingCommunityPlaylists/unnamed_1.jpg"
import trendingCommunityPlaylistImageTwo from "@/assets/images/home/trendingCommunityPlaylists/unnamed_2.jpg"
import trendingCommunityPlaylistImageThree from "@/assets/images/home/trendingCommunityPlaylists/unnamed_3.jpg"
import trendingCommunityPlaylistImageDotOne from "@/assets/images/home/trendingCommunityPlaylists/dot_1.jpg"
import trendingCommunityPlaylistImageDotTwo from "@/assets/images/home/trendingCommunityPlaylists/dot_2.jpg"
import trendingCommunityPlaylistImageDotThree from "@/assets/images/home/trendingCommunityPlaylists/dot_3.jpg"


import newMusicVideoImageOne from "@/assets/images/home/newMusicVideosForYou/unnamed_1.jpg"
import newMusicVideoImageTwo from "@/assets/images/home/newMusicVideosForYou/unnamed_2.jpg"
import newMusicVideoImageThree from "@/assets/images/home/newMusicVideosForYou/unnamed_3.jpg"
import newMusicVideoImageFour from "@/assets/images/home/newMusicVideosForYou/unnamed_4.jpg"
import newMusicVideoImageFive from "@/assets/images/home/newMusicVideosForYou/unnamed_5.jpg"
import newMusicVideoImageSix from "@/assets/images/home/newMusicVideosForYou/unnamed_6.jpg"
import newMusicVideoImageSeven from "@/assets/images/home/newMusicVideosForYou/unnamed_7.jpg"
import newMusicVideoImageEight from "@/assets/images/home/newMusicVideosForYou/unnamed_8.jpg"
import newMusicVideoImageNine from "@/assets/images/home/newMusicVideosForYou/unnamed_9.jpg"
import newMusicVideoImageTen from "@/assets/images/home/newMusicVideosForYou/unnamed_10.jpg"

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
      image: quickPicksImageOne
    },
    {
      title: "Swim",
      artist: "Chase Atlantic",
      plays: "534M plays",
      album: "Chase Atlantic",
      image: quickPicksImageTwo
    },
    {
      title: "Lose My Mind [From F1® The Movie] (feat. Doja Cat)",
      artist: "Don Toliver",
      plays: "137M plays",
      album: "Lose My Mind [From F1® ...]",
      image: quickPicksImageThree
    },
    {
      title: "Hà Nội",
      artist: "Obito, Shiki & VSTRA",
      plays: "49M plays",
      album: "Đánh Đổi",
      image: quickPicksImageFour
    },
    {
      title: "Moth To A Flame",
      artist: "Swedish House Mafia & Th...",
      plays: "",
      album: "Dawn FM (Alternate Wo...",
      image: quickPicksImageFive
    },
    {
      title: "Still With You",
      artist: "Jung Kook",
      plays: "141M plays",
      album: "Still With You",
      image: quickPicksImageSix
    },
    {
      title: "CHANEL",
      artist: "Tyla",
      plays: "19M plays",
      album: "CHANEL",
      image: quickPicksImageSeven
    },
    {
      title: "Agora Hills",
      artist: "Doja Cat",
      plays: "388M plays",
      album: "Scarlet",
      image: quickPicksImageEight
    },
    // Additional items for carousel demonstration
    {
      title: "Anti-Hero",
      artist: "Taylor Swift",
      plays: "900M plays",
      album: "Midnights",
      image: quickPicksImageNine
    },
    {
      title: "Flowers",
      artist: "Miley Cyrus",
      plays: "1.5B plays",
      album: "Endless Summer Vacation",
      image: quickPicksImageTen
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      plays: "2.1B plays",
      album: "Harry's House",
      image: quickPicksImageEleven
    },
    {
      title: "Calm Down",
      artist: "Rema & Selena Gomez",
      plays: "800M plays",
      album: "Rave & Roses",
      image: quickPicksImageTwelve
    },
    {
      title: "Kill Bill",
      artist: "SZA",
      plays: "950M plays",
      album: "SOS",
      image: quickPicksImageThirteen
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageFourteen
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      plays: "2.1B plays",
      album: "Harry's House",
      image: quickPicksImageFifteen
    },
    {
      title: "Calm Down",
      artist: "Rema & Selena Gomez",
      plays: "800M plays",
      album: "Rave & Roses",
      image: quickPicksImageSixteen
    },
    {
      title: "Kill Bill",
      artist: "SZA",
      plays: "950M plays",
      album: "SOS",
      image: quickPicksImageSeventeen
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageEighteen
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      plays: "2.1B plays",
      album: "Harry's House",
      image: quickPicksImageNineteen
    },
    {
      title: "Calm Down",
      artist: "Rema & Selena Gomez",
      plays: "800M plays",
      album: "Rave & Roses",
      image: quickPicksImageTwenty
    },
    {
      title: "Kill Bill",
      artist: "SZA",
      plays: "950M plays",
      album: "SOS",
      image: quickPicksImageTwentyOne
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageTwentyTwo
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageTwentyThree
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageTwentyFour
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageTwentyFive
    },
    {
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd",
      plays: "600M plays",
      album: "Heroes & Villains",
      image: quickPicksImageTwentySix
    },
  ];

  // Group items column by column (4 items per column)
  let html = '<div class="quick-picks-page flex-shrink-0 grid grid-rows-4 gap-x-6 gap-y-3" style="grid-auto-flow: column;">';

  picks.forEach((pick, index) => {
    html += `
      <div class="max-w-64 text-white flex items-center gap-4 rounded-md cursor-pointer group relative hover:bg-white/5 transition-colors duration-200">
        <div class="w-14 h-14 rounded flex-shrink-0 relative overflow-hidden">
          <img src="${pick.image}" alt="${pick.title}" class="w-full h-full object-cover rounded">

          <!-- Play button overlay on image -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-200 flex items-center justify-center">
            <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
              <i class="fa-solid fa-play text-black text-base ml-0.5"></i>
            </button>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class=" w-full relative hover:bg-black transition-all duration-300">
            <h3 class="text-white text-base font-medium truncate mb-1">${pick.title}</h3>
            <div class="flex items-center gap-2 text-sm text-white/60">
              <span class="truncate">${pick.artist}</span>
            </div>  
          </div>

          <!-- Hover Overlay -->
          <!-- <div class="absolute inset-0 group-hover:bg-black/10 transition-all duration-300"></div> -->

          <div class="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 hover:bg-black/90 px-2">
            <button class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-white/20 transition-colors duration-150">
              <i class="fa-regular fa-thumbs-up text-white text-lg"></i>
            </button>
            <button class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-white/20 transition-colors duration-150">
              <i class="fa-regular fa-thumbs-down text-white text-lg"></i>
            </button>
            <button class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-white/20 transition-colors duration-150">
              <i class="fa-solid fa-ellipsis-vertical text-white text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // After every 12 items (3 cols × 4 rows), start a new grid page
    if ((index + 1) % 12 === 0 && index !== picks.length - 1) {
      html += '</div><div class="quick-picks-page flex-shrink-0 grid grid-rows-4 gap-x-6 gap-y-3 ml-6" style="grid-auto-flow: column;">';
    }
  });

  html += '</div>';
  return html;
}

function generateTrendingCommunityPlaylists() {
  const trendingCommunityPlaylists = [
    {
      title: "VN mUSIC",
      artist: "Nguyễn Minh Hoàng",
      image: trendingCommunityPlaylistImageOne,
      dot: trendingCommunityPlaylistImageDotOne
    },
    {
      title: "nhạc",
      artist: "Hằng Hoàng",
      image: trendingCommunityPlaylistImageTwo,
      dot: trendingCommunityPlaylistImageDotTwo
    },
    {
      title: "Loáy coay kyem moai đồa",
      artist: "Lộc Thành",
      image: trendingCommunityPlaylistImageThree,
      dot: trendingCommunityPlaylistImageDotThree
    }
  ];

  return trendingCommunityPlaylists.map(trending => `
    <div class="carousel-item flex-shrink-0 w-[150px] rounded-md p-1 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square rounded mb-4 relative overflow-hidden">
        <img src="${trending.image}" alt="${trending.title}" class="w-full h-full object-cover">

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        <div>
          <button class="absolute bottom-2 right-2 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer hover:bg-black/80 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-play text-white text-xl"></i>
          </button>

          <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 shadow-lg rounded-full cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-ellipsis-vertical text-white text-md"></i>
          </button>
        </div>

        <div class="absolute bottom-2 left-2 w-6 h-6 rounded-full overflow-hidden border border-white/80">
          <img src="${trending.dot}" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-white text-base font-semibold truncate cursor-pointer hover:underline">${trending.title}</h3>
        <p class="text-white/60 text-base font-light truncate">${trending.artist}</p>
      </div>
    </div>

  `).join('');
}

function generateNewMusicVideosForYou() {
  const newMusicVideosForYou = [
    {
      id: 1,
      title: "Timeless",
      artist: "The Weeknd & Playboi Carti",
      views: "185M views",
      image: newMusicVideoImageOne
    },
    {
      id: 2,
      title: "We Don't Talk Anymore (feat. Selena Gomez)",
      artist: "Charlie Puth",
      views: "3.4B views",
      image: newMusicVideoImageTwo
    },
    {
      id: 3,
      title: "Hngle - KHÔNG BUÔNG ft.Ari",
      artist: "Hngle",
      views: "16M views",
      image: newMusicVideoImageThree
    },
    {
      id: 4,
      title: "Peaches(feat.Daniel Caesar & Giveon)",
      artist: "Justin Bieber",
      views: "825M views",
      image: newMusicVideoImageFour
    },
    {
      id: 5,
      title: "Phép Màu(Đàn Cá Gỗ OST)",
      artist: "MAYDAYs",
      views: "63M views",
      image: newMusicVideoImageFive
    },
    {
      id: 6,
      title: "Better",
      artist: "Khalid",
      views: "1.2B views",
      image: newMusicVideoImageSix
    },
    {
      id: 7,
      title: "luther",
      artist: "Kendrick Lamar & SZA",
      views: "46M views",
      image: newMusicVideoImageSeven
    },
    {
      id: 8,
      title: "Circles(Official Music Video)",
      artist: "Post Malone",
      views: "766M views",
      image: newMusicVideoImageEight
    },
    {
      id: 9,
      title: "Counting Stars",
      artist: "OneRepublic",
      views: "4.3B views",
      image: newMusicVideoImageNine
    },
    {
      id: 10,
      title: "Dusk Till Dawn(Official Video) (feat.Sia)",
      artist: "ZAYN",
      views: "2.3B views",
      image: newMusicVideoImageTen
    }
  ];

  return newMusicVideosForYou.map(musicVideo => `
    <div class="carousel-item flex-shrink-0 rounded-md p-1 cursor-pointer transition-all duration-300 group" id="new-music-video-${musicVideo.id}">
      <div class="aspect-square w-[320px] h-[180px] rounded mb-4 relative overflow-hidden">
        <img src="${musicVideo.image}" alt="${musicVideo.title}" class="w-full h-full object-fill">

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>

        <!-- Centered Play Button -->
        <div class="absolute inset-0 flex items-center justify-center">
          <button class="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-black/80 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-play text-white text-2xl ml-1"></i>
          </button>

          <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 shadow-lg rounded-full cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-ellipsis-vertical text-white text-md"></i>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-white text-base font-semibold truncate cursor-pointer hover:underline">${musicVideo.title}</h3>
        <p class="text-white/60 text-base font-light truncate">${musicVideo.artist}</p>
      </div>
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
    <div class="carousel-item flex-shrink-0 rounded-md p-1 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded mb-4 relative overflow-hidden">
        <img src="${album.image}" alt="${album.title}" class="w-full h-full object-cover">

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        <div>
          <button class="absolute bottom-2 right-2 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer hover:bg-black/80 hover:scale-110 transition-all duration-300">
            <i class="fa-solid fa-play text-white text-xl"></i>
          </button>

          <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 shadow-lg rounded-full cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
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

          <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 shadow-lg rounded-full cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
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

/**
 * 
 * @returns     <button class="flex items-center gap-2 text-white hover:text-blue-500 [&_svg]:w-5 [&_svg]:h-5">
      ${menuRightClickStartMixSvg}
    </button>
 */

function generateMenuRightClick() {
  return `
    <ul class="py-2 text-[15px] bg-[#232323] border-[0.5px] border-white/20 text-white font-light shadow-xl ring-1 ring-black/10 role="menu" aria-orientation="vertical">
      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickStartMixSvg}
          <p>Start mix</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickPlayNextSvg}
          <p>Play next</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickAddToQueueSvg}
          <p>Add to queue</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickAddToLikedSongsSvg}
          <p>Add to liked songs</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickSaveToPlaylistSvg}
          <p>Save to playlist</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickShareSvg}
          <p>Share</p>
        </span>
      </li>

      <li class="px-3 py-2 hover:bg-[#414141]/40 transition-all duration-100 flex items-center gap-3 cursor-pointer" data-action="remove"
        role="menuitem">
        <span class="flex items-center gap-2 text-white [&_svg]:w-5 [&_svg]:h-5">
          ${menuRightClickNotInterestedSvg}
          <p>Not interested</p>
        </span>
      </li>
    </ul>
  `
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

export function initCarouselNewMusicVideosForYou() {
  const carousel = document.getElementById('carousel-new-music-videos-for-you');
  const prevNewMusicVideosForYouButton = document.getElementById('carousel-prev-new-music-videos-for-you');
  const nextNewMusicVideosForYouButton = document.getElementById('carousel-next-new-music-videos-for-you');

  if (!carousel || !prevNewMusicVideosForYouButton || !nextNewMusicVideosForYouButton) return;

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

  prevNewMusicVideosForYouButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextNewMusicVideosForYouButton.addEventListener('click', () => {
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

    prevNewMusicVideosForYouButton.style.opacity = isAtStart ? '0.3' : '1';
    prevNewMusicVideosForYouButton.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

    nextNewMusicVideosForYouButton.style.opacity = isAtEnd ? '0.3' : '1';
    nextNewMusicVideosForYouButton.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
  };

  carousel.addEventListener('scroll', updateButtonStates);
  updateButtonStates(); // Initial state
}

export function initCarouselQuickPicks() {
  const carousel = document.getElementById('carousel-quick-picks');
  const prevButton = document.getElementById('carousel-prev-quick-picks');
  const nextButton = document.getElementById('carousel-next-quick-picks');

  if (!carousel || !prevButton || !nextButton) return;

  // Calculate width of one column (1/3 of visible container width)
  // Since we show 3 columns at a time, each column takes 1/3 of the space
  const getColumnWidth = () => {
    // Divide container width by 3 to get width of one column
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


const hideMenu = (contextMenu, contextTarget) => {
  contextMenu.classList.add('hidden');
  contextTarget?.classList.remove('bg-[#6a3ee6]');
  contextTarget = null;
}

const placeMenu = (contextMenu, x, y) => {
  // Đặt toạ độ ban đầu theo vị trí chuột
  contextMenu.style.left = x + 'px';
  contextMenu.style.top = y + 'px';
  contextMenu.classList.remove('hidden');
};


const Home = async () => {
  // Convert the HTML string to a template by evaluating it
  // This allows the ${...} placeholders in the HTML to work
  const templateFunction = new Function(
    'PlaylistTagsName',
    'generateQuickPicks',
    'generateTrendingCommunityPlaylists',
    'generateTodayHits',
    'generateAlbumsForYou',
    'generateListenAgain',
    'getHelloMessage',
    'tellUsWhichArtistsYouLikeImage',
    'generateNewMusicVideosForYou',
    'generateMenuRightClick',
    `return \`${homeHtml}\`;`
  );

  return templateFunction(
    PlaylistTagsName,
    generateQuickPicks,
    generateTrendingCommunityPlaylists,
    generateTodayHits,
    generateAlbumsForYou,
    generateListenAgain,
    getHelloMessage,
    tellUsWhichArtistsYouLikeImage,
    generateNewMusicVideosForYou,
    generateMenuRightClick,
  );
}

export default Home;
