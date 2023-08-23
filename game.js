//Setting parameters for the variables I will be using in my code
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Detects the first keypress to start the game
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level + "!")
        nextSequence();
        started = true;
    }
});

//Detects the users button press and checks to see if the correct color was pressed. Also adds animation and sound to the pressed button
$(".btn").click(function{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(randomChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

//Function used to check if the color that was pressed matches the random color generated
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedpattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

//Starts the trial over if the incorrect color was pressed
function startOver{
    level = 0;
    gamePattern = [];
    started = false;
}

//Resets the users clicked pattern and increases the game level before generating a new random sequence
function nextSequence{
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level + "!")

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

//Plays the sounds from the sounds folder based on the clicked color
function playSound(name) {
    var colorSound = new Audio ("sounds/" + name + ".mp3");
    colorSound.play();
}

//Changed the clicked colors animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout (function () {
        $("#" + cuttentColor).removeClass("pressed");
    }, 100);
}