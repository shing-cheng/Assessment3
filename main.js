// elements in nowPlaying
const playngXOfY = document.getElementById("playngXOfY");
const trackImage = document.getElementById("trackImage");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");

// element in buttons
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// elements in slideBar
const timeCurrent = document.getElementById("timeCurrent");
const timeTotal = document.getElementById("timeTotal");
const timeContainer = document.getElementById("timeContainer");
const timeBar = document.getElementById("timeBar");
const volContainer = document.getElementById("volContainer");
const volBar = document.getElementById("volBar");

// element for audio
const currSong = document.getElementById("currSong");

// initial settings for global variable
let trackNum = 1
let isPlaying = false;

// list of songs
let trackList = [
    {
      name: "Ukulele",
      artist: "Benjamin Tissot",
      imageURL: "https://www.bensound.com/bensound-img/ukulele.jpg",
      mp3URL: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3"
    },
    {
      name: "Better Days",
      artist: "Benjamin Tissot",
      imageURL: "https://www.bensound.com/bensound-img/betterdays.jpg",
      mp3URL: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3"
    },
    {
      name: "Sunny",
      artist: "Benjamin Tissot",
      imageURL: "https://www.bensound.com/bensound-img/sunny.jpg",
      mp3URL: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
    },
  ];

// generate a random rgb colour string
function randomColour() {

    const hue = Math.floor(Math.random() * 361);
    return `hsl(${hue}, 75%, 75%)`
}

// update the track information, set audio source and change page background colour randomly
function updateTrack(num) {

    const index = num - 1;

    playngXOfY.textContent = `Playing ${num} of ${trackList.length}`;
    trackImage.src = trackList[index].imageURL;
    trackTitle.textContent = trackList[index].name;
    trackArtist.textContent = trackList[index].artist;

    currSong.src = trackList[index].mp3URL;

    document.body.style.background = randomColour();
}

function playSong() {
    isPlaying = true;
    currSong.play();
    // display pause button while playing
    playBtn.querySelector('i.fa').classList.remove('fa-play-circle');
    playBtn.querySelector('i.fa').classList.add('fa-pause-circle');
}

function pauseSong() {
    isPlaying = false;
    currSong.pause();
    // display play button while paused
    playBtn.querySelector('i.fa').classList.add('fa-play-circle');
    playBtn.querySelector('i.fa').classList.remove('fa-pause-circle');
}

function prevTrack() {
    if (trackNum <= 1) {
        trackNum = trackList.length;
    } else {
        trackNum--;
    }

    updateTrack(trackNum);
    playSong();
}

function nextTrack() {
    if (trackNum >= trackList.length) {
        trackNum = 1;
    } else {
        trackNum++;
    }

    updateTrack(trackNum);
    playSong();
}

function togglePlayPause() {

    // pause the song if it is currently playing it or play the song if it is currently paused
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}    

function convertMinSec(input) {

    if (isNaN(input)) {
        return '00:00';
    }

    const min = Math.floor(input / 60);
    const sec = Math.floor(input % 60);

    const minStr = (min < 10) ? `0${min}` : `${min}`;
    const secStr = (sec < 10) ? `0${sec}` : `${sec}`;

    return `${minStr}:${secStr}`;
}

function updateTime(event) {
    const {currentTime, duration} = event.srcElement;

    const strCurrent = convertMinSec(currentTime);
    const strDuration = convertMinSec(duration);

    timeCurrent.textContent = strCurrent;
    timeTotal.textContent = strDuration;

    const percent = currentTime/duration * 100;
    timeBar.style.width = `${percent}%`
}

function setProgress(event) {

    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = currSong.duration;

    currSong.currentTime = (clickX / width) * duration;
}

function setVol(event) {

    const width = this.clientWidth;
    const clickX = event.offsetX;

    const vol = clickX / width;
    currSong.volume = vol;

    const percent = vol * 100;
    volBar.style.width = `${percent}%`;
}

// start the player
updateTrack(trackNum);

// event listeners 
currSong.addEventListener('ended', nextTrack);
currSong.addEventListener('timeupdate', updateTime);

prevBtn.addEventListener('click', prevTrack);
playBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextTrack);

timeContainer.addEventListener('click', setProgress);
volContainer.addEventListener('click', setVol);
