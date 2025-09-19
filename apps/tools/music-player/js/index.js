const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = [
  { name: "Birthday Thot", file: "brithday_thot.mp3" },
  { name: "Hay Ra Khoi Nguoi Do Di", file: "hay_ra_khoi_nguoi_do_di.mp3" },
  { name: "Mat Nai Cha Cha Cha", file: "mat_nai_cha_cha_cha.mp3" },
  { name: "That Bat Ngo", file: "that_bat_ngo.mp3" },
  { name: "Cay", file: "cay.mp3" },
  { name: "Het Mana", file: "het_mana.mp3" },
  { name: "Mlem Mlem", file: "mlem_mlem.mp3" },
  { name: "Thieu Nien", file: "thieu_nien.mp3" },
  { name: "Chi Anh Hieu Em", file: "chi_anh_hieu_em.mp3" },
  { name: "Hien Dai", file: "hien_dai.mp3" },
  { name: "Nang Chen Tieu Sau", file: "nang_chen_tieu_sau.mp3" },
  { name: "To All Of You", file: "to_all_of_you.mp3" },
  { name: "Friendship", file: "friendship.mp3" },
  { name: "Khoi Phai Make Up", file: "khoi_phai_make_up.mp3" },
  { name: "Ngay Dep Troi De Noi Chia Tay", file: "ngay_dep_troi_de_noi_chia_tay.mp3" },
  { name: "Tri Ky", file: "tri_ky.mp3" },
  { name: "Gap Nguoi Dung Luc", file: "gap_nguoi_dung_luc.mp3" },
  { name: "Le Luu Ly", file: "le_luu_ly.mp3" },
  { name: "Ngoi Hat Do Buon", file: "ngoi_hat_do_buon.mp3" },
  { name: "Tu Do", file: "tu_do.mp3" },
  { name: "Hai Muoi Hai", file: "hai_muoi_hai.mp3" },
  { name: "Mat Moc", file: "mat_moc.mp3" },
  { name: "Nguoi Ta Noi", file: "nguoi_ta_noi.mp3" },
  { name: "Yeu Em Tu Be", file: "yeu_em_tu_be.mp3" }
];

const images = ["sample_01.png", "sample_02.png", "sample_03.gif", "sample_04.png", "sample_05.gif", "sample_06.gif", "sample_07.gif"];


// Initially load song details into DOM
function loadRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function loadRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length);
  return randomIndex;
}

function loadSong(song) {
  let randomImage = loadRandomImage();
  console.log(`song: ${song}`);

  title.innerText = song.name;
  audio.src = `./music/${song.file}`;
  cover.src = `./images/${randomImage}`;
}

// let songIndex = songs.length - 1;
let songIndex = loadRandomSong();
loadSong(songs[songIndex]);

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

function nextSong() {
  songIndex++;
  songIndex = songIndex >= songs.length ? 0 : songIndex

  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  songIndex = songIndex < 0 ? songs.length - 1 : songIndex

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  // Check if the music is playing
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);