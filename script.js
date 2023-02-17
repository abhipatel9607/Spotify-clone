let songs=[
    {songname:'Koun Tujhe - M.S.Dhoni', filePath:'songs/1.mp3', coverPath:'covers/1.jpg'},
    {songname:'Tum Hi Ho - Aashiqui 2', filePath:'songs/2.mp3', coverPath:'covers/2.jpg'},
    {songname:'Main Yahaan Hoon - Veer Zaara', filePath:'songs/3.mp3', coverPath:'covers/3.jpg'},
    {songname:'Rasiya - Brahmāstra', filePath:'songs/4.mp3', coverPath:'covers/4.jpg'},
    {songname:'Raanjhana Ve', filePath:'songs/5.mp3', coverPath:'covers/5.jpg'},
    {songname:'Dua Ban Ja - Akhil Sachdeva', filePath:'songs/6.mp3', coverPath:'covers/6.jpg'},
    {songname:'Dhunde Akhiyan - Jabariya Jodi', filePath:'songs/7.mp3', coverPath:'covers/7.jpg'},
    {songname:'Aawara Shaam Hai', filePath:'songs/8.mp3', coverPath:'covers/8.jpg'},
    {songname:'Labon Pe Naam - Radhe Shyam', filePath:'songs/9.mp3', coverPath:'covers/9.jpg'},
    {songname:'Rabba - Heropanti', filePath:'songs/10.mp3', coverPath:'covers/10.jpg'},
    //{songname:'Tu Maan Meri Jaan - King', filePath:'songs/11.mp3', coverPath:'covers/11.jpg'},
    //{songname:'Do Pal - Veer Zaara', filePath:'songs/12.mp3', coverPath:'covers/12.jpg'},
    //{songname:'Main Yahaan Hoon - Veer Zaara', filePath:'songs/13.mp3', coverPath:'covers/13.jpg'},
    //{songname:'Humko Dewana Kar Gye', filePath:'songs/13.mp3', coverPath:'covers/13.jpg'},
]

// Initialise the Variables
let songIndex=1;
let audioElement=new Audio('songs/1.mp3')
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let songItem=document.getElementById('songItem')
let songItemContainer=document.querySelector('.songItemContainer')
let previous=document.getElementById('previous')
let next=document.getElementById('next')
let masterSongName=document.getElementById('masterSongName')

// Initialise the Functions
function makeAllPlays(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}
function defaltChangesWithClick(){
    audioElement.src =`songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play(); 
    gif.style.opacity=1
   masterPlay.classList.remove('fa-play-circle')
   masterPlay.classList.add('fa-pause-circle')
   masterSongName.innerText=songs[songIndex-1].songname
}

// Create Song Container/Item
songItemContainer.innerHTML=''
songs.forEach((e,i)=>{
    const html = `<div id="songItem">
    <img src="./covers/${i+1}.jpg" alt="${i+1}">
    <span class="songName">${e.songname}</span>
    <i id='${i+1}' class="far songItemPlay fa-play-circle"></i>
</div>`;
    songItemContainer.insertAdjacentHTML('beforeend', html);
})
 

// Handle MasterPlay button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity=1
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    }else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity=0
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle')
    }
    
})

// listen timeupdate event
audioElement.addEventListener('timeupdate',()=>{
    // Update Seek bar
let progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
myProgressBar.value=progress

    // update AutoNext Play
if(audioElement.currentTime===audioElement.duration){
    if(songIndex==songs.length){
        songIndex=1
    }else{
        songIndex=songIndex+1
    }
    defaltChangesWithClick()
    makeAllPlays()
}
})


myProgressBar.addEventListener('change',()=>{
     audioElement.currentTime=((myProgressBar.value*audioElement.duration)/100)
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays()
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        songIndex=parseInt(e.target.id)
        defaltChangesWithClick()
    })
})

// Handle Next/Privious button
previous.addEventListener('click',()=>{
    if(songIndex===1){
        songIndex=songs.length
    }else{
        songIndex=songIndex-1
    }
    defaltChangesWithClick()
    makeAllPlays()
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
})

next.addEventListener('click',()=>{
    if(songIndex===songs.length){
        songIndex=1
    }else{
        songIndex=songIndex+1
    }
    defaltChangesWithClick()
    makeAllPlays()
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
})
