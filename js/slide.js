class Slide {
	constructor(){
		//Atributos
		this.fetchArts = null;

		//Atributos de renderização
		this.slideContentHorizontal = document.querySelector(".slide-conteudo");
		this.slideContentVertical = document.querySelector(".slide-conteudo-vertical");

		this.imgInicial = document.querySelector(".img-inicial");

		this.expositorVertical = document.querySelector(".expositor-vertical");
		this.expositorHorizontal = document.querySelector(".expositor-horizontal");

		this.iconLoadVertical = document.querySelector(".icone-carregamento-vertical");
		this.iconLoadHorizontal = document.querySelector(".icone-carregamento");

		this.loading = false;
		this.statusSlide = false;
		this.activeCategory = null;
		this.links = [];

		//Atributos Interação do Slide
		this.imgsContainer = null;
		this.slideContent = null;
		this.voltar = document.querySelector(".voltar");
		this.proxima = document.querySelector(".proxima");

		this.imgNumber = null;
		this.score = null;
		this.distance = null;
		this.moviments = null;
		this.setSlideEvent = false;

		//Atributos para zoom
		this.zooms = null;
		this.zoomContent = null;
		this.imageZoom = null;
		this.windowSize = null;
		this.setZoomEvent = false;

		//Zooms emblemas
		this.zoomsEmb = null;
		this.tlInvEmb = null;

		//OpenSpecific
		this.idUrl = null;

		//Link direto
		this.specificCategory = null;
		this.specificArt = null;
		this.idArts = [];

		//Botão compartilhar
		this.botaoCompartilhar = document.querySelectorAll(".btn-compartilhar img");
		this.textarea = document.createElement("textarea");
		this.linkCopiado = document.querySelectorAll(".link-copiado");
		this.animationLinkCopiado = false;

		var copyLink = () =>{
			var specificLink = `${dirpage}?categoria=${this.specificCategory}&id=${this.specificArt}`;
			this.textarea.setAttribute("id", "textareainv");
			this.textarea.value = specificLink;
			document.body.appendChild(this.textarea);
			this.textarea.select();
			document.execCommand("copy");
			if(this.animationLinkCopiado === false){
				this.linkCopiado[0].style.width = "150px";
				this.animationLinkCopiado = true;
			}
			setTimeout(() => {
				if(this.animationLinkCopiado){
					this.linkCopiado[0].style.width = "0px";
					this.animationLinkCopiado = false;
				}
			}, 1500);
		}

		var copyLinkEmb = () => {
			var specificLinkEmb = `${dirpage}?categoria=emblemas`;
			this.textarea.setAttribute("id", "textareainv");
			this.textarea.value = specificLinkEmb;
			document.body.appendChild(this.textarea);
			this.textarea.select();
			document.execCommand("copy");
			if(this.animationLinkCopiado === false){
				this.linkCopiado[1].style.width = "150px";
				this.animationLinkCopiado = true;
			}
			setTimeout(() => {
				if(this.animationLinkCopiado){
					this.linkCopiado[1].style.width = "0px";
					this.animationLinkCopiado = false;
				}
			}, 1500);
		}

		this.botaoCompartilhar[0].addEventListener("click", copyLink);
		this.botaoCompartilhar[1].addEventListener("click", copyLinkEmb);

		//copyright
		this.copyright = document.querySelector(".creditos");

	}

	setInstances(fetchArts){
		this.fetchArts = fetchArts;
	}

	loadSlide(category){
		if(this.activeCategory !== category){
			this.activeCategory = category;
			this.specificCategory = category;
			this.links = [];
			this.loading = true;

			if(this.statusSlide === false){
				this.imgInicial.style.display = "none";
				this.statusSlide = true;
			}

			if(category === "emblemas"){
				this.expositorHorizontal.style.display = "none";
				this.expositorVertical.style.display = "flex";

				this.iconLoadVertical.style.display =  "block";
				this.slideContentVertical.style.transition = "opacity 0s";
				this.slideContentVertical.style.opacity = "0";
				this.slideContentVertical.innerHTML = "";
			}else{
				this.expositorVertical.style.display = "none";
				this.expositorHorizontal.style.display = "flex";

				this.iconLoadHorizontal.style.display =  "block";
				this.slideContentHorizontal.style.transition = "opacity 0s";
				this.slideContentHorizontal.style.opacity = "0";
				this.slideContentHorizontal.style.left = "0px";
				this.slideContentHorizontal.innerHTML = "";
			}

			this.copyright.style.right = "-55px";
			this.fetchArts.fetchPosts("scripts/listar.php", category);
		}
	}

	renderArts(data, category){
		this.idArts = [];
		data.forEach((args) => {
			switch(category){
				case "emblemas":
					var newPost = document.createElement("div");
					newPost.className = "emb-cnt";

					var newImg = document.createElement("img");
					newImg.src = args['link'];

					var newInv = document.createElement("div");
					newInv.className = "tela-invisivel-emb";

					newPost.appendChild(newImg);
					newPost.appendChild(newInv);

					this.slideContentVertical.appendChild(newPost);
					break;
				default:
					var newPost = document.createElement("div");
					newPost.className = "img-container";

					var newImg = document.createElement("img");
					newImg.src = args['link'];

					var newInv = document.createElement("div");
					newInv.className = "tela-invisivel clickzoom";

					newPost.appendChild(newImg);
					newPost.appendChild(newInv);

					this.slideContentHorizontal.appendChild(newPost);
					this.idArts.push(args['id']);

					if(args['ordem'] == 1){
						this.specificArt = args['id'];
					}

					break;
			}
			this.links.push(args["link"]);
		});

		this.setTimeLoad(category);
		this.interactionSlide();
		this.zoomSlide();
		if(this.idUrl !== 0){
			this.openSpecificArt(this.idUrl);
		}

	}

	setTimeLoad(category){
		if(category == "emblemas"){
			setTimeout(() => {
				this.iconLoadVertical.style.display = "none";
				this.slideContentVertical.style.transition = "opacity 1s, left 1s";
				this.slideContentVertical.style.opacity = "1";
				this.loading = false;
			}, 1000);
		}else{
			setTimeout(() => {
				this.iconLoadHorizontal.style.display = "none";
				this.slideContentHorizontal.style.transition = "opacity 1s, left 1s";
				this.slideContentHorizontal.style.opacity = "1";
				this.loading = false;
			}, 1000);
		}
	}

	interactionSlide(){
		this.imgsContainer = document.querySelectorAll(".img-container");
		this.slideContent = document.querySelector(".slide-conteudo");

		this.imgNumber = this.imgsContainer.length;
		this.score = 1;
		this.distance = 0;
		this.moviments = true;

		if(this.setSlideEvent === false){
			var proximaArt = () => {
				if(this.moviments == true){
					this.moviments = false;
					if(this.score < this.imgNumber){
						this.distance += -600;
						this.slideContent.style.left = this.distance+"px";
						this.score++;
						this.specificArt = this.idArts[this.score-1];
					}else{
						this.distance = 0;
						this.slideContent.style.left = this.distance+"px";
						this.score = 1;
						this.specificArt = this.idArts[this.score-1];
					}
					setTimeout(() => {
						this.moviments = true;
					}, 800);
				}
			}

			var voltarArt = () => {
				if(this.moviments == true){
					this.moviments = false;
					if(this.score != 1){
						this.distance += 600;
						this.slideContent.style.left = this.distance+"px";
						this.score--;
						this.specificArt = this.idArts[this.score-1];
					}else{
						this.distance = -600 * (this.imgNumber - 1);
						this.slideContent.style.left = this.distance+"px";
						this.score = this.imgNumber;
						this.specificArt = this.idArts[this.score-1];
					}
					setTimeout(() => {
						this.moviments = true;
					}, 800);
				}
			}

			this.proxima.addEventListener("click", proximaArt, false);
			this.voltar.addEventListener("click", voltarArt, false);
			this.setSlideEvent = true;
		}
		
	}

	zoomSlide(){
		this.zooms = document.querySelectorAll(".clickzoom");
		this.zoomContent = document.querySelector(".zoom");
		this.imageZoom = document.querySelector(".img-zoom");
		this.windowSize = [window.innerWidth, window.innerHeight];

		var openZoom = () => {
			this.zoomContent.style.visibility = "hidden";
			this.imageZoom.src = "";
		}

		this.zooms.forEach((element, index) => {
			element.addEventListener("click", () => {
				var img = new Image();
				img.src = this.links[index];
				var imgWidth = img.width;
				var imgHeight = img.height;

				if(imgWidth > this.windowSize[0]){
					this.zoomContent.style.justifyContent = "flex-start";
				}else{
					this.zoomContent.style.justifyContent = "center";
				}

				if(imgHeight > this.windowSize[1]){
					this.zoomContent.style.alignItems = "flex-start";
				}else{
					this.zoomContent.style.alignItems = "center";
				}

				this.zoomContent.style.visibility = "visible";
				this.imageZoom.src = this.links[index];
			});
		});

		if(this.setZoomEvent === false){
			this.zoomContent.addEventListener("click", openZoom, false);
			this.setZoomEvent = true;
		}
	}

	zoomEmb(){
		this.zoomsEmb = document.querySelectorAll(".zoomEmb");
		this.tlInvEmb = document.querySelectorAll(".tela-invisivel-emb");
	}

	openSpecificCategory(category, id){
		this.loadSlide(category);
		this.idUrl = id;

	}

	openSpecificArt(id){
		if(!isNaN(id)){
			this.idArts.forEach((element, index) => {
				if(this.idUrl == element){
					this.specificArt = id;
					if((index+1) > 1){
						var pxs = index*-600;
						this.score = index+1;
						this.distance = pxs;
						this.slideContent.style.left = pxs+"px";
					}
				}
			});
		}

		this.idUrl = 0;
	}
}