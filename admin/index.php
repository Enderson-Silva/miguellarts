<?php

	session_start();
	$_SESSION['token'] = md5(uniqid(rand(), true));

?>

<!DOCTYPE html>

<html lang="pt-br">
	<head>
		<meta charset="utf-8"/>
		<title>Miguella Art's - Login</title>
		<link rel="short icon" href="https://media.discordapp.net/attachments/699440221288398898/819999440949084220/unknown.png"/>
		<link rel="stylesheet" href="../css/style-login.css"/>
	</head>
	<body>
		<form class="form-login" action="login.php" method="POST" autocomplete="off">
			<label>Senha</label>
			<input type="password" name="senha"/>
			<input type="hidden" value="<?php echo $_SESSION['token']; ?>" name="token"/>
		</form>
	</body>
</html>