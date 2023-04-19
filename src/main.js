import './style.css';
import getMinutesAndSeconds from './util';
import { musicList } from './list';

let image = document.getElementById('image');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let audio = document.getElementById('audio');
let currentTime = document.getElementById('current-time');
let duration = document.getElementById('duration');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let play = document.getElementById('play');
let progress = document.getElementById('progress')
let progressContainer = document.getElementById('progress-container');

let index = 0;
let isPlayed = false;
let actualIndex;
let music = musicList[index];
loadMusic(music);


function loadMusic(music) {
    artist.textContent = music.artist;
    title.textContent = music.title;
    image.setAttribute('src', music.image);
    audio.setAttribute('src', music.audio);
    isPlayed = false;
    play.classList.replace('fa-pause', 'fa-play')
    progress.style.width = 0;
}

audio.addEventListener('canplaythrough', () => {
    const [minutes, seconds] = getMinutesAndSeconds(audio.duration)
    duration.textContent = `${minutes}:${seconds}`
})

next.addEventListener('click', () => {
    index++;
    actualIndex = index % musicList.length;
    music = musicList[actualIndex];
    loadMusic(music);
})

prev.addEventListener('click', () => {
    index--;
    if (index < 0) index = musicList.length;
    actualIndex = index % musicList.length;
    music = musicList[actualIndex];
    loadMusic(music);
})

play.addEventListener('click', () => {
    if (!isPlayed) {
        audio.play();
        play.classList.replace('fa-play', 'fa-pause');
        isPlayed = true;
    } else {
        audio.pause();
        play.classList.replace('fa-pause', 'fa-play');
        isPlayed = false;
    }
})

audio.addEventListener('timeupdate', () => {
    const [minutes, seconds] = getMinutesAndSeconds(audio.currentTime);
    currentTime.textContent = `${minutes}:${seconds}`
    progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
})

progressContainer.addEventListener('click', (e) => {
    const percent = e.offsetX / progressContainer.clientWidth;
    audio.currentTime = audio.duration * percent
    progress.style.width = `${e.offsetX}px`;
})

