<?php 

header("Content-Type: application/json;charset=utf-8");
session_start();

$data = json_decode(file_get_contents('php://input'), true);
	
@$tokenScript = $data['token'];
@$tokenPainel = $_SESSION['tokenPainel'];

if(isset($tokenScript) && isset($tokenPainel)){
	if($tokenScript === $tokenPainel){
		if(isset($data['ids'])){
			$ids = $data['ids'];
			require_once("connect.php");

			$ordem = 1;

			try{
				foreach($ids as $id){
					$salvar = $con->prepare("UPDATE arts SET ordem=:o WHERE id=:i");
					$salvar->bindValue(":o", $ordem, PDO::PARAM_INT);
					$salvar->bindValue(":i", $id, PDO::PARAM_INT);
					$salvar->execute();
					$ordem++;
				}

				echo json_encode(["aviso" => "Atualizado com sucesso!"], JSON_PRETTY_PRINT);
				exit();
			}catch(PDOException $e){
				echo json_encode(["error" => "Houve um error: ".$e->getMessage()], JSON_PRETTY_PRINT);
				exit();
			}
		}else{
			echo json_encode(["error" => "Houve um problema ao salvar os dados!"], JSON_PRETTY_PRINT);
			exit();
		}
	}else{
		echo json_encode(["error" => "Acesso negado!"], JSON_PRETTY_PRINT);
		exit();
	}
}else{
	echo json_encode(["error" => "Acesso negado!"], JSON_PRETTY_PRINT);
	exit();
}
