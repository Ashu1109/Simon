var level = 0;
function reset(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    c = 0;
}

$("button").click(function(){
    reset();
    setTimeout(function(){nextSequence()},700);
});
// $(document).keypress(function () { 
//     reset();
//     setTimeout(function(){nextSequence()},700);
// });
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var  userClickedPattern = [];
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    press(randomChosenColour);
    $("h1").text("Level "+level);
    level +=1;
}
function press(color){
    //flash in
    $("#"+color).addClass("pressed");
    //sound of button
    soundPlay(color);
    //flash out
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },200);
}
function soundPlay(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
$(".btn").click(function () { 
    var  userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    press(userChosenColour);
    checkAnswer(userChosenColour);
});
var c = 0;
function checkAnswer(color){
    if(color !== gamePattern[c]){
        reset();
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        $("h1").text("Game Over, Press PLay to Restar");

    }
    if(color === gamePattern[gamePattern.length-1] && gamePattern.length === userClickedPattern.length){
        console.log("win");
        setTimeout(function(){
            nextSequence();
        },1000); 
        userClickedPattern = [];
        c = -1;
    }
    c++;
}
