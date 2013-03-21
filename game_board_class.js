function game_board(corner_offset,border_height,border_width,pieceSize)
{
	this.pieceSize=pieceSize;
	this.border_height=border_height;
	this.border_width=border_width;
	this.corner_offset=corner_offset;
	this.coords={}; //the grid which we use to check for collisions
					//1 represents an obstacle, either the game boundary, or snake body part itself
					//2 represents food
	this.defaultTopOff=this.corner_offset.top+10; //where we start the first Snake
	this.defaultLeftOff=this.corner_offset.left+10;
	this.number_of_snakes=0;
	
	this.snakeBox=new SnakeBox(this); //creates the snakeBox,something not ok here
	
	this.numSnakes=function()
		{
			return this.number_of_snakes;
		};
	
	this.add_border=function(offset)
		{
			$htmlEl=$("<div/>");
			$htmlEl.addClass("boundary");
			$htmlEl.offset(offset);
			$htmlEl.height(this.pieceSize);
			$htmlEl.width(this.pieceSize);
			var A=[offset.top,offset.left];
			this.coords[A]=1;
			$("body").append($htmlEl);
		};

	this.add_food=function(offset)
		{
			$food=$("<div/>");
			$food.addClass("food");
			$food.offset(offset);
			$food.height(this.pieceSize);
			$food.width(this.pieceSize);
			var A=[offset.top,offset.left];
			this.coords[A]=2;
			$("body").append($food);
		};
		
	this.draw_border=function()
		{
			corner_left=this.corner_offset.left;
			corner_top=this.corner_offset.top;
			for(var i=0;i<this.border_height;i++)
			{
				this.add_border({top:corner_top+i*this.pieceSize,left:corner_left});
				this.add_border({top:corner_top+i*this.pieceSize,left:corner_left+this.border_width*this.pieceSize});
			}
			for(var i=0;i<this.border_width;i++)
			{
				this.add_border({top:corner_top,left:corner_left+i*this.pieceSize});
				this.add_border({top:corner_top+this.border_height*this.pieceSize,left:corner_left+i*this.pieceSize});
			}
			this.add_border({top:corner_top+border_height*this.pieceSize,left:corner_left+this.border_width*this.pieceSize});
		};
		
	this.addSnake=function(move_speed)
		{
			this.snakeBox.addSnake(this.defaultTopOff,this.defaultLeftOff,move_speed,this.pieceSize);
			this.number_of_snakes++;
			//alert(this.number_of_snakes);
		};
	
	this.growCurSnake=function()
		{
			this.snakeBox.growCurSnake();
		};
		
	this.tabSnake=function()
		{
			this.snakeBox.tabSnake();
		};
	
	this.getCurDirection=function()
		{
			return this.snakeBox.getCurDirection();
		};
	
	this.takeDirection=function(moveDir)
		{
			this.snakeBox.takeDirection(moveDir);
		};
	
	this.random_unoccupied_square=function()
		{
			var toppy=Math.floor(Math.random()*this.border_height);
			var lefty=Math.floor(Math.random()*this.border_width);
			return {top:this.corner_offset.top+toppy*pieceSize,left:this.corner_offset.left+lefty*pieceSize};
		};
	
	this.new_food=function()
		{
			$(".food").remove(); //get rid of whatever old food may have been there
			this.add_food(this.random_unoccupied_square());
			//alert("did we update the score??");
			var score_multiplier=this.snakeBox.getScoreMultiplier();
			this.score=this.score+10*score_multiplier;
		};
		
	this.kill=function()
		{
			//get rid of everything
			$(".food").remove();
			$(".boundary").remove();
		};
	
	this.draw_border();
	this.new_food();
	this.score=0; //important that this is done after food is placed, because food increases score..
	this.addSnake(100); //adds the snake to the box
	this.snakeBox.takeDirection("R");
}