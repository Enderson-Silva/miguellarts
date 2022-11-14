<?php

	header("Content-Type: application/json;charset=utf-8");
	session_start();

	$data = json_decode(file_get_contents('php://input'), true);
	
	@$tokenScript = $data['token'];
	@$tokenPainel = $_SESSION['tokenPainel'];

	if($tokenScript === $tokenPainel){
		if(isset($data['link']) && isset($data['categoria']) && isset($data['id'])){
			$link = $data['link'];
			$categoria = $data['categoria'];
			$id = $data['id'];
			require_once("connect.php");

			try{
				$verificar = $con->prepare("SELECT * FROM arts WHERE id=:id LIMIT 1");
				$verificar->bindValue(":id", $id, PDO::PARAM_INT);
				$verificar->execute();

				if($verificar->rowCount() > 0){
					$row = $verificar->fetch(PDO::FETCH_ASSOC);
					$atualCategoria = $row["categoria"];
				}else{
					echo json_encode(["error" => "Houve um problema ao tentar editar uma nova postagem!"], JSON_PRETTY_PRINT);	
					exit();
				}
			}catch(PDOException $e) {
				echo json_encode(["error" => "Houve um erro ao editar. Erro: ".$e->getMessage()], JSON_PRETTY_PRINT);
				exit();
			}

			if($atualCategoria == $categoria){
				try{
					$editar = $con->prepare("UPDATE arts SET link=:link WHERE id=:id");
					$editar->bindValue(":link", $link);
					$editar->bindValue(":id", $id);
					$editar->execute();
				}catch(PDOException $e) {
					echo json_encode(["error" => "Houve um erro ao editar. Erro: ".$e->getMessage()], JSON_PRETTY_PRINT);
					exit();
				}
			}else{
				try{
					$verificar = $con->prepare("SELECT ordem FROM arts WHERE categoria=:categoria ORDER BY ordem DESC LIMIT 1");
					$verificar->bindValue(":categoria", $categoria, PDO::PARAM_STR);
					$verificar->execute();

					if($verificar->rowCount() > 0){
						$row = $verificar->fetch(PDO::FETCH_ASSOC);
						$ordem = $row["ordem"] + 1;
					}else{
						echo json_encode(["error" => "Houve um problema ao tentar editar uma nova postagem!"], JSON_PRETTY_PRINT);	
						exit();
					}
				}catch(PDOException $e){
					echo json_encode(["error" => "Houve um problema ao tentar editar uma postagem!"], JSON_PRETTY_PRINT);	
					exit();
				}

				try{
					$editar = $con->prepare("UPDATE arts SET link=:link, categoria=:categoria, ordem=:ordem WHERE id=:id");
					$editar->bindValue(":link", $link);
					$editar->bindValue(":categoria", $categoria);
					$editar->bindValue(":id", $id);
					$editar->bindValue(":ordem", $ordem);
					$editar->execute();
				}catch(PDOException $e) {
					echo json_encode(["error" => "Houve um erro ao editar. Erro: ".$e->getMessage()], JSON_PRETTY_PRINT);
					exit();
				}
			}
			echo json_encode(["aviso" => "Postagem editada com sucesso!"], JSON_PRETTY_PRINT);
			exit();
		}else{
			echo json_encode(["error" => "Houve um erro ao tentar editar uma postagem!"], JSON_PRETTY_PRINT);
			exit();
		}
	}else{
		echo json_encode(["error" => "Acesso negado!"], JSON_PRETTY_PRINT);
		exit();
	}

?>