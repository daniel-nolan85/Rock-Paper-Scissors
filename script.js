// save username to session storage
let userName;
let userNameRetrieve = sessionStorage.getItem('yourName');
let retrievedName = JSON.parse(userNameRetrieve);
if (null != retrievedName)
    userName = retrievedName;

// prompt user for their name
if (typeof userName === "undefined") {
    userName = prompt('What is your name?');
    alert('Hello ' + userName);
    document.getElementById('name').innerHTML = userName; // attach username to scoreboard
    sessionStorage.setItem('yourName', JSON.stringify(userName));
} 
else {
    document.getElementById('name').innerHTML = userName;
}

let rock = document.querySelector('#rock').onclick = userChoice;
let paper = document.querySelector('#paper').onclick = userChoice;
let scissors = document.querySelector('#scissors').onclick = userChoice;
let choice;
let botChoice;
let playAgain = document.querySelector('#replay');

// Init score
let score = {
    'wins': 0,
    'losses': 0,
    'draws': 0,
}
// Get the saved score.
let jsonString = sessionStorage.getItem('score');
let retrievedObject = JSON.parse(jsonString);

// If there is a saved score, update the score variable.
if (null != retrievedObject) {
    score = retrievedObject;
    $("#wins").text(score.wins);
    $("#losses").text(score.losses);
    $("#draws").text(score.draws);
}

// click button to refresh the page
playAgain.addEventListener('click', restart);

// display image for user choice and remove others
function userChoice() {
    if (this.id === 'rock') {
        choice = 'r';
        $('#paper, #scissors').addClass('hide');
        $('#rock').css({'box-shadow': '0px 20px 50px 0px rgba(50, 50, 200, 1)'});
        $('#replay').removeClass('hide');
        $('#scorecard').addClass('hide');
        computerChoice();
        decideWinner();
    } else if (this.id === 'paper') {
        choice = 'p';
        $('#rock, #scissors').addClass('hide');
        $('#paper').css({'float': 'left', 'box-shadow': '0px 20px 50px 0px rgba(50, 50, 200, 1)'});
        $('#replay').removeClass('hide');
        $('#scorecard').addClass('hide');
        computerChoice();
        decideWinner();
    } else if (this.id === 'scissors') {
        choice = 's';
        $('#rock, #paper').addClass('hide');
        $('#scissors').css({'float': 'left', 'box-shadow': '0px 20px 50px 0px rgba(50, 50, 200, 1)'});
        $('#replay').removeClass('hide');
        $('#scorecard').addClass('hide');
        computerChoice();
        decideWinner();
    } 
}

// computer selects choice at random
function computerChoice() {
    botChoice = Math.floor(Math.random() * 3);
    if (botChoice === 0) {
        $('#botrock').removeClass('hide');
    } else if (botChoice === 1) {
        $('#botpaper').removeClass('hide');
    } else if (botChoice === 2) {
        $('#botscissors').removeClass('hide');
    }
}

// show player choices, display outcome and update score 
function decideWinner() {
    if (choice === 'r' && botChoice === 0) {
        $('#tie').removeClass('hide');
        score['draws']++;
        document.querySelector('#draws').textContent = score['draws'];
    } else if (choice === 'r' && botChoice === 1) {
        $('#lose').removeClass('hide');
        score['losses']++;
        document.querySelector('#losses').textContent = score['losses'];
    } else if (choice === 'r' && botChoice === 2) {
        $('#win').removeClass('hide');
        score['wins']++;
        document.querySelector('#wins').textContent = score['wins'];
    } else if (choice === 'p' && botChoice === 0) {
        $('#win').removeClass('hide');
        score['wins']++;
        document.querySelector('#wins').textContent = score['wins'];
    } else if (choice === 'p' && botChoice === 1) {
        $('#tie').removeClass('hide');
        score['draws']++;
        document.querySelector('#draws').textContent = score['draws'];
    } else if (choice === 'p' && botChoice === 2) {
        $('#lose').removeClass('hide');
        score['losses']++;
        document.querySelector('#losses').textContent = score['losses'];
    } else if (choice === 's' && botChoice === 0) {
        $('#lose').removeClass('hide');
        score['losses']++;
        document.querySelector('#losses').textContent = score['losses'];
    } else if (choice === 's' && botChoice === 1) {
        $('#win').removeClass('hide');
        score['wins']++;
        document.querySelector('#wins').textContent = score['wins'];
    } else if (choice === 's' && botChoice === 2) {
        $('#tie').removeClass('hide');
        score['draws']++;
        document.querySelector('#draws').textContent = score['draws'];
    } 
    console.log(score);
    sessionStorage.setItem('score', JSON.stringify(score));
}

// refresh the page to play again
function restart() {
    window.location.reload();
}