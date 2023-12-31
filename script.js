console.log("Welcome to Spotify");


let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals (feat. Laura Brehm) [NCS Release]", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo – Huma-Huma (No Copyright Music)", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji - Heroes Tonight (feat. Johnning) [NCS Release]", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Muad - When Heaven Calls", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath:"songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath:"songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath:"songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath:"songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((element, i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerHTML = songs[i].songName;
    // element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});


masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime < 0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener("timeupdate",() =>{
    console.log("timeupdate");

    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);

    // console.log(progress)

    myProgressBar.value = progress;

    if(audioElement.currentTime == audioElement.duration){
        songIndex += 1;
        
        if(songIndex > 9){
            songIndex = 0;
        }
        
        
        
        path = "/" + "songs/" + (songIndex + 1) + ".mp3";
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = path;
        audioElement.play();
        gif.style.opacity = 1;
    }
    
})



myProgressBar.addEventListener("change",() =>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        console.log(e.target);
        currentSongPath = audioElement.currentSrc;
        currentSongTime = audioElement.currentTime;
        const isPlaying = !audioElement.paused;
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // console.log(songIndex);
        path = "/" + "songs/" + (songIndex + 1) + ".mp3";
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        // console.log(currentSongPath);
        // console.log(path);

        // currentSongPath = currentSongPath.slice(21);
        // console.log(currentSongPath);
        var url = new URL(currentSongPath);

// Get the protocol, hostname, and port
var protocol = url.protocol; // "http:"
var hostname = url.hostname; // "127.0.0.1"
var port = url.port;         // "5501"

// Construct the base URL
var baseUrl = protocol + "//" + hostname + (port ? ":" + port : "");

// console.log(baseUrl);
currentSongPath = currentSongPath.slice(21);
basePath = baseUrl + currentSongPath;
actualPath = baseUrl + path; 

console.log(basePath);
console.log(actualPath);

        if (basePath == actualPath) {
            if (!isPlaying) {
                audioElement.play();
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
                masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove("fa-circle-pause");
                e.target.classList.add("fa-circle-play");
                masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
                gif.style.opacity = 0;
            }
        } else {
            audioElement.src = path;
            audioElement.currentTime = 0;
            audioElement.play();
        }
    });
});


document.getElementById("next").addEventListener("click",()=>{
    if(songIndex == 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    path = "/" + "songs/"+(songIndex+1) + ".mp3";
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = path; // first set the new song
    audioElement.currentTime = 0;
    
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex == 0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    path =  "/" + "songs/"+(songIndex+1) + ".mp3";
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = path; // first set the new song
    audioElement.currentTime = 0;
    
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})