// Data Hewan
const allAnimals = [
    {name:"kucing", image:"k.JPG"}, {name:"anjing", image:"A.JPG"},
    {name:"gajah", image:"G.JPG"}, {name:"harimau", image:"H.JPG"},
    {name:"singa", image:"s.AVIF"}, {name:"kelinci", image:"K.WEBP"},
    {name:"jerapah", image:"J.JPG"}, {name:"zebra", image:"Z.JPG"},
    {name:"kuda", image:"D.WEBP"}, {name:"panda", image:"P.JPG"}
];

let level=1, maxLevel=3, usedAnimals=[], animalsThisLevel=[], timer, timeLeft=30, coins=0;

// Elements
const animal1Img = document.getElementById("animal1");
const animal2Img = document.getElementById("animal2");
const input = document.getElementById("guessInput");
const result = document.getElementById("result");
const timerText = document.getElementById("timer");
const clueButton = document.getElementById("clueButton");
const gameContainer = document.getElementById("gameContainer");
const gameOverScreen = document.getElementById("gameOver");
const gameCompletedScreen = document.getElementById("gameCompleted");
const coinDisplay = document.getElementById("coinDisplay");
const levelCircles = document.querySelectorAll(".level-circle");
const menu = document.getElementById("menu");

// Navigasi Menu
function startGame(){
    menu.style.display='none';
    gameContainer.style.display='block';
    startLevel();
}
function showInstructions(){
    alert("Cara Bermain:\n1. Tebak hewan.\n2. Gunakan petunjuk jika bingung.\n3. Kumpulkan koin dan selesaikan level!");
}
function restartGameToMenu(){
    level=1; usedAnimals=[]; coins=0;
    coinDisplay.textContent="Koinmu: "+coins;
    gameCompletedScreen.style.display='none';
    gameOverScreen.style.display='none';
    gameContainer.style.display='none';
    menu.style.display='block';
}

// Game Functions
function startLevel(){
    if(level>maxLevel){
        gameContainer.style.display='none';
        gameCompletedScreen.style.display='block';
        document.getElementById('finalCoins').textContent=coins;
        return;
    }
    levelCircles.forEach((c,i)=>c.classList.toggle("active",i===level-1));
    const availableAnimals=allAnimals.filter(a=>!usedAnimals.includes(a.name));
    animalsThisLevel=[];
    for(let i=0;i<2;i++){
        const idx=Math.floor(Math.random()*availableAnimals.length);
        const a=availableAnimals.splice(idx,1)[0];
        animalsThisLevel.push(a);
        usedAnimals.push(a.name);
    }
    animal1Img.src=animalsThisLevel[0].image;
    animal2Img.src=animalsThisLevel[1].image;
    animal1Img.classList.remove("revealed");
    animal2Img.classList.remove("revealed");
    input.value=""; result.textContent="";
    timeLeft=30; timerText.textContent="Waktu tersisa: "+timeLeft+" detik";
    clearInterval(timer); timer=setInterval(updateTimer,1000);
}
function updateTimer(){
    timeLeft--;
    timerText.textContent="Waktu tersisa: "+timeLeft+" detik";
    if(timeLeft<=0){ clearInterval(timer); gameContainer.style.display='none'; gameOverScreen.style.display='block'; }
}
function checkGuess(){
    const guess=input.value.trim().toLowerCase();
    if(!guess) return;
    let revealedAny=false;
    animalsThisLevel.forEach((a,i)=>{
        const imgEl=i===0?animal1Img:animal2Img;
        if(!imgEl.classList.contains("revealed") && guess===a.name){
            imgEl.classList.add("revealed");
            revealedAny=true;
            coins+=100; coinDisplay.textContent="Koinmu: "+coins;
        }
    });
    if(revealedAny){ result.textContent="🎉 Hebat! Kamu menang tantangan ini!"; }
    else{ result.textContent="Ups! Coba lagi 🐾"; }
    if(animal1Img.classList.contains("revealed") && animal2Img.classList.contains("revealed")){
        result.textContent="✅ Semua hewan ditebak! Tekan Level Berikutnya.";
    }
}
function nextLevel(){
    if(animal1Img.classList.contains("revealed") && animal2Img.classList.contains("revealed")){
        level++; startLevel();
    } else{ alert("Tebak semua hewan dulu sebelum lanjut!"); }
}
function buyClue(){
    if(coins>=50){ coins-=50; coinDisplay.textContent="Koinmu: "+coins;
        for(let i=0;i<animalsThisLevel.length;i++){
            const imgEl=i===0?animal1Img:animal2Img;
            if(!imgEl.classList.contains("revealed")){
                alert("Petunjuk: Hewan dimulai dengan huruf '"+animalsThisLevel[i].name[0].toUpperCase()+"'"); break;
            }
        }
    } else{ alert("Koinmu tidak cukup!"); }
}
