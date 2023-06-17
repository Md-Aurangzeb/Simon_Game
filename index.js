var buttonColours=['green','red','yellow','blue'];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
// cheacking key press 

$(document).on("keypress",function(e){
    if(started===false) {
        $("h1").text("level" + level);
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level " + level)
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    addAnimation(randomChosenColour);
}
function addAnimation(randomChosenColour){
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    },100);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        // any key press
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}