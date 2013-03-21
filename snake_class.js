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
	this.gb=gb; //the game board on which the snake lives
	this.coords=gb.coords; //the grid system where this Snake lives
	this.pieceSize=pieceSize; //the size of segments in this snake
	this.length=1;	//each snake has a length
	this.body_parts=new queue(); //this will store the body parts
	this.body_parts.insert_front(new bodyPart(topOff,leftOff,this.pieceSize,false)); //just one body part in the queue
	this.colliding=false;
	this.eating_food=false;
	this.highlighted=false;	
	this.skipDelete=false; //flag for adding a part. when we add a part, we don't delete skipping the tail next time
	this.moveSpeed=moveSpeed; //save the snake's move speed
	
	this.highlight=function() //for use when we 'select' this snake. should add appropriate class to each body part
		{
			this.body_parts.each(function(item)
				{
					item.highlight();
				}
			);
			this.highlighted=true;
		};
		
	this.dehighlight=function() //for use when we 'select away' from this snake
		{
			this.body_parts.each(function(item)
				{
					item.dehighlight();
				}
			);
			this.highlighted=false;
		};
	
	//set up object methods for the "snake class"
	this.addPart=function() //add a body part to the snake. i'll fill this out more later
		{
			this.skipDelete=true;
		};
		
	this.move=function(direction) //move the snake in the given direction..could get complicated later
		{
			var cur_head=this.body_parts.get_front(); //gets the current snake head
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
					new_leftOff=cur_leftOff+this.pieceSize;
					break;
				case "D":
					new_topOff=cur_topOff+this.pieceSize;
					new_leftOff=cur_leftOff;
					break;
				case "L":
					new_topOff=cur_topOff;
					new_leftOff=cur_leftOff-this.pieceSize;
					break;
				case "U":
					new_topOff=cur_topOff-this.pieceSize;
					new_leftOff=cur_leftOff;
					break;
			}
			
			
			var head=new bodyPart(new_topOff,new_leftOff,this.pieceSize,this.highlighted);
			this.body_parts.insert_front(head);
			
			if(!this.skipDelete)
			{
				var tail=this.body_parts.get_back();
				var tailOff=tail.getOff();
				var B=[tailOff.top,tailOff.left];
				delete(this.coords[B]); //place where tail WAS is no longer occupied
				tail.remove(); //and delete tail from the snake
				this.body_parts.delete_back();
			}
			if(this.skipDelete)
			{
				this.length++;
				this.skipDelete=false;
			}
			
			//var A=[cur_topOff,cur_leftOff]; this seems wrong. should add the NEW offsets
			var A=[new_topOff,new_leftOff];
			this.colliding=(this.coords[A]==1);
			this.eating_food=(this.coords[A]==2);
			this.coords[A]=1; //the place where head is, it's now occupied 
		};

		this.inCollision=function()
		//originally i wanted collisions to be checked by keeping a 2-d array of which spaces were occupied
		//however this was complicated by the fact the space the head is in always occupied by itself
		//if there were just one snake we could always just count the head's square as unoccupied
		//however with multi-snake action that solution won't work
		//instead i'll keep a collision flag, update it within the movement function
		//(that is, check for a collision right before adding the 'occupied status' to head's square
		{
			return this.colliding;
		};
		
		this.onFood=function()
		{
			return this.eating_food;
		};
		
		this.kill=function() //should remove snake from the board
		{
			
			this.body_parts.each(function(item)
				{
					item.kill();
				}
			);
		};
}
