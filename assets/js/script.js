const reset = document.querySelector('#reset');
const quit = document.querySelector('#quit');
let rollButton = document.querySelector('#roll');
let max = document.querySelector('#max-points');
let myChance = document.querySelector('#chances');
let dice = document.querySelectorAll('img');
let win = document.querySelector('#win');
let next = document.querySelector('#next-roll');
let btn = document.createElement("button");

let images = ['./assets/img/dice-01.svg',
'./assets/img/dice-02.svg',
'./assets/img/dice-03.svg',
'./assets/img/dice-04.svg',
'./assets/img/dice-05.svg',
'./assets/img/dice-06.svg'];

const winningMusic = new Audio('./assets/winning.wav');
const losingMusic = new Audio('./assets/tryagain.wav');
const congrats = new Audio('./assets/congrats.wav');
const gameOver = new Audio('./assets/gameeover.wav');

let dieOneValue;
let dieTwoValue;
let chances = 10;
let points = 0;
let pointsGained = 100;
let deductedPoints = 50;
let maxPoints = 600;

myChance.textContent = `You have ${chances} chances`;
max.textContent = `Try your luck and reach ${maxPoints} points?`;

//Roll the dice
rollButton.addEventListener('click', function(){
    //add roll animation to the img element 
    dice.forEach(function(die){
        die.classList.add('roll');
    });
    setTimeout(function(){
           //remove roll animation to the img element
        dice.forEach(function(die){
            die.classList.remove('roll');
        });
        dieOneValue = randomize();
        dieTwoValue = randomize();

        console.log(dieOneValue,dieTwoValue);
        //pick the index of the image based on the randomized number 
        document.querySelector('#die-1').setAttribute('src', images[dieOneValue]);//add image to the element after the roll with the id of die-1
        document.querySelector('#die-2').setAttribute('src', images[dieTwoValue]);//add image to the element after the roll with the id of die-2
        
        document.querySelector('#chances').innerHTML = `Chances: ${chances - 1}`;
        document.querySelector('#points').innerHTML = `Points: ${points}`;  
            //this block of code is for the checking of chances
        checkWinningCondition();
        checkChances();
    },
    600
    ); 
});

//refresh the page within 1.5 seconds
reset.addEventListener('click', function(){
    //reset confirmation
    let okReset = confirm('Do you want to reset the game?');
    if (okReset){
        setTimeout('location.reload(true);',1500);
            
        }
});

// redirect to index.html for 1 second
quit.addEventListener('click', function(){
    let okQuit = confirm('Are you sure you want to Exit?');
    if(okQuit){
    setTimeout(`window.location = 'index.html';`,200);
    }

});  

btn.addEventListener('click', function(){
    let okNext = confirm('Do you want to go to the next level?');
    if(okNext){
    setTimeout(`window.location = 'nextlvl.html';`,200);
    }

}); 
//randomize numbers from 0 - 5
function randomize(){
    return Math.floor( Math.random() * 6);
}

//check the winning conditions
function checkWinningCondition(){
    if(dieOneValue == dieTwoValue){
        points += pointsGained;
        win.textContent = `Congrats you won ${pointsGained} points`;
        next.textContent = `points will be added after the next roll`;
        maximumPoints();
        winningMusic.play();
        document.getElementById('win').style.color = 'green';
    }
    else{
        win.textContent = `Try Again!!!`;
        next.textContent = '  ';
        chances = chances - 1;
        losingMusic.play();
        document.getElementById('win').style.color = 'red';
    }  
}

//check if there are chances left
function checkChances(){
 //if chances is lesser than 0 this code will be executed
    if(chances < 0){
        alert('You do not have enough chances');
        if (confirm('Do you want to add chances?') == true) {
            document.querySelector('#chances').innerHTML = `Chances: ${chances}`;
            checkPoints();
        } 
        else {
            chances = 0;
            next.textContent = '  ';
            document.querySelector('#points').style.display = 'none';
            rollButton = document.querySelector('#roll').style.display = 'none'; // will hide the roll button 
            document.querySelector('#chances').innerHTML = `Total Points: ${points}`;
            document.querySelector('#win').style.display = 'none'; 

        }
    }
}

//check if there are enough points left to add chances
function checkPoints(){
    //if points is greater or equal than deductedPoints this code will be executed
    if(points >= deductedPoints){
        //each time you add chances 50 points will be deducted from your current points
        points -= deductedPoints;
        chances = 8;
        document.querySelector('#chances').innerHTML = `Chances: ${chances}`;
        win.textContent = `${deductedPoints} points will be deducted`;
        next.textContent = 'after the next roll';
        document.getElementById('win').style.color = 'red';
    
    }
    //if point is lesser than  50 this code will be executed
    else{
        chances = 0;
        document.querySelector('#chances').innerHTML = `Chances: ${chances}`;
        win.textContent = `Sorry`;
        next.textContent = `you don't have enough points to add chances`;
        gameOver.play();
        rollButton = document.querySelector('#roll').style.display = 'none'; // will hide the roll button 
    }
}

//check if the maximum points is reached
function maximumPoints(){
    if(points >= maxPoints){
        next.textContent = `Congrats!! you have reached the maximum points`;
        document.querySelector('#points').style.display = 'none';
        rollButton = document.querySelector('#roll').style.display = 'none'; // will hide the roll button 
        document.querySelector('#chances').innerHTML = `Congrats you hit the highest points: ${points}`;
        document.querySelector('#win').style.display = 'none';
        document.getElementById('next-roll').style.color = 'green';
        congrats.play();
        btn.innerHTML = 'Next Level';
        document.body.appendChild(btn);
    }
    else{
        chances = chances - 1;
    }
}