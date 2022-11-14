<?php

header("Content-Type: application/json;charset=utf-8");

$data = json_decode(file_get_contents('php://input'), true);
@$typeFetch = $data['typefetch'];

if($typeFetch == 1){
	if(isset($data["categoria"])){
		try{
			require_once("../scripts/connect.php");

			$categoria = $data['categoria'];

			$buscar = $con->prepare("SELECT * FROM arts WHERE categoria=:c ORDER BY ordem ASC");
			$buscar->bindValue(":c", $categoria, PDO::PARAM_STR);
			$buscar->execute();

			if($buscar->rowCount()){
				while($row = $buscar->fetchAll(PDO::FETCH_ASSOC)){
					echo json_encode($row, JSON_PRETTY_PRINT);
				}
			}else{
				echo json_encode(["aviso" => "Não há registros!"], JSON_PRETTY_PRINT);
				exit();
			}
			
		}catch(PDOException $e){
			echo json_encode(["error" => "Houve um error: ".$e->getMessage()], JSON_PRETTY_PRINT);
			exit();
		}
	}
}elseif($typeFetch == 2){
	try{
		require_once("../scripts/connect.php");

		$categorys = ["ads", "emblemas", "headers", "logos", "variadas"];
		$itens = [];

		foreach($categorys as $value){
			$buscar = $con->prepare("SELECT * FROM arts WHERE categoria=:c ORDER BY id DESC LIMIT 2");
			$buscar->bindValue(":c", $value, PDO::PARAM_STR);
			$buscar->execute();

			if($buscar->rowCount()){
				while($row = $buscar->fetchAll(PDO::FETCH_ASSOC)){
					array_push($itens, $row[0]);
					array_push($itens, $row[1]);
				}
			}else{
				echo json_encode(["aviso" => "Não há registros!"], JSON_PRETTY_PRINT);
				exit();
			}


		}

		echo json_encode($itens, JSON_PRETTY_PRINT);

	}catch(PDOException $e){
		echo json_encode(["error" => "Houve um error: ".$e->getMessage()], JSON_PRETTY_PRINT);
		exit();
	}
}else{
	echo json_encode(["error" => "Não foi informado o tipo de busca."], JSON_PRETTY_PRINT);
		exit();
}