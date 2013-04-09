<?php


	$url=parse_url(getenv("CLEARDB_DATABASE_URL"));

	$myServer = $url["host"];
	$myUser = $url["user"];
	$myPass = $url["pass"];
	$myDB = substr($url["path"],1);

	//connection to the database
	$dbhandle = mysql_connect($myServer, $myUser, $myPass)
		or die("Couldn't connect to SQL Server on $myServer"); 

	//select a database to work with
	$selected = mysql_select_db($myDB, $dbhandle)
		or die("Couldn't open database $myDB"); 

	$query="SELECT * from scores ORDER BY score DESC LIMIT 10";

	$result = mysql_query($query);
	$counter=0;
	
	while($row = mysql_fetch_array($result))
	{
		$counter++;
		echo $myServer;
	}
?>