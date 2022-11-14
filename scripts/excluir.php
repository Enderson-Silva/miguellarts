<?php
	header("Content-Type: application/json;charset=utf-8");
	session_start();

	$data = json_decode(file_get_contents('php://input'), true);
	
	@$tokenScript = $data['token'];
	@$tokenPainel = $_SESSION['tokenPainel'];

	if($tokenScript === $tokenPainel){
		if(isset($data["id"])){
			try{
				include_once("connect.php");
				$id = $data['id'];
				$excluir = $con->prepare("DELETE FROM arts WHERE id=:i");
				$excluir->bindValue(":i", $id, PDO::PARAM_INT);
				$excluir->execute();

				if($excluir->rowCount() > 0){
					echo json_encode(["aviso" => "Imagem excluida com sucesso!"], JSON_PRETTY_PRINT);
					exit();
				}else{
					echo json_encode(["aviso" => "Não há registros com esse ID!"], JSON_PRETTY_PRINT);
					exit();
				}
			}catch(PDOException $e){
				echo json_encode(["error" => "Houve um erro ao tentar excluir uma imagem!"], JSON_PRETTY_PRINT);
			exit();
			}
		}else{
			echo json_encode(["error" => "Houve um erro ao tentar excluir uma imagem!"], JSON_PRETTY_PRINT);
			exit();
		}
	}else{
		echo json_encode(["error" => "Acesso negado!"], JSON_PRETTY_PRINT);
		exit();
	}
?>