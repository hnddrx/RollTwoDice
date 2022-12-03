const reset = document.querySelector('#reset');
const quit = document.querySelector('#quit');
let rollButton = document.querySelector('#roll');
let max = document.querySelector('#max-points');
let myChance = document.querySelector('#chances');
let dice = document.querySelectorAll('img');
let win = document.querySelector('#win');
let next = document.querySelector('#next-roll');

let images = ['./assets/img/dice-01.svg',
'./assets/img/dice-02.svg',
'./assets/img/dice-03.svg',
'./assets/img/dice-04.svg',
'./assets/img/dice-05.svg',
'./assets/img/dice-06.svg'];

const winningMusic = new Audio('./assets/winning.wav');
const losingMusic = new Audio('./assets/tryagain.wav');
const congrats = new Audio('./assets/congrats.wav');
const gameOver = new Audio('./assets/gameover.wav');


let dieOneValue;
let dieTwoValue;
let dieThreeValue;
let chances = 10;
let points = 0;
let pointsGained = 100;
let deductedPoints = 20;
let maxPoints = 200;

myChance.textContent = `You have ${chances} chances`;
max.textContent = `If you reach ${maxPoints} points then you really are lucky`;

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
        dieThreeValue = randomize();

        console.log(dieOneValue,dieTwoValue,dieThreeValue);
        //pick the index of the image based on the randomized number 
        document.querySelector('#die-1').setAttribute('src', images[dieOneValue]);//add image to the element after the roll with the id of die-1
        document.querySelector('#die-2').setAttribute('src', images[dieTwoValue]);//add image to the element after the roll with the id of die-2
        document.querySelector('#die-3').setAttribute('src', images[dieThreeValue]);
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

//randomize numbers from 0 - 5
function randomize(){
    return Math.floor( Math.random() * 6);
}

//check the winning conditions
function checkWinningCondition(){
    if(dieOneValue == dieTwoValue && dieOneValue == dieThreeValue){
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
        rollButton = document.querySelector('#roll').style.display = 'none'; // will hide the roll button 
        gameOver.play();
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
    }
    else{
        chances = chances - 1;
    }
}