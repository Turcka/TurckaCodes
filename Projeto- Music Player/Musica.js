const songName = document.getElementById ("song-name"); 
const artistName = document.getElementById ("artist-name");
const cover = document.getElementById("cover"); 
const song = document.getElementById("audio");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentbar = document.getElementById("current-bar");
const progresscontainer = document.getElementById("progress-container");
const shufflebutton = document.getElementById("shuffle");
const repeatbutton = document.getElementById("repeat");
const songtime = document.getElementById("song-time");
const totaltime = document.getElementById("total-time");
const likebutton = document.getElementById("Like")

const AstroNauta = { 
    songName : ("Astro Nauta"),
    artistName: ("JayA Luuck"),
    file: ("Astro Nauta"),
    likeOn: false,
};
const Lonely = { 
    songName: ("Lonely"),
    artistName: ("Akon"),
    file: ("Lonely"),
    likeOn: false, 
};
const Leaveitallbehind = { 
    songName: ("Leave it all behind"),
    artistName: ("Cult To Follow"),
    file: ("Leave it all behind"),
    likeOn: false, 
};

const Playlist = JSON.parse(localStorage.getItem('Playlist')) ?? [AstroNauta, Lonely, Leaveitallbehind];
let sortedPlaylist = [...Playlist];
let index = 0; 
let isplaying = false;
let isShuffled = false;
let repeatOn = false;
let likeOn = false;  

function Playsong(){
    play.querySelector('.bi').classList.remove("bi-play-circle")
    play.querySelector('.bi').classList.add("bi-pause-circle")
    song.play();
    isplaying = true; 
}

function Pausesong(){
    play.querySelector('.bi').classList.remove("bi-pause-circle")
    play.querySelector('.bi').classList.add("bi-play-circle")
    song.pause(); 
    isplaying = false;
}

function playpausedecider(){
    if(isplaying === true){ 
        Pausesong();
    }
    else{ 
        Playsong();
    }
}

function loadingsong() { 
    cover.src = `Imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `Musicas/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName
    artistName.innerText = sortedPlaylist[index].artistName
    likeclicked(); 
}

function previoussong(){ 
    if(index === 0){ 
        index = sortedPlaylist.length - 1; 
    }
    else{ 
        index -= 1;
    }
    loadingsong();
    Playsong();
}

function nextsong(){ 
    if(index === sortedPlaylist.length - 1){ 
        index = 0; 
    }
    else{ 
        index += 1;
    }
    loadingsong();
    Playsong();
}

function progress(){ 
    const barwidth = (song.currentTime/song.duration)*100; 
    currentbar.style.setProperty("--progress", `${barwidth}%`);
    songtime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo (event){ 
    const width = progresscontainer.clientWidth; 
    const clickposition = event.offsetX; 
    const jumptotime = (clickposition/width)*song.duration; 
    song.currentTime = jumptotime;

}

function shuffleArray(preshuffleArray) { 
    const size = preshuffleArray.length; 
    let currentindex = size - 1; 
    while(currentindex > 0){ 
        let randomindex = Math.floor(Math.random()*size);
        let aux = preshuffleArray[currentindex];
        preshuffleArray[currentindex] = preshuffleArray [randomindex]; 
        preshuffleArray[randomindex] = aux; 
        currentindex -= 1; 
    }
    
}

function shufflebuttonclicked(){ 
    if (isShuffled === false) { 
        isShuffled = true; 
        shuffleArray (sortedPlaylist);
        shufflebutton.classList.add("button-active");
    
    }
    else { 
        isShuffled = false; 
        sortedPlaylist = [...Playlist];
        shufflebutton.classList.remove("button-active");
    }
}

function repeatbuttonclicked(){ 
    if ( repeatOn === false) { 
        repeatOn = true; 
        repeatbutton.classList.add("button-active");
    }
    else { 
        repeatOn = false;
        repeatbutton.classList.remove("button-active"); 
    }


}

function nextOrRepeat(){ 
    if(repeatOn === false){ 
        nextsong(); 
    }
    else{ 
        Playsong(); 
    }

} 

function toHHMMSS(originalNumber) { 
    let hours = Math.floor(originalNumber/3600); 
    let min = Math.floor((originalNumber - hours*3600)/60);
    let secs = Math.floor(originalNumber - hours*3600 - min*60);

    return`${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;

}

function updateTotalTime(){ 
    totaltime.innerText = toHHMMSS(song.duration);
}

function likeclicked(){ 
    if(sortedPlaylist[index].likeOn === false){ 
        sortedPlaylist[index].likeOn = true; 
        likebutton.querySelector('.bi').classList.remove("bi-heart");
        likebutton.querySelector('.bi').classList.add("bi-heart-fill");
    }
    else{ 
        sortedPlaylist[index].likeOn = false; 
        likebutton.querySelector('.bi').classList.remove("bi-heart-fill");
        likebutton.querySelector('.bi').classList.add("bi-heart");
    }
    localStorage.setItem('Playlist', JSON.stringify(Playlist));

}

loadingsong(); 

play.addEventListener("click", playpausedecider); 
previous.addEventListener("click", previoussong );
next.addEventListener("click", nextsong);
song.addEventListener("timeupdate", progress);
song.addEventListener("ended", nextOrRepeat); 
song.addEventListener("loadedmetadata", updateTotalTime);
progresscontainer.addEventListener("click", jumpTo);
shufflebutton.addEventListener("click", shufflebuttonclicked); 
repeatbutton.addEventListener("click", repeatbuttonclicked);
likebutton.addEventListener("click", likeclicked);
