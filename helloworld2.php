<?php
echo "HOPING FOR BEST<br> BOYS <br>";

#This function reads your DATABASE_URL configuration automatically set by Heroku
# the return value is a string that will work with pg_connect
function pg_connection_string() {
  // we will fill this out next
}

$myServer = "localhost";
$myUser = "root";
$myPass = "Delim3at";
$myDB = "justin_db"; 

$db = pg_connect(pg_connection_string());
if (!$db) {
   echo "Database connection error."
   exit;
}

//declare the SQL statement that will query the database
$query = "SELECT id, name, year ";
$query .= "FROM cars ";
$query .= "WHERE name='BMW'"; 

//execute the SQL query and return records
$result = pg_query($db,$query);

?>