<?php
$initials=$_GET["initials"];
$score=$_GET["score"];

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

 $query="INSERT INTO scores (initials,score) VALUES ('".$initials."',".$score.")";

 echo "the query is ".$query."<br>";
 
$result = mysql_query($query);


echo "inserted! initials are ".$initials." and score is ".($score);


?>