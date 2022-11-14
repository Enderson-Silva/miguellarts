<?php

	require_once("config/config.php");
	$headPersonalizado = null;

	if(isset($_GET['categoria']) AND isset($_GET['id'])){
		try{
			$con = new PDO("mysql:host=".HOST.";dbname=".DB, USER, PASSWORD);

			$buscar = $con->prepare("SELECT link, categoria FROM arts WHERE id=:id AND categoria=:categoria LIMIT 1");
			$buscar->bindValue(":id", $_GET['id'], PDO::PARAM_INT);
			$buscar->bindValue(":categoria", $_GET['categoria'], PDO::PARAM_STR);
			$buscar->execute();

			if($buscar->rowCount()){
				$item = $buscar->fetch(PDO::FETCH_ASSOC);
				$arts = ["link" => $item['link'], "categoria" => $item['categoria']];
				$headPersonalizado = true;
			}
		}catch(PDOException $e){
			$headPersonalizado = false;
		}

	}else{
		$headPersonalizado = false;
	}

?>

<!DOCTYPE html>

<html lang="pt-br">
	<head>
		<meta charset="utf-8"/>
		<meta name="author" content="Wiredstone & Miguella"/>
		<meta name="keywords" content="Expositor, pixel-Art, criação, pintura"/>
		<meta name="copyright" content="© Miguella(Mi#5667) 2021" />
		<meta property="og:type" content="website">
		<meta property="og:locale" content="pt-BR">
		<meta property="og:url" content="https://miguellarts.ml">
		<meta name="theme-color" content="#d87644">
		<meta property="og:image:type" content="image/png">
		<meta name="twitter:site" content="@MiguellaArt">
		<?php
			if($headPersonalizado){
				require_once("include/head-personalizado.php");
			}else{
				require_once("include/head.html");
			}
		?>
		<title>Miguella Art's - Expositor</title>
		<link rel="stylesheet" href="<?php echo DIRCSS."style.css?v=".VERSION; ?>"/>
		<link rel="short icon" href="<?php echo DIRIMG.'favicon.png'; ?>"/>
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
		<header class="cabecalho">
			<div class="cabecalho-conteudo">
				<h1>
					<a href="<?php echo DIRPAGE; ?>" class="vlt-inicio">
						<span class="titulo1">MIGUELLA</span>
						<span class="titulo2">ARTS</span>
					</a>
				</h1>
				<div class="rds-sociais">
					<a href="https://twitter.com/MiguellaArt" target="_blank">
						Twitter
					</a>	
				</div>
			</div>
		</header>
		<main>
			<?php include_once(DIRINCLUDE."menu.html"); ?>
			<div class="img-inicial">
				<div class="inicial-left">
					<img src="<?php echo DIRIMG.'miguella.png'; ?>" ondragstart="return false" />
				</div>
				<div class="inicial-right">
					<div class="titulo-ultimas">
						<div class="barrinha-ultimas"></div>
						<span>ultimas Postagens</span>
					</div>
					<div class="ultimas-post">
						<div class="slide-ultimas">
						</div>
					</div>
				</div>
			</div>
			<div class="expositor-horizontal">
				<div class="expositor-fundo">
					<div class="botao-slide voltar">
						<img src="<?php echo DIRIMG.'btnesquerdo-escuro.png'; ?>" ondragstart="return false" />
					</div>
					<div class="botao-slide proxima">
						<img src="<?php echo DIRIMG.'btndireito-escuro.png'; ?>" ondragstart="return false" />
					</div>
					<div class="slide-horizontal">
						<div class="slide-conteudo">
						</div>
						<div class="icone-carregamento"></div>
					</div>
					<div class="btn-compartilhar">
						<img src="<?php echo DIRIMG.'compartilhar-escuro.png'; ?>" ondragstart="return false" />
						<div class="link-copiado">Link Copiado!</div>
					</div>
				</div>
			</div>
			<div class="expositor-vertical">
				<div class="expositor-fundo">
					<div class="slide-vertical" style="overflow: auto;">
						<div class="slide-conteudo-vertical">
							<div class="emb-cnt">
								<img class="zoomEmb" src="https://i.imgur.com/dD7nvM2.png">
								<div class="tela-invisivel-emb"></div>
							</div>
						</div>
						<div class="icone-carregamento-vertical"></div>
					</div>
					<div class="btn-compartilhar">
						<img src="<?php echo DIRIMG.'compartilhar-escuro.png'; ?>" ondragstart="return false" />
						<div class="link-copiado">Link Copiado!</div>
					</div>
				</div>
			</div>
			<div class="zoom">
				<div class="tela-img">
					<img class="img-zoom" src=""/>
					<div class="tela-invisivel offzoom"></div>
				</div>
			</div>
			<div class="djuntor">
				<img class="djuntorEv" src="<?php echo DIRIMG.'djuntor-desativo.png'; ?>" ondragstart="return false" />
			</div>
			<div class="creditos">
				<span>Miguella &copy; 2021 - Todos os direitos reservados à Miguella (Mi#5667)</span>
			</div>
		</main>
			<script>
				var dirpage = "<?php echo DIRPAGE; ?>";
			</script>
			<script src="<?php echo DIRJS."menu.js?v=".VERSION; ?>"></script>
			<script src="<?php echo DIRJS."slide.js?v=".VERSION; ?>"></script>
			<script src="<?php echo DIRJS."djuntor.js?v=".VERSION; ?>"></script>
			<script src="<?php echo DIRJS."ultimas.js?v=".VERSION; ?>"></script>
			<script src="<?php echo DIRJS."fetcharts.js?v=".VERSION; ?>"></script>
			<script src="<?php echo DIRJS."main.js?v=".VERSION; ?>"></script>
	</body>
</html>