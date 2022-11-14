<?php

	#versão de upload

	define("VERSION", "0027");
	$hostOn = false;

	#Diretórios raizes

	if($hostOn){
		$PastaInterna = "";
	}else{
		$PastaInterna = "projetos/miguellarts/expositor_v11/";
	}

	define("DIRPAGE", "http://{$_SERVER['HTTP_HOST']}/{$PastaInterna}");

	if(substr($_SERVER['DOCUMENT_ROOT'], -1) == "/"){
		define("DIRREQ", "{$_SERVER['DOCUMENT_ROOT']}{$PastaInterna}");
	}else{
		define("DIRREQ", "{$_SERVER['DOCUMENT_ROOT']}/{$PastaInterna}");
	}

	#Diretórios específicos

	define("DIRIMG", DIRPAGE."img/");
	define("DIRJS", DIRPAGE."js/");
	define("DIRCSS", DIRPAGE."css/");
	define("DIRFONTE", DIRPAGE."fonte/");
	define("DIRINCLUDE", DIRREQ."include/");

	#Acesso host

	define("HOST", "localhost");
	define("USER", "root");
	define("PASSWORD", "");
	define("DB", "expositor");

?>
