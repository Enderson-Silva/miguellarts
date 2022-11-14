<?php

	session_start();
	$tokenAdd = $_SESSION["tokenBusca"];
	$tokenForm = $_POST["tokenForm"];

	if(isset($tokenAdd, $tokenForm)){
		if($tokenForm === $tokenAdd){
			$con = new PDO("mysql:host=sql302.epizy.com;dbname=epiz_28137345_expositor", "epiz_28137345", "09gkFW9MzJYA");

			$categoria = $_POST["categoria"];
			$link = $_POST["link"];

			$adicionar = $con->prepare("INSERT INTO arts (categoria, link) VALUES (:categoria, :link)");
			$adicionar->bindValue(":categoria", $categoria);
			$adicionar->bindValue(":link", $link);
			$adicionar->execute();

			header("location: painel.php");
		}else{
			header("location: painel.php");
			exit();
		}
	}else{
		header("location: painel.php");
		exit();
	}

?>