class MusicPlayer {
  constructor() {
    this.audio = null;
    this.playBtn = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.progressContainer = null;
    this.progress = null;
    this.currentTimeEl = null;
    this.durationTimeEl = null;
    this.songTitleEl = null;
    this.songCoverEl = null;
    this.musicBar = null;
    this.isPlaying = false;
    this.currentSong = null;
    this.currentPlayingCard = null;
  }

  // Initialize the player with DOM elements
  init() {
    this.audio = document.getElementById('audio');
    this.playBtn = document.getElementById('play-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.progressContainer = document.getElementById('progress-container');
    this.progress = document.getElementById('progress');
    this.currentTimeEl = document.getElementById('current-time');
    this.durationTimeEl = document.getElementById('duration-time');
    this.songTitleEl = document.getElementById('song-title');
    this.songCoverEl = document.getElementById('song-cover');
    this.musicBar = document.getElementById('music-bar');

    if (!this.audio) {
      console.error('Audio element not found');
      return;
    }

    this.setupEventListeners();
  }

  // Set up all event listeners
  setupEventListeners() {
    // Play/Pause button
    this.playBtn?.addEventListener('click', () => {
      this.isPlaying ? this.pause() : this.play();
    });

    // Progress bar click
    this.progressContainer?.addEventListener('click', (e) => {
      this.setProgress(e);
    });

    // Audio events
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.updateDuration();
    });

    this.audio.addEventListener('ended', () => {
      this.pause();
    });
  }

  // Load a song
  loadSong(songData) {
    this.currentSong = songData;
    this.audio.src = songData.file;
    this.songCoverEl.src = songData.image;
    this.songTitleEl.textContent = songData.title || 'Unknown Song';
    this.updateDuration();

    // Show music bar when a song is loaded
    if (this.musicBar) {
      this.musicBar.classList.remove('hidden');
    }
  }

  // Play the song
  play() {
    this.audio.play();
    this.isPlaying = true;
    this.updatePlayButton();

    if (this.songCoverEl) {
      this.songCoverEl.classList.add('rotating');
    }

    // Re-add animation to the currently playing card
    if (this.currentPlayingCard) {
      this.currentPlayingCard.classList.add('today-hit-playing');

      // Show stop button and hide play button
      const playButton = this.currentPlayingCard.querySelector('.play-button');
      const stopButton = this.currentPlayingCard.querySelector('.stop-button');

      if (playButton && stopButton) {
        playButton.classList.add('hidden');
        stopButton.classList.remove('hidden');
      }
    }
  }

  // Pause the song
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();

    if (this.songCoverEl) {
      this.songCoverEl.classList.remove('rotating');
    }

    // Remove animation from the currently playing card
    if (this.currentPlayingCard) {
      this.currentPlayingCard.classList.remove('today-hit-playing');

      // Reset play/stop buttons
      const playButton = this.currentPlayingCard.querySelector('.play-button');
      const stopButton = this.currentPlayingCard.querySelector('.stop-button');

      if (playButton && stopButton) {
        playButton.classList.remove('hidden');
        stopButton.classList.add('hidden');
      }
    }
  }

  // Update play/pause button icon
  updatePlayButton() {
    const icon = this.playBtn?.querySelector('i');
    if (!icon) return;

    if (this.isPlaying) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
    } else {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
  }

  // Update progress bar
  updateProgress() {
    const { duration, currentTime } = this.audio;
    if (!duration) return;

    const progressPercent = (currentTime / duration) * 100;
    this.progress.style.width = `${progressPercent}%`;

    // Update current time display
    this.currentTimeEl.textContent = this.formatTime(currentTime);
  }

  // Update duration display
  updateDuration() {
    const { duration } = this.audio;
    if (!duration || isNaN(duration)) {
      this.durationTimeEl.textContent = '00:00';
      return;
    }
    this.durationTimeEl.textContent = this.formatTime(duration);
  }

  // Set progress when clicking on progress bar
  setProgress(e) {
    const width = this.progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = this.audio.duration;
    this.audio.currentTime = (clickX / width) * duration;
  }

  // Format time in MM:SS
  formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

// Create a global instance
const musicPlayer = new MusicPlayer();

export default musicPlayer;