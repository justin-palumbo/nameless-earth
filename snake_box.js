//represents the snake box class...
//and the tools we use to move the snakes around in
//this is the interface for snake manipulation in the game...

//i want to potentially implement different movement speeds for different snakes
//this seems to require putting the 'intervals' into the box logic

function SnakeBox(gb)
//gb is the board on which all the snakes will be living
{
	//this.id=0;
	this.Snakes=[]; //our snakes
	this.directions=[]; //tracks which direction the snakes are currently going in
	this.curSnake=-1; //this is an integer, telling us which snake is currently receiving input
	this.timers=[];
	this.gb=gb;
	
	this.switchSnake=function(index) //puts the indexed snake in charge
		{
			if(this.curSnake in this.Snakes) //if we're switching from a valid snake
			{
				this.Snakes[this.curSnake].dehighlight();
			}
			this.curSnake=index;
			this.Snakes[this.curSnake].highlight();
			//alert("switched da snake");
		};
	
	this.addSnake=function(topOff,leftOff,moveSpeed,pieceSize) //adds another snake to the box
		{
			this.Snakes.push(new Snake(topOff,leftOff,moveSpeed,pieceSize,gb));
			var snakeCount = this.Snakes.length;
			//if there's only one snake, activate it
			if(snakeCount==1){
				this.switchSnake(0);
		  }
			var self=this;
			var index=snakeCount-1;
			this.directions[index]=Utility.sample(["R","D","L","U"]);
			this.timers[index]=setInterval(
				function(){
					//alert("snake should act");
					self.snakeAction(index);
					//alert("I hope it acted");
				}
			,moveSpeed);
			//alert("first snake all in da box");
		};
	
	this.takeDirection=function(moveDir)
	//only interesting part is ignoring a direction to reverse directions for a long snake
	{
		var index=this.curSnake;
		var curMove=this.directions[this.curSnake];
		//alert("pope");
		//alert(this.Snakes[index].length);
		if( (this.Snakes[index].length>2)&&
		    ((curMove=="L"&&moveDir=="R") ||
			(curMove=="R"&&moveDir=="L") ||
			(curMove=="U"&&moveDir=="D") ||
			(curMove=="D"&&moveDir=="U")))
		{
			//alert("can't go that way!!!");
			return;
		}
		
		this.directions[this.curSnake]=moveDir;
	};
	
	this.snakeAction=function(index)
	{
		snake=this.Snakes[index];
		snake.move(this.directions[index]);
		if(snake.inCollision())
		{
			snake.kill();
			
			//switch control to least living snake
			
			clearInterval(this.timers[index]);
			delete(this.timers[index]);
			delete(this.Snakes[index]);
			this.gb.number_of_snakes--;
			for(var i in this.Snakes)
			{
				//alert(i);
				this.switchSnake(i);
				break;
			}
			if(this.gb.number_of_snakes==0)
			{
				//alert("you lose.");
			}
		}
		if(snake.onFood())
		{
			gb.newFood();
			snake.addPart();
		}
	};
	
	this.getCurDirection=function() //helpful when we switch snakes in the game
		//we want the movement to go back to how the switched back to snake was going
		{
			return this.directions[this.curSnake];
		};
	
	this.tabSnake=function() //this is probably the function we'll actually use for snake control shift
							 //just increment currently used snake by 1
		{
			var i=(this.curSnake+1)%this.Snakes.length;
			while(!(i in this.Snakes))
			{
				i=(i+1)%this.Snakes.length;
			}
			this.switchSnake(i);
		};
		
	this.growSnake=function(index) //add a body part to indexed snake
		{
			this.Snakes[index].addPart();
		};
	
	this.growCurSnake=function()
		{
			this.Snakes[this.curSnake].addPart();
		};
	
	this.numberOfSnakes=function()
		{
			return Snakes.length;
		};
		
	this.getScoreMultiplier=function()
		{
			var total=1;
			for(var i in this.Snakes)
			{
				total=total*this.Snakes[i].length;
			}
			return total;
		};
		
	this.anyCollisions=function()
		{
			for(var i in this.Snakes)
			{
				if(this.Snakes[i].inCollision())
				{
					return true;
				}
			}
			return false; //will fix this soon
		};
}