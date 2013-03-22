var gb; //this game board
var $start_screen;

var printCoords=function()
	{
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
var defaultPieceSize=5; //the default size of a snake segment
var defaultMoveSpeed=150; //what this means is: the number of PieceSize units to move at once

var main_timer;

var counter=0; //using this for testing. right now, if it hits 15, gonna increase snake size
var score=0;

function start_screen_waiting(e)
{
	var code=e.keyCode;
	if(code==ENTER)
	{
		$('body').off(); //stop listening for ENTER
		$start_screen.remove();
		gb=new game_board({top: 175,left: 10},50,80,defaultPieceSize);
		$('body').keydown(keyPressedHandler); //start listening for keyboard hits!!
		//alert(gb.score);
		main_timer=setInterval(
				function()
				{
					if(score!=gb.score)
					{
						score=gb.score;
						//alert("score update!!");
						$("#score_box").text(score);
					}
					if(gb.numSnakes()==0)
					{
						clearInterval(main_timer);
						setTimeout(
							function()
							{
								alert("you lose and your score was "+score);
								gb.kill();
								$initial_area=$("<div id='post_game'/>");
								$initial_area.append("<br>Enter your initials: <input type='text' id='inits'><br>");
								$initial_area.append("<button type='button' onclick='add_score(score)'>Submit score</button>");
								$initial_area.append("<button type='button' onclick='skip()'>Skip</button>");
								$('body').append($initial_area);
							}
						,1000);
					}
					//alert("I hope it acted");
				}
			
			,5);
		
		
	}
}

function keyPressedHandler(e)
{	
	var code=e.keyCode;
	switch(code)
	{
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
			moveDir=snakeBox.getCurDirection();
			break;
	}
	counter++;
	if(counter==10)
	{
		gb.addSnake(75);
	}
	if(counter==20)
	{
		//snakeBox.addSnake(defaultTopOff,defaultLeftOff,40,defaultPieceSize);
	}
}

function startup()
{	
	counter=0;
	moveDir="R";
	$start_screen=$("<div/>");
	$start_screen.addClass("start_screen");
	$start_screen.text("Press enter to begin");
	display_scores();
	$('body').append($start_screen);
	$('body').keydown(start_screen_waiting);
	//alert("let's go!");
}

$('document').ready(startup);