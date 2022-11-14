<?php

	header("Content-Type: application/json;charset=utf-8");
	session_start();

	$data = json_decode(file_get_contents('php://input'), true);
	
	@$tokenScript = $data['token'];
	@$tokenPainel = $_SESSION['tokenPainel'];

	if($tokenScript === $tokenPainel){
		if(isset($data['link']) && isset($data['categoria'])){
			$link = $data['link'];
			$categoria = $data['categoria'];
			require_once("connect.php");

			try{
				$verificar = $con->prepare("SELECT ordem FROM arts WHERE categoria=:categoria ORDER BY ordem DESC LIMIT 1");
				$verificar->bindValue(":categoria", $categoria, PDO::PARAM_STR);
				$verificar->execute();

				if($verificar->rowCount() > 0){
					$row = $verificar->fetch(PDO::FETCH_ASSOC);
					$ordem = $row["ordem"] + 1;
				}else{
					$ordem = 1;
				}
			}catch(PDOException $e){
				echo json_encode(["error" => "Houve um problema ao tentar adicionar uma nova imagem!"], JSON_PRETTY_PRINT);	
				exit();
			}

			try{
				$adicionar = $con->prepare("INSERT INTO arts (link, categoria, ordem) VALUES (:link, :categoria, :ordem)");
				$adicionar->bindValue(":link", $link);
				$adicionar->bindValue(":categoria", $categoria);
				$adicionar->bindValue(":ordem", $ordem);
				$adicionar->execute();
			}catch(PDOException $e){
				echo json_encode(["error" => "Houve um problema ao tentar adicionar uma nova imagem!"], JSON_PRETTY_PRINT);	
				exit();
			}

			if($adicionar->rowCount() > 0){
				echo json_encode(["aviso" => "Imagem adicionada com sucesso!"]);
				exit();
			}else{
				echo json_encode(["aviso" => "Houve um problema ao tentar adicionar uma nova imagem!"]);
				exit();
			}
		}else{
			echo json_encode(["error" => "Houve um problema ao tentar adicionar uma nova imagem!"], JSON_PRETTY_PRINT);	
			exit();
		}
	}else{
		echo json_encode(["error" => "Acesso negado!"], JSON_PRETTY_PRINT);	
		exit();
	}

?>