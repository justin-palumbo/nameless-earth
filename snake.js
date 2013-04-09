/*
	right now, if the snake gets too long the game has dramatic slowdown.
	theory: this is happening because every snake segment gets redrawn at every step
	
	currently implementing solution: only draw two pieces at a time.
	store body parts in a queue with each body part having FIXED coordinates
	every time the snake moves, add a new coordinate at the front, and delete a coordinate at the tail
	when we add a body part, that means at the next step don't delete the tail.


*/

function Snake(topOff,leftOff,moveSpeed,pieceSize,gb) //constructor for the Snake class
//topOff,leftOff give the coordinates where the snake starts
//moveSpeed is how quickly the snake moves
//gb is a reference to the board on which the Snake is moving around

{
	var self = this;
	self.gb=gb; //the game board on which the snake lives
	self.coords=gb.coords; //the grid system where self Snake lives
	self.pieceSize=pieceSize; //the size of segments in self snake
	self.length=1;	//each snake has a length
	self.body_parts=new queue(); //self will store the body parts
	self.body_parts.insert_front(new bodyPart(topOff,leftOff,self.pieceSize,false)); //just one body part in the queue
	self.colliding=false;
	self.eating_food=false;
	self.highlighted=false;	
	self.skipDelete=false; //flag for adding a part. when we add a part, we don't delete skipping the tail next time
	self.moveSpeed=moveSpeed; //save the snake's move speed
	
	self.highlight=function() //for use when we 'select' self snake. should add appropriate class to each body part
		{
			self.body_parts.each(function(item)
				{
					item.highlight();
				}
			);
			self.highlighted=true;
		};
		
	self.dehighlight=function() //for use when we 'select away' from self snake
		{
			self.body_parts.each(function(item)
				{
					item.dehighlight();
				}
			);
			self.highlighted=false;
		};
	
	//set up object methods for the "snake class"
	self.addPart=function() //add a body part to the snake. i'll fill self out more later
		{
			self.skipDelete=true;
		};
		
	self.move=function(direction) //move the snake in the given direction..could get complicated later
		{
			var cur_head=self.body_parts.get_front(); //gets the current snake head
													  //before getting/deleting tail. because maybe head=tail
			var cur_headOff=cur_head.getOff();
			var cur_topOff=cur_headOff.top;
			var cur_leftOff=cur_headOff.left;
			
			var new_topOff;
			var new_leftOff;
			switch(direction)
			{
				case "R":
					new_topOff=cur_topOff;
					new_leftOff=cur_leftOff+self.pieceSize;
					break;
				case "D":
					new_topOff=cur_topOff+self.pieceSize;
					new_leftOff=cur_leftOff;
					break;
				case "L":
					new_topOff=cur_topOff;
					new_leftOff=cur_leftOff-self.pieceSize;
					break;
				case "U":
					new_topOff=cur_topOff-self.pieceSize;
					new_leftOff=cur_leftOff;
					break;
			}
			
			
			var head=new bodyPart(new_topOff,new_leftOff,self.pieceSize,self.highlighted);
			self.body_parts.insert_front(head);
			
			if(!self.skipDelete)
			{
				var tail=self.body_parts.get_back();
				var tailOff=tail.getOff();
				var B=[tailOff.top,tailOff.left];
				delete(self.coords[B]); //place where tail WAS is no longer occupied
				tail.remove(); //and delete tail from the snake
				self.body_parts.delete_back();
			}
			if(self.skipDelete)
			{
				self.length++;
				self.skipDelete=false;
			}
			
			//var A=[cur_topOff,cur_leftOff]; self seems wrong. should add the NEW offsets
			var A=[new_topOff,new_leftOff];
			self.colliding=(self.coords[A]==1);
			self.eating_food=(self.coords[A]==2);
			self.coords[A]=1; //the place where head is, it's now occupied 
		};

		self.inCollision=function()
		//originally i wanted collisions to be checked by keeping a 2-d array of which spaces were occupied
		//however self was complicated by the fact the space the head is in always occupied by itself
		//if there were just one snake we could always just count the head's square as unoccupied
		//however with multi-snake action that solution won't work
		//instead i'll keep a collision flag, update it within the movement function
		//(that is, check for a collision right before adding the 'occupied status' to head's square
		{
			return self.colliding;
		};
		
		self.onFood=function(){
			return self.eating_food;
		};
		
		self.kill=function(){ //should remove snake from the board
			self.body_parts.each(function(item){
					item.kill(self.coords);
			});
		};
}
