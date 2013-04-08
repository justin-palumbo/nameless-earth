
function display_scores(){			
	//alert("hey baby");
	var xmlhttp=new XMLHttpRequest(); //my new xml object, this is only gonna work for modern browsers
	xmlhttp.onreadystatechange=function(){
		//alert("hi there");
		if(xmlhttp.readyState==4&&xmlhttp.status==200)
		{
			$("#high_scores").html(xmlhttp.responseText);
		}
	};
	xmlhttp.open("POST","get_scores.php",true);
	xmlhttp.send();
}

var score_flag=true;

function skip(){
	$("#post_game").remove();
	startup();
}

function add_score(score){
	var inits=$("#inits").val();
	if(inits.length!=3)
	{
		if(score_flag)
		{
			$("#post_game").append("<div style='color:red'>initials should be 3 characters</div>");
			score_flag=false;
		}
		return;
	}
	var xmlhttp=new XMLHttpRequest(); //my new xml object, this is only gonna work for modern browsers
				
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4&&xmlhttp.status==200)
		{
			display_scores();
			//alert(xmlhttp.responseText);
		}
	};
	xmlhttp.open("POST","insert_scores.php?initials="+inits+"&score="+score,true);
	xmlhttp.send();
	skip();
}