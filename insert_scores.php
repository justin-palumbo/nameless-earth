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
 
 if (!(strlen($initials) > 3) && preg_match('/[^A-Za-z0-9]/', $string)){
   $query="INSERT INTO scores (initials,score) VALUES ('".$initials."',".$score.")";
 }

 echo "the query is ".$query;
 
$result = mysql_query($query);

?>