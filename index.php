<?php
    $url=parse_url(getenv(" mysql://b45cfe831c8530:f1fdb272@us-cdbr-east-03.cleardb.com/heroku_3177567c389039e?reconnect=true"));

    $server = $url["host"];
    $username = $url["user"];
    $password = $url["pass"];
    $db = substr($url["path"],1);

    $dbhandle=mysql_connect($server, $username, $password);
            
    
    $selected=mysql_select_db($db);

	//declare the SQL statement that will query the database
	$query = "SELECT id, name, year ";
	$query .= "FROM cars ";
	$query .= "WHERE name='BMW'"; 

	//execute the SQL query and return records
	$result = mysql_query($query);

	$numRows = mysql_num_rows($result); 
	echo "<h1>" . $numRows . " Row" . ($numRows == 1 ? "" : "s") . " Returned </h1>"; 

	//display the results 
	while($row = mysql_fetch_array($result))
	{
		echo "<li>" . $row["id"] . "<br>" . $row["name"] . $row["year"] . "</li>";
	}
	//close the connection
	mysql_close($dbhandle);
?>