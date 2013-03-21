queue=function()
{
	this.head=null;
	this.tail=null;

	this.insert_front=function(data)
		{
			//alert("trying to add a thing");
			if(this.head==null) //empty queue
			{
				this.head=new Node(data);
				this.tail=this.head;
			}
			else if(this.head==this.tail) //one element queue
			{
				//console.log("yo");
				this.head=new Node(data);
				this.head.next=this.tail;
				this.tail.prev=this.head;
			}
			else //at least two elements
			{
				var temp=this.head;
				this.head=new Node(data);
				this.head.next=temp;
				temp.prev=this.head;
			}
			//alert("we added a thing??");
		};
		
	this.get_front=function()
		{
			return this.head.data;
		};
	
	this.delete_back=function()
		{
			//alert("hey..");
			if(this.head==null) //empty queue
			{
				//nothing to do
			}
			else if(this.head==this.tail) //one element queue
			{
				//alert("what's wrong?");
				this.head=null;
				this.tail=null;
			}
			else //at least two elements
			{
				this.tail=this.tail.prev;
				this.tail.next=null;
			}
		};
		
	this.get_back=function()
		{
			return this.tail.data;
		};
		
	this.each=function(a_func) //call a_func on each member of the queue
		{
			var trav=this.head;
			while(trav!=null)
			{
				a_func(trav.data);
				trav=trav.next;
			}
		};
}