<?php 

require_once("../config/config.php");

$con = new PDO("mysql:host=".HOST.";dbname=".DB, USER, PASSWORD);