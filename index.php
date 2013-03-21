<?php
	$url=parse_url(getenv("CLEARDB_DATABASE_URL"));

    $server = $url["host"];
    $username = $url["user"];
    $password = $url["pass"];
    $db = substr($url["path"],1);

	echo($server." <br> oK???".$username." <br>".$password." <br>".$db);
	
    $dbhandle=mysql_connect($server, $username, $password)
		or die("Couldn't connect to SQL Server on $server");
            
    
    $selected=mysql_select_db($db)
		or die("Couldn't open database $db");

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