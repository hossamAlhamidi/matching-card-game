function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// varible
const deck = document.querySelector("#deck");
const stars = document.querySelectorAll("#heart li");
console.log(stars)
// const stars1 = document.getElementsByClassName("fa-star")
const moves = document.querySelector("#moves");
// const minTimer = document.querySelector(".min-timer");
// const secTimer = document.querySelector(".sec-timer");
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const cardToShuffle = document.querySelectorAll("#deck li");
let arr = Array.from(cardToShuffle)
let openCards = [];
let movesCounter = 0;
let timerOut = true;
let match = 0;
let time = 0;
let timerId = 0;

//function
reShuffle()


function validClick(click){
    
    return click.classList.contains("card")&&!click.classList.contains("match")&&!openCards.includes(click)&&openCards.length <2;
}
//==============================================
function toggleCard(card){
    card.classList.toggle("open");
    // card.classList.toggle("show");
}
//==============================================
function pushCard(card){
    openCards.push(card);
}
//==============================================
function addMove(){
    movesCounter++;
    moves.innerHTML = movesCounter +" moves ";
}
//==============================================
function resetMove(){
    movesCounter=0;
    moves.innerHTML = 0;
}
//==============================================
function removeStars(){
  
   for(let star of stars){
       if(star.style.display != "none"){
           star.style.display = "none";
           break;
       }
   }

  
}
//=========================
function resetStars(){
    for(let star of stars){
        if(star.style.display=="none"){
            star.style.display="inline"
        }
    }
}
//==============================================
function reShuffle(){
    
  let shuffled =  shuffle(arr);
  for(let item of shuffled){
       deck.appendChild(item);
    
  }
  deck.replaceChildren(...shuffled)
}
//==============================================
function resetMatch(){
    for(let item of deck.children){
        item.classList.remove("match","open","show")
    }
}
//==============================================
function resetGame(){
    stopTimer()
    resetMove();
    resetStars()
    resetMatch()
    reShuffle()
    match=0;
    openCards=[];
}
//==============================================
 function checkMatch(){
     console.log(openCards[0].children[0].className,"openCard");
    if(openCards[0].children[0].className === openCards[1].children[0].className){
     openCards[0].classList.add("match");
     openCards[1].classList.add("match");
     openCards = [];
     match++;

     if(match==8){
        setTimeout(() => {
            win()
        }, 1000); 
     }
    }
    else{

        setTimeout(()=>{
         toggleCard(openCards[0]);
         toggleCard(openCards[1]);
        
         openCards = [];
        },1000)
    }
   
}
 function win(){
    alert('win')
}

//==============================================
function timerCount(){
    
        let min = Math.floor(time/60);
        let sec = time%60;
        time++;
        if(sec <10){
          
            timer.innerHTML=`${min}:0${sec}`
        }
        else {
           
            timer.innerHTML=`${min}:${sec}`
        }
    
      
   
}
//==============================================
function initTime(){
timerOut = false;
timerId = setInterval(() => {
   
    timerCount();

}, 1000);
     

}
// ======================================
  function stopTimer(){
    timerOut = true;
    clearInterval(timerId);
    time=0;
    timerCount();
    
}


//==============================================
deck.addEventListener("click",(event)=>{
    target = event.target;
   if(validClick(target)){
       if(timerOut){
          initTime();
       }
    toggleCard(target);
    pushCard(target);

    if(openCards.length ==2){
        checkMatch();
        addMove();
        if(movesCounter==16 || movesCounter==24){
            removeStars();
        }
    }

   }

})

restart.addEventListener("click",resetGame);