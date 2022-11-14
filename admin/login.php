<?php
	
	session_start();


	$senha = $_POST["senha"];
	$tokenSession = $_SESSION["token"];
	$tokenForm = $_POST["token"];

	if(isset($senha, $tokenForm, $tokenSession)){
		if($tokenForm === $tokenSession){
			require_once("../scripts/connect.php");

			$bsenha = $con->prepare("SELECT * FROM adm");
			$bsenha->execute();
			$rows = $bsenha->rowCount();
			if($rows > 0){
				$senhaBanco = $bsenha->fetch(PDO::FETCH_ASSOC);
				if(password_verify($senha, $senhaBanco["senha"])){
					$_SESSION["lgd"] = true;
					header("location: painel.php");
				}else{
					header("location: index.php");
				}
			}

		}else{
			header("location: index.php");
			exit();
		}
	}else{
		header("location: index.php");
		exit();
	}

?>