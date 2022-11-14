<?php
	header("Access-Control-Allow-Origin: *");
	session_start();

	if(!isset($_SESSION["lgd"])){
		session_destroy();
		header("location: index.php");
		exit();
	}

	$_SESSION['tokenPainel'] = md5(uniqid(rand(), true));
	require_once("../config/config.php");

?>

<!DOCTYPE html>

<html lang="pt-br">
	<head>
		<meta charset="utf-8"/>
		<title>Miguella Art's - Painel Administrativo</title>
		<link rel="short icon" href="<?php echo DIRIMG.'favicon.png'; ?>"/>
		<link rel="stylesheet" href="<?php echo DIRCSS."style-painel.css?v=".VERSION; ?>"/>
		<style>
			@font-face{
				font-family: m23;
				src: url("<?php echo DIRFONTE.'m23.ttf'; ?>");
			}

			@font-face{
				font-family: script;
				src: url("<?php echo DIRFONTE.'scriptpixel.ttf'; ?>");
			}

			@font-face{
				font-family: upheavtt;
				src: url("<?php echo DIRFONTE.'upheavtt.ttf'; ?>");
			}

			* {
				cursor: url("<?php echo DIRIMG.'cursor.png'; ?>"), default;
			}
		</style>
	</head>
	<body>
		<main>
			<?php include_once(DIRINCLUDE."menu.html"); ?>
			<div class="icone-carregamento"></div>
			<div class="listagem">
				<div class="alinhamento-listagem">
				</div>
			</div>
			<span class="btn-add">
				+
			</span>
			<span class="btn-mover">
				<img src="<?php echo DIRIMG.'btnmover.png'; ?>"/>
			</span>
			<div class="interface-adicionar">
				<input class="inp-url-add" type="url" name="link" placeholder="Link da imagem" required autocomplete="off" />
				<select class="select-ctg-add" name="categoria">
					<option value="ads">Ads</option>
					<option value="emblemas">Emblema</option>
					<option value="headers">Header</option>
					<option value="logos">Logo</option>
					<option value="variadas">Variada</option>
				</select>
			</div>
			<div class="info-scripts">
				<span class="retorno-script"></span>
			</div>
			<div class="interface-organizadora">
				<div class="interface-content">
					
				</div>
				<span class="btn-fechar-org">
					x
				</span>
			</div>
			<div class="up-paste">
				<span class="info-preview">Largura: %largura%px | Altura: %altura%px</span>
				<div class="preview-img">
					<img src="https://cdn.discordapp.com/attachments/516830457912885269/899717892260642856/unknown.png" />
				</div>
			</div>
		</main>
		<script>
			var token = "<?php echo $_SESSION['tokenPainel']; ?>";
		</script>
		<script src="<?php echo DIRJS."painel/listagem.js?v=".VERSION; ?>"></script>
		<script src="<?php echo DIRJS."painel/menu.js?v=".VERSION; ?>"></script>
		<script src="<?php echo DIRJS."painel/fetcharts.js?v=".VERSION; ?>"></script>
		<script src="<?php echo DIRJS."painel/dragdrop.js?v=".VERSION; ?>"></script>
		<script src="<?php echo DIRJS."painel/functions.js?v=".VERSION; ?>"></script>
		<script src="<?php echo DIRJS."painel/main.js?v=".VERSION; ?>"></script>
	</body>
</html>