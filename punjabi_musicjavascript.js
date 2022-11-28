let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Tenu Lehenga",
    artist: " Jass Manak & Tanishk Bagchi",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113580/146285-tenu-lehenga-satyameva-jayate-2-mp3-song-300.jpg",
    path: "https://pwdown.info/113580/Tenu Lehenga - Satyameva Jayate 2.mp3"
  },
  {
    name: "Bijlee Bijlee",
    artist: "Harrdy Sandhu & B Praak",
    image: "https://m.media-amazon.com/images/M/MV5BZjNkMTQwZjAtMWZiMi00MDIxLTgxY2MtOWIxY2ViZjc2N2FlXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_.jpg",
    path: "https://pwdown.info/113515/Bijlee Bijlee - Harrdy Sandhu.mp3"
  },
  {
    name: "No Competition",
    artist: "Jass Manak & Divine",
    image: "https://www.pagalworld.us/_big/no-competition-2020-jass-manak-250.jpg",
    path: "https://cdn.pagalworld.us/songs/new/192/No Competition - Jass Manak.mp3"
  },
  {
    name: "MADE IN INDIA",
    artist: "Guru Randhawa",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/14286/116288-made-in-india-guru-randhawa-mp3-song-300.jpg",
    path: "https://pwdown.info/14286/Made In India - Guru Randhawa.mp3"
  },
  {
    name: "Lahore",
    artist: "Guru Randhawa",
    image: "https://c-fa.cdn.smule.com/rs-s77/arr/44/ef/ee08a2f3-8a01-49d0-85be-ba1500d610c3_1024.jpg",
    path: "https://pwdown.info/12944/Lahore - Guru Randhawa 190Kbps.mp3"
  },
  {
    name: "Ishare Tere",
    artist: "Guru Randhawa & Dhvani Bhanushali",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/14405/116754-ishare-tere-guru-randhawa-mp3-song-2-300.jpg",
    path: "https://pwdown.info/14405/Ishare Tere - Guru Randhawa.mp3"
  },
  {
    name: "High Rated Gabru",
    artist: "Guru Randhawa",
    image: "https://i.scdn.co/image/ab67616d0000b2737ea5a422c7cae22626a36893",
    path: "https://pwdown.info/11735/High Rated Gabru - Guru Randhawa 320Kbps.mp3"
  },
  {
    name: "Satisfya ",
    artist: "Aish",
    image: "https://sdlhivkecdnems04.cdnsrv.jio.com/c.saavncdn.com/545/AiSh-Volume-1-Gujarati-2020-20200727145736-500x500.jpg",
    path: "https://pwdown.info/113510/Satisfya Female Version - Aish.mp3"
  },
  {
    name: "Pasoori",
    artist: "Shae Gill & Ali Sethi",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113604/148772-pasoori-mp3-song-300.jpg",
    path: "https://pwdown.info/113604/Pasoori - Shae Gill.mp3"
  },
  {
    name: "Besharam Bewaffa",
    artist: "B Praak & Jaani",
    image: "https://i.scdn.co/image/ab67616d0000b2730aae50bd60a67fff992fec86",
    path: "https://pwdown.info/113507/Besharam Bewaffa - B Praak.mp3"
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


