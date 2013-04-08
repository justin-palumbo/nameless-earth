function bodyPart(topOff,leftOff,pieceSize,highlighted){ //constructor for the bodyPart class
	this.pieceSize=pieceSize;
	this.$htmlEl=$("<div/>");
	this.$htmlEl.addClass("body_part");
	this.$htmlEl.width(pieceSize);
	this.$htmlEl.height(pieceSize);
	$("body").append(this.$htmlEl);
	this.$htmlEl.offset({ top: topOff, left: leftOff});
	if(highlighted){
			this.$htmlEl.addClass("selected");
	}
	//alert("body started build");
	
	this.getOff=function(){ //returns the offset object. so this.getOff().left gives left offset.. etc
		return this.$htmlEl.offset();
	};
	
	this.highlight=function(){
		this.$htmlEl.addClass("selected");
	};
		
	this.dehighlight=function(){
		this.$htmlEl.removeClass("selected");
	};
	
	this.kill=function(){ //specifically for destruction
		this.$htmlEl.effect("explode");
		this.$htmlEl.remove();
		//alert("am I still here?");
	};
	
	this.remove=function(){
		this.$htmlEl.remove();
		//alert("am I still here?");
	};
	
	this.move=function(moveDir){ //move the body part in the given direction
		//alert("trying to move a body part in direction "+moveDir);
		var leftOff=this.$htmlEl.offset().left;
		var topOff=this.$htmlEl.offset().top;
		var moveAmount=this.pieceSize;
		switch(moveDir)
		{
			case "R":
				//alert("trying to move right...");
				this.$htmlEl.offset({top:topOff,left: leftOff+moveAmount});
				break;
			case "D":
				this.$htmlEl.offset({top:topOff+moveAmount,left: leftOff});
				break;
			case "L":
				this.$htmlEl.offset({top:topOff,left: leftOff-moveAmount});
				break;
			case "U":
				this.$htmlEl.offset({top:topOff-moveAmount,left: leftOff});
				break;
		}
	};
		
		//alert("body all done");
}