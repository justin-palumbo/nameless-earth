var gb; //this game board
var $start_screen;

var printCoords=function(){ //used for testing
	var stringy="";
	for(var i in coords)
	{
		stringy=stringy+""+i+", ";
	};
	return stringy;
};
				
var DOWN_ARROW=40;
var UP_ARROW=38;
var LEFT_ARROW=37;
var RIGHT_ARROW=39;
var SPACE_BAR=32;
var ENTER=13;

var moveDir="R"; //the direction of movement
var defaultPieceSize=8; //the default size of a snake segment
var counter=0; //used to check random snake generation
var main_timer;
var score=0;
var snakeCheck = 100;  //Every this many cycles, attempt to generate a snake
var snakeProbability = .03; //Probability of generating a snake each attempt
var snakeMinSpeed = 60;
var snakeMaxSpeed = 120;
var borderHeight = 50;
var borderWidth = 63;

function startScreenWaiting(e){
	var screenOffset = $("#start_screen").offset();
	var code=e.keyCode;
	if(code==ENTER){
		$('body').off(); //stop listening for ENTER
		$start_screen.html(""); 
		gb=new game_board(screenOffset,borderHeight,borderWidth,defaultPieceSize,snakeMinSpeed,snakeMaxSpeed,snakeProbability);
		$('body').keydown(keyPressedHandler); //start listening for keyboard hits!!
		//alert(gb.score);
		main_timer=setInterval(
			function(){
				counter++;
				if (counter % snakeCheck == 0){
					gb.tryAddSnake();
			  }
				if(score!=gb.score){
					score=gb.score;
					$("#score_box").text(score);
				}
				if(gb.numSnakes()==0){
					clearInterval(main_timer);
					$('body').off(); //stop listening for presses
					setTimeout(
						function()
						{
							alert("you lose and your score was "+score);
							gb.kill();
							$initial_area=$("<div id='post_game'/>");
							$initial_area.append("<br>Enter your initials: <input type='text' id='inits'><br>");
							$initial_area.append("<button type='button' onclick='add_score(score)'>Submit score</button>");
							$initial_area.append("<button type='button' onclick='skip()'>Skip</button>");
							$('#start_screen').append($initial_area);
						}
					,1000);
				}
				//alert("I hope it acted");
			}
		,5);	
	}
}

function keyPressedHandler(e){	
	var code=e.keyCode;
	switch(code){
		case DOWN_ARROW:
			moveDir="D";
			gb.takeDirection(moveDir);
			break;
		case UP_ARROW:
			moveDir="U";
			gb.takeDirection(moveDir);
			break;
		case RIGHT_ARROW:
			moveDir="R";
			gb.takeDirection(moveDir);
			break;
		case LEFT_ARROW:
			moveDir="L";
			gb.takeDirection(moveDir);
			break;
		case SPACE_BAR:
			gb.tabSnake();
			break;
	}
}

function startup(){	
	if($("#start_screen").length==0){
		$start_screen=$("<div/>");
		$start_screen.attr("id","start_screen");
		$('#game_container').prepend($start_screen);
	}
	if($("#press_enter").length==0){
		$press_enter=$("<span>").text("PRESS ENTER").attr("id","press_enter");
	  $("#start_screen").append($press_enter);
	}
	//asynchronous
	setTimeout(display_scores,0);
	$('body').keydown(startScreenWaiting);
}

$('document').ready(startup);