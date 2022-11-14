class Functions {
	constructor(){
		//Atributos
		this.listagem = null;
		this.infoScript = document.querySelector(".info-scripts");
		this.returnScript = document.querySelector(".retorno-script");
		this.blobImgUp = null;
		this.upload = false;
		this.previewContent = null;
		this.setEventsAdd();

		//chamada de função
		this.addImgPaste();

	}

	setInstances(listagem){
		this.listagem = listagem;
	}

	showMessage(type, message){
		if(type === "aviso"){
			this.infoScript.style.backgroundColor = "#203b20";
			this.returnScript.innerHTML = message;
			this.infoScript.style.top = "0px";
			setTimeout(() => {
				this.infoScript.style.top = "-60px";
			}, 2500);
		}else if(type === "error"){
			this.infoScript.style.backgroundColor = "#402626";
			this.returnScript.innerHTML = message;
			this.infoScript.style.top = "0px";
			setTimeout(() => {
				this.infoScript.style.top = "-60px";
			}, 2500);
		}
	}

	setEventsAdd(){
		var botaoAdicionar = document.querySelector(".btn-add");
		var interfaceAdicionar = document.querySelector(".interface-adicionar");
		var inputUrlAdd = document.querySelector(".inp-url-add");
		var selectCategoria = document.querySelector(".select-ctg-add");
		var adicionarOn = false;

		botaoAdicionar.addEventListener("click", () => {
			if(adicionarOn === false){
				adicionarOn = true;
				botaoAdicionar.style.borderTopLeftRadius = "0px";
				botaoAdicionar.style.borderBottomLeftRadius = "0px";
				interfaceAdicionar.style.width = "630px";
			}else{
				adicionarOn = false;
				botaoAdicionar.style.borderTopLeftRadius = "4px";
				botaoAdicionar.style.borderBottomLeftRadius = "4px";
				interfaceAdicionar.style.width = "0px";
				var url = inputUrlAdd.value.replace(/\s/g, "");
				if(url.length > 0){
					inputUrlAdd.value = "";
					this.uploadImg(url, selectCategoria.options[selectCategoria.selectedIndex].value);
				}
			}
		});
	}

	uploadImg(link, categoria){
		fetch("../scripts/adicionar.php", {
			method: "POST",
			body: JSON.stringify({
				link: link,
				categoria: categoria,
				token: token
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if(data.hasOwnProperty("error")){
				this.showMessage("error", data['error']);
			}else if(data.hasOwnProperty("aviso")){
				this.showMessage("aviso", data['aviso']);
			}
			this.listagem.activeCategory = null;
			this.listagem.listarArts(categoria);
		})
		.catch((error) => {
			console.error(`Houve um error[Fetch/Catch] -> ${error}`);
		});
	}

	editImg(link, categoria, id){
		fetch("../scripts/editar.php", {
			method: "POST",
			body: JSON.stringify({
				link: link,
				categoria: categoria,
				id: id,
				token: token
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if(data.hasOwnProperty("error")){
				this.showMessage("error", data['error']);
			}else if(data.hasOwnProperty("aviso")){
				this.showMessage("aviso", data['aviso']);
			}
			this.listagem.activeCategory = null;
			this.listagem.listarArts(categoria);
		})
		.catch((error) => {
			console.error(`Houve um error[Fetch/Catch] -> ${error}`);
		});
	}

	deleteImg(id, categoria){

		fetch("../scripts/excluir.php", {
			method: "POST",
			body: JSON.stringify({
				id: id,
				token: token
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if(data.hasOwnProperty("error")){
				this.showMessage("error", data['error']);
			}else if(data.hasOwnProperty("aviso")){
				this.showMessage("aviso", data['aviso']);
			}
			this.listagem.activeCategory = null;
			this.listagem.listarArts(categoria);
		})
		.catch((error) => {
			console.error(`Houve um error[Fetch/Catch] -> ${error}`);
		});
	}

	addImgPaste(){
		var reader = new FileReader();
		this.previewContent = document.querySelector(".up-paste");
		var preview = document.querySelector(".preview-img img");
		var info = document.querySelector(".info-preview");

		document.addEventListener("paste", (event) => {
			var items = event.clipboardData.items;

			for(var itemIndex in items){
				var item = items[itemIndex];
				if(item.kind == "file"){
					this.previewContent.style.display = "flex";
					this.blobImgUp = item.getAsFile();
					reader.readAsDataURL(item.getAsFile());
				}
			}
		});

		reader.addEventListener("load", (result) => {
			var img = new Image();
			img.src = result.target.result;

			img.addEventListener("load", () => {
				var textInfo = "Largura: %largura%px | Altura: %altura%px";
				var text1 = textInfo.replace("%largura%", img.width);
				var text2 = text1.replace("%altura%", img.height);

				info.innerText = text2;
				preview.src = img.src;
				this.upload = true;

			});
		});

		document.addEventListener("keydown", (event) => {
			if(event.key === "Enter"){
				this.imgurApi(this.blobImgUp);
				this.previewContent.style.display = "none";
			}

			if(event.key === "Escape"){
				this.upload = false;
				this.previewContent.style.display = "none";
			}
		});
	}

	imgurApi(blob){
		if(this.upload === true){
			this.upload = false;
			var formData = new FormData();
			formData.append("image", blob);
			fetch("https://api.imgur.com/3/image", {
				method: "post",
				headers: {
					Authorization: "Client-ID 28821415da3cbcc",
					Accept: "application/json"
				},
				body: formData
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if(data['success']){
					this.uploadImg(data['data']['link'], this.listagem.activeCategory);
				}else{
					this.showMessage("error", "Não foi possível hospedar imagem.");
				}
			})
			.catch((error) => {
				console.error(`Houve um error[Fetch/Catch] -> ${error}`);
			})
		}
	}
}