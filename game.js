var userClickPattern=[];
var started=false;
var level=0;
var userChosenColour;
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
function nextSequence()
{
    $("h1").html("Level "+level);
	var randomNumber=Math.floor(Math.random()*4);
	var randomChosenColour=buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
	level++;

}
$(".btn").click(function(){userChosenColour=this.id;
userClickPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickPattern.length-1);
});
function playSound(name)
{
	var sound=new Audio("sounds/"+name+".mp3");
	sound.play();
}
function animatePress(currentColour)
{
	$("#"+currentColour).addClass("pressed");
	setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}
$(document).keypress(function(){
	if(started===false){
		nextSequence();started=true;
		
	}
});
function checkAnswer(currentlevel){
	if(gamePattern[currentlevel]===userClickPattern[currentlevel])
	{
        console.log("success");
      if(gamePattern.length==userClickPattern.length)
      {
      	setTimeout(function(){nextSequence();},1000);
      	userClickPattern=[];
      }
}
else{
	var sound=new Audio("sounds/wrong.mp3");
	sound.play();
	$("body").addClass("game-over");
	setTimeout(function(){$("body").removeClass("game-over");},200);
	$("h1").html("Game over. Press any key to restart");
	level=0;
	started=false;
	userClickPattern=[];
	gamePattern=[];
	
}

}