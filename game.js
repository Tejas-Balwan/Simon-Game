var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
})

$(document).on("tap", function(event){
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
  playSound(randomChosenColour);
}

function playSound (sound){
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  // $("#" + currentColour).delay(100);
  // $("#" + currentColour).removeClass("pressed");
  setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
              $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
