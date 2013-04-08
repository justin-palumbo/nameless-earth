function game_board(corner_offset,border_height,border_width,pieceSize,snakeMinSpeed,snakeMaxSpeed,snakeProbability)
{
	var self = this;
	self.pieceSize=pieceSize;
	self.border_height=border_height;
	self.border_width=border_width;
	self.corner_offset=corner_offset;
	self.snakeMinSpeed = snakeMinSpeed;
	self.snakeMaxSpeed = snakeMaxSpeed;
	self.snakeProbability = snakeProbability;
	self.coords={}; //the grid which we use to check for collisions
					//1 represents an obstacle, either the game boundary, or snake body part itself
					//2 represents food
	self.number_of_snakes=0;
	
	self.snakeBox=new SnakeBox(self); //creates the snakeBox,something not ok here
	
	self.randomStartPosition = function(){
		return {top: self.corner_offset.top + self.pieceSize * 3 + Utility.getRandom(0,self.border_height - 6) * self.pieceSize,
						left:self.corner_offset.left + self.pieceSize * 3 + Utility.getRandom(0,self.border_width - 6) * self.pieceSize};
	}

	self.numSnakes=function(){
		return self.number_of_snakes;
	};
	
	self.addBorder=function(offset){
		$htmlEl=$("<div/>");
		$htmlEl.addClass("boundary");
		$htmlEl.offset(offset);
		$htmlEl.height(self.pieceSize);
		$htmlEl.width(self.pieceSize);
		var A=[offset.top,offset.left];
		self.coords[A]=1;
		$("body").append($htmlEl);
	};

	self.addFood=function(offset){
		$food=$("<div/>");
		$food.addClass("food");
		$food.offset(offset);
		$food.height(self.pieceSize);
		$food.width(self.pieceSize);
		var A=[offset.top,offset.left];
		self.coords[A]=2;
		$("body").append($food);
	};
		
	self.drawBorder=function(){
		corner_left=self.corner_offset.left;
		corner_top=self.corner_offset.top;
		for(var i=0;i<self.border_height;i++)
		{
			self.addBorder({top:corner_top+i*self.pieceSize,left:corner_left});
			self.addBorder({top:corner_top+i*self.pieceSize,left:corner_left+self.border_width*self.pieceSize});
		}
		for(var i=0;i<self.border_width;i++)
		{
			self.addBorder({top:corner_top,left:corner_left+i*self.pieceSize});
			self.addBorder({top:corner_top+self.border_height*self.pieceSize,left:corner_left+i*self.pieceSize});
		}
		self.addBorder({top:corner_top+border_height*self.pieceSize,left:corner_left+self.border_width*self.pieceSize});
	};
		
	//if location is undefined, make it random
	self.addSnake=function(move_speed,location){
		if(typeof(location)=="undefined"){
			location = self.randomStartPosition();
		}
		self.snakeBox.addSnake(location.top,location.left,move_speed,self.pieceSize);
		self.number_of_snakes++;
	};
	
	self.growCurSnake=function(){
		self.snakeBox.growCurSnake();
	};
	
	self.tabSnake=function(){
		self.snakeBox.tabSnake();
	};
	
	self.getCurDirection=function(){
		return self.snakeBox.getCurDirection();
	};
	
	self.takeDirection=function(moveDir){
		self.snakeBox.takeDirection(moveDir);
	};
	
	self.random_unoccupied_square=function(){
		var toppy=Math.floor(1+Math.random()*(self.border_height-2));
		var lefty=Math.floor(1+Math.random()*(self.border_width-2));
		return {top:self.corner_offset.top+toppy*pieceSize,left:self.corner_offset.left+lefty*pieceSize};
	};
	
	self.newFood=function(){
		$(".food").remove(); //get rid of whatever old food may have been there
		self.addFood(self.random_unoccupied_square());
		//alert("did we update the score??");
		var score_multiplier=self.snakeBox.getScoreMultiplier();
		self.score=self.score+10*score_multiplier;
	};

	self.tryAddSnake = function(){
		if(Math.random() < self.snakeProbability){
			var speed = Utility.getRandom(self.snakeMinSpeed,self.snakeMaxSpeed);
			gb.addSnake(speed);
		}
  }
		
	self.kill=function(){
		//get rid of everything
		$(".food").remove();
		$(".boundary").remove();
	};
	
	self.drawBorder();
	self.newFood();
	self.score=0; //important that self is done after food is placed, because food increases score..
	self.addSnake(100); //adds the snake to the box
}