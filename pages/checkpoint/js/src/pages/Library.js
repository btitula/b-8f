function Library() {
  return `
    <!-- Hero Section with Background -->
    <div class="hero-section relative -mt-4 -mx-4 px-20 pt-12 pb-32 bg-gradient-to-b from-pink-900/40 via-purple-900/30 to-transparent">
      <div class="relative z-10">
        <h1 class="text-5xl font-bold text-white mb-4 mt-8">Your Library</h1>
        <p class="text-white/60 text-lg">All your favorite music in one place</p>
      </div>
    </div>
    
    <!-- Library Content -->
    <div class="px-20 -mx-4">
      <div class="flex gap-4 mb-6">
        <button class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300">
          Playlists
        </button>
        <button class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300">
          Albums
        </button>
        <button class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300">
          Artists
        </button>
      </div>
      
      <div class="space-y-2">
        ${Array(20)
      .fill()
      .map(
        (_, i) => `
              <div class="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-300 group">
                <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex-shrink-0"></div>
                <div class="flex-1">
                  <p class="font-medium text-white">Playlist ${i + 1}</p>
                  <p class="text-sm text-white/50">Auto playlist • ${10 + i} songs</p>
                </div>
                <button class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <i class="fa-solid fa-play text-white text-xl"></i>
                </button>
              </div>
            `
      )
      .join('')}
      </div>
    </div>
    `;
}

export default Library;
