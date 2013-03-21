/*
	this is how we store the actions of the snake.
	at a given moment the movement queue looks abstractly something like:
	R R R U U L
	which means head should move R, then next part should move R, next R, next U etc
	then if we are hitting D at the next step the queue should look like
	D R R R U U
	
	so that we don't have to do an O(n) operation to update each time, we implement this using
	modular arithmetic, keeping track

*/

function movementQueue()
{
	//alert("we just built a queue!!");
	this.stuff=["R"];
	this.length=1;
	this.head=0;
	this.tail=0;
	
	this.get=function(index) //get the move at the index 'index'
	{
		return this.stuff[(this.head+index)%this.length];
	}
	
	this.update=function(moveDir) //put the 'next' move in the queue
		{
			this.stuff[this.tail]=moveDir;
			this.head=this.tail;
			this.tail=(this.tail+this.length-1)%this.length;
		};
	
	this.increaseLength=function() //i can't really think of a smart way to do this.
								   //so we'll just copy over and start from scratch
		{
			stuffcopy=[];
			for(var i=0;i<this.length;i++)
			{
				stuffcopy[i]=this.get(i);
			}
			this.stuff=stuffcopy;
			this.length++; //note the "new" index is ignored.. the last entry is always ignored by the move function
			this.head=0;
			this.stuff[this.length-2]="W"; //this ensures that on the next move, the new piece will sit there
			this.tail=this.length-1;
		};
	
	this.toString=function()
		{
			//alert("trying to convert queue to a string");
			var retval="";
			//alert("did retval start out ok? looks like: "+retval);
			for(var i=0;i<this.length;i++)
			{
				retval=retval+" "+this.get(i);
				//alert("did retval update ok? looks like: "+retval);
			}
			//alert("did retval come out ok? looks like: "+retval);
			return retval;
		};
}