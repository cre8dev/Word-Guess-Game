// Words list
var words = ["mushroom", "flower", "castle", "princess", "turtle", "star", "jump", "coin", "yoshi", "mario", "peach", "luigi", "plumber", "pipe", "cannon", "hammer"];

// creating variables
var word = "";
var wordGuess = "";
var answerArray = [];
var alphabets = [];
var remainingLetters = 0;
var remainingChances = 0;
var userAnswers = "";
var gameStatus = "";
var guessRight = false;
var displayAnswer = document.getElementById("answers");
var displayGuessed = document.getElementById("guesses");
var userHP = document.getElementById("user");
var comHP = document.getElementById("computer");
var endingGame = document.getElementById("message");

function reset() {
    // Choosing a random word
    word = words[Math.floor(Math.random() * words.length)];

    // Reset values
    answerArray = [];
    alphabets = [];
    wordGuess = "";
    userAnswers = "";
    remainingLetters = word.length;
    remainingChances = 0;
    guessRight = false;
    gameStatus = "ready";

    // Creating the answer array
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
        wordGuess += "_ ";
    }
    for (i = 0; i < 26; i++) {
        alphabets[i] = true;
    }

    // reset the screen
    displayAnswer.textContent = "";
    displayGuessed.textContent = "";
    userHP.textContent = "";
    comHP.textContent = "";
    endingGame.textContent = "";
    screenImg("url('./assets/images/start.jpg')");
}

function screenImg(imgURL) {
    document.getElementById("gb-screen").style.backgroundImage = imgURL;
}

// Display game status
function displayStatus() {
    displayAnswer.textContent = wordGuess;
    displayGuessed.textContent = userAnswers;
    userHP.textContent = remainingChances;
    comHP.textContent = remainingLetters;
}

reset();

// 'On key up' function
document.onkeyup = function (e) {

    var userInput = e.key;
    userInput = userInput.toLowerCase();
    var codeInput = userInput.charCodeAt(0);
    
    // Check the game status
    if (gameStatus === "ready") {
        if (userInput === "1") {
            screenImg("none");
            gameStatus = "start";
            remainingChances = 10;
            displayStatus();
        } else if (userInput === "2") {
            screenImg("none");
            gameStatus = "start";
            remainingChances = 7;
            displayStatus();
        }
    } else if (gameStatus === "end") {
        if (userInput === "enter") {
            displayAnswer.textContent = "";        displayGuessed.textContent = "";
            userHP.textContent = "";
            comHP.textContent = "";
            endingGame.textContent = "";
            screenImg("url('./assets/images/start.jpg')");
            reset();
        }
    }

    if (remainingLetters === 0 || remainingChances === 0) {
        return;
    }
    
    // Valid only 'a~z' letters only
    if (userInput.length === 1 && codeInput >= 97 && codeInput <= 122) {
        // Check the input key whether have been used or not
        if (alphabets[codeInput - 97]) {
            alphabets[codeInput - 97] = false;

            userAnswers = "";
            for (i = 0; i < 26; i++) {
                if (!alphabets[i]) {
                    userAnswers += "* ";
                } else {
                    userAnswers += String.fromCharCode(i+65) + " ";
                }
            }

            // Check with user input and the answer
            guessRight = false;
            for (i = 0; i < word.length; i++) {
                if (word[i] === userInput) {
                    guessRight = true;
                    answerArray[i] = userInput;
                    remainingLetters--;
                }
            }

            if (!guessRight) {
                remainingChances--;
            }

            wordGuess = "";
            for (var i = 0; i < answerArray.length; i++) {
                wordGuess += answerArray[i] + " ";
            }

            displayStatus();

            // Show ending
            if (remainingLetters === 0) {
                endingGame.textContent = "You won";
                gameStatus = "end";
            } else if (remainingChances === 0) {
                endingGame.textContent = "You lost";
                gameStatus = "end";
            }
        }
    }
}