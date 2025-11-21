function Explore() {
    const categories = [
        { name: "New releases", color: "from-red-500 to-orange-500" },
        { name: "Charts", color: "from-blue-500 to-cyan-500" },
        { name: "Moods & genres", color: "from-purple-500 to-pink-500" },
        { name: "Podcasts", color: "from-green-500 to-emerald-500" },
        { name: "Decades", color: "from-yellow-500 to-amber-500" },
        { name: "Live events", color: "from-indigo-500 to-blue-500" },
    ];

    return `
    <!-- Hero Section with Background -->
    <div class="hero-section relative -mt-4 -mx-4 px-20 pt-12 pb-32 bg-gradient-to-b from-green-900/40 via-teal-900/30 to-transparent">
      <div class="relative z-10">
        <h1 class="text-5xl font-bold text-white mb-4 mt-8">Explore</h1>
        <p class="text-white/60 text-lg">Discover new music, podcasts, and more</p>
      </div>
    </div>
    
    <!-- Explore Content -->
    <div class="px-20 -mx-4">
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-white mb-6">Browse all</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${categories.map(cat => `
            <div class="relative h-48 bg-gradient-to-br ${cat.color} rounded-lg cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div class="relative p-6">
                <h3 class="text-2xl font-bold text-white">${cat.name}</h3>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
      
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-white mb-6">Trending now</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          ${generateTrending()}
        </div>
      </section>
      
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-white mb-6">Popular playlists</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          ${generatePopularPlaylists()}
        </div>
      </section>
    </div>
    `;
}

function generateTrending() {
    const items = [
        { title: "Viral Hits", subtitle: "Top trending songs" },
        { title: "Breaking Artists", subtitle: "New talent" },
        { title: "Mood Booster", subtitle: "Feel good music" },
        { title: "Workout Beats", subtitle: "High energy" },
        { title: "Study Session", subtitle: "Focus music" },
    ];

    return items.map(item => `
    <div class="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-red-500 to-yellow-500 rounded mb-4 relative overflow-hidden">
        <button class="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <i class="fa-solid fa-play text-black"></i>
        </button>
      </div>
      <h3 class="text-white font-semibold truncate">${item.title}</h3>
      <p class="text-white/60 text-sm truncate">${item.subtitle}</p>
    </div>
  `).join('');
}

function generatePopularPlaylists() {
    const items = [
        { title: "Top 100", subtitle: "Global" },
        { title: "Jazz Classics", subtitle: "Timeless" },
        { title: "EDM Party", subtitle: "Electronic" },
        { title: "Acoustic Chill", subtitle: "Relaxing" },
        { title: "Hip Hop Hits", subtitle: "Rap & Hip Hop" },
    ];

    return items.map(item => `
    <div class="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 group">
      <div class="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded mb-4 relative overflow-hidden">
        <button class="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <i class="fa-solid fa-play text-black"></i>
        </button>
      </div>
      <h3 class="text-white font-semibold truncate">${item.title}</h3>
      <p class="text-white/60 text-sm truncate">${item.subtitle}</p>
    </div>
  `).join('');
}

export default Explore;
