window.onload = function(){
	if(typeof(Storage) !== "undefined"){
		if(localStorage.getItem("tema") !== null){
			if(localStorage.getItem("tema") == "claro"){
				djuntor.src = "img/djuntor-ativo.png";
				djuntorEstado = true;
				document.documentElement.style.setProperty("--cor-primaria", "#c0cbdc");
				document.documentElement.style.setProperty("--cor-secundaria", "#8b9bb4");
				document.documentElement.style.setProperty("--cor-terciaria", "#5a6988");
				document.documentElement.style.setProperty("--cor-barras", "#6fbbca");
				document.documentElement.style.setProperty("--cor-scroll", "#5a6988");

				btnvoltar.src = "img/btnesquerdo-claro.png";
				btnproxima.src = "img/btndireito-claro.png";

				btnCompartilhar.forEach((element) => {
					element.src = "img/compartilhar-claro.png";
				});

				expositorFundo.forEach((element) => {
					element.style.backgroundImage = dtlClaro;
				});
			}else{
				djuntor.src = "img/djuntor-desativo.png";
				djuntorEstado = false;
				document.documentElement.style.setProperty("--cor-primaria", "#36393f");
				document.documentElement.style.setProperty("--cor-secundaria", "#2e3036");
				document.documentElement.style.setProperty("--cor-terciaria", "#25272b");
				document.documentElement.style.setProperty("--cor-barras", "#335b62");
				document.documentElement.style.setProperty("--cor-scroll", "#25272b");

				btnvoltar.src = "img/btnesquerdo-escuro.png";
				btnproxima.src = "img/btndireito-escuro.png";

				btnCompartilhar.forEach((element) => {
					element.src = "img/compartilhar-escuro.png";
				});

				expositorFundo.forEach((element) => {
					element.style.backgroundImage = dtlEscuro;
				});
			}
		}
	}
}


var djuntor = document.querySelector(".djuntorEv");
var btnvoltar = document.querySelector(".voltar img");
var btnproxima = document.querySelector(".proxima img");
var expositorFundo = document.querySelectorAll(".expositor-fundo");

var dtlClaro = "url('img/dtlspesquerdo-claro.png'), url('img/dtlspdireito-claro.png'), url('img/dtlindireito-claro.png'), url('img/dtlinesquerdo-claro.png')";
var dtlEscuro = "url(img/dtlspesquerdo-escuro.png), url(img/dtlspdireito-escuro.png), url(img/dtlindireito-escuro.png), url(img/dtlinesquerdo-escuro.png)";

var barraVertical = document.querySelector(".slide-vertical");

var btnCompartilhar = document.querySelectorAll(".btn-compartilhar img");

var djuntorEstado = false;

djuntor.addEventListener("click", () => {
	if(djuntorEstado == false){
		djuntor.src = "img/djuntor-ativo.png";
		djuntorEstado = true;
		document.documentElement.style.setProperty("--cor-primaria", "#c0cbdc");
		document.documentElement.style.setProperty("--cor-secundaria", "#8b9bb4");
		document.documentElement.style.setProperty("--cor-terciaria", "#5a6988");
		document.documentElement.style.setProperty("--cor-barras", "#6fbbca");
		document.documentElement.style.setProperty("--cor-scroll", "#5a6988");

		btnvoltar.src = "img/btnesquerdo-claro.png";
		btnproxima.src = "img/btndireito-claro.png";
		
		btnCompartilhar.forEach((element) => {
			element.src = "img/compartilhar-claro.png";
		});

		expositorFundo.forEach((element) => {
			element.style.backgroundImage = dtlClaro;
		});

		localStorage.setItem("tema", "claro");
	}else{
		djuntor.src = "img/djuntor-desativo.png";
		djuntorEstado = false;
		document.documentElement.style.setProperty("--cor-primaria", "#36393f");
		document.documentElement.style.setProperty("--cor-secundaria", "#2e3036");
		document.documentElement.style.setProperty("--cor-terciaria", "#25272b");
		document.documentElement.style.setProperty("--cor-barras", "#335b62");
		document.documentElement.style.setProperty("--cor-scroll", "#25272b");

		btnvoltar.src = "img/btnesquerdo-escuro.png";
		btnproxima.src = "img/btndireito-escuro.png";
		
		btnCompartilhar.forEach((element) => {
			element.src = "img/compartilhar-escuro.png";
		});

		expositorFundo.forEach((element) => {
			element.style.backgroundImage = dtlEscuro;
		});

		localStorage.setItem("tema", "escuro");
	}
});