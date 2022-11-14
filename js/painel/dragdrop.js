class DragDrop {
	constructor(){
		//Atributos
		this.btnMover = document.querySelector(".btn-mover");
		this.btnFecharOrg = document.querySelector(".btn-fechar-org");
		this.interfaceOrganizadora = document.querySelector(".interface-organizadora");
		this.pai = document.querySelector(".interface-content");
		this.listagem = null;
		this.functions = null;
		this.elementoArrastado;
		this.elementoTroca;
		this.posicaoElement;
		this.posicaoMouse = [];

		//Chamada de função
		this.setEvents();
	}
	setInstances(listagem, functions){
		this.listagem = listagem;
		this.functions = functions;
	}

	setEvents(){
		this.btnMover.addEventListener("click", () => {
			this.interfaceOrganizadora.style.display = "flex";
			this.pai.innerHTML = "";
			this.fetchDrags(this.listagem.activeCategory);
		});

		this.btnFecharOrg.addEventListener("click", () => {
			this.interfaceOrganizadora.style.display = "none";
			this.saveOrder(this.listagem.activeCategory);
		});
	}

	setDragDropEvent(){
		var elementos = document.querySelectorAll(".itensOrg");

		elementos.forEach((item) => {
			item.addEventListener("dragstart", () => {
				item.style.backgroundColor = "#162415";
				this.elementoArrastado = item;
			});

			item.addEventListener("dragend", () => {
				item.style.backgroundColor = "#151924";
			});

			item.addEventListener("dragenter", (e) => {
				this.elementoTroca = item;
				this.posicaoElement = item.getBoundingClientRect();
				if(this.elementoArrastado != this.elementoTroca){
					this.posicaoMouse[0] = e.clientX;
					this.posicaoMouse[1] = e.clientY;
					if(this.posicaoMouse[1] < (this.posicaoElement.y + (this.posicaoElement.height / 2))){
						this.pai.insertBefore(this.elementoArrastado, item);
					}else if(this.posicaoMouse[1] > (this.posicaoElement.y + (this.posicaoElement.height / 2))){
						this.pai.insertBefore(this.elementoArrastado, item.nextSibling);
					}
				}
			});

			item.addEventListener("dragover", (e) => {
				this.elementoTroca = item;
				this.posicaoElement = item.getBoundingClientRect();
				if(this.elementoArrastado != this.elementoTroca){
					this.posicaoMouse[0] = e.clientX;
					this.posicaoMouse[1] = e.clientY;
					if(this.posicaoMouse[1] < (this.posicaoElement.y + (this.posicaoElement.height / 2))){
						this.pai.insertBefore(this.elementoArrastado, item);
					}else if(this.posicaoMouse[1] > (this.posicaoElement.y + (this.posicaoElement.height / 2))){
						this.pai.insertBefore(this.elementoArrastado, item.nextSibling);
					}
				}
			});
		});
	}

	fetchDrags(categoria){
		fetch("../scripts/listar.php", {
			method: "POST",
			body: JSON.stringify({
				categoria: categoria,
				typefetch: 1
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if(data.hasOwnProperty("error")){
				this.functions.showMessage("error", data['error']);
			}else if(data.hasOwnProperty("aviso")){
				this.functions.showMessage("aviso", data['aviso']);
			}
			this.renderDrags(data);
		})
		.catch((error) => {
			console.error(`Houve um error[Fetch/Catch] -> ${error}`);
		});
	}

	saveOrder(categoria){
		var itensOrg = document.querySelectorAll(".idOrdem");
		var ids = [];

		itensOrg.forEach((element) => {
			ids.push(element.innerHTML);
		});

		fetch("../scripts/salvarordem.php", {
			method: "POST",
			body: JSON.stringify({
				ids: ids,
				token: token
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if(data.hasOwnProperty("error")){
				this.functions.showMessage("error", data['error']);
			}else if(data.hasOwnProperty("aviso")){
				this.functions.showMessage("aviso", data['aviso']);
			}
			this.listagem.activeCategory = null;
			this.listagem.listarArts(categoria);
		})
		.catch((error) => {
			console.error(`Houve um error[Fetch/Catch] -> ${error}`);
		});
	}

	renderDrags(data){
		data.forEach((args) => {
			this.pai.insertAdjacentHTML("beforeend", `<div class="itensOrg" draggable="true">
										<div class="imgOrg">
											<img src="${args['link']}" ondragstart="return false"/>
										</div>
										<div class="infosOrg">
											<span>Link: ${args['link']}</span>
											<span>Categoria: ${args['categoria']}</span>
											<span class="idOrdem">${args['id']}</span>
										</div>
									</div>`);
		});

		this.setDragDropEvent();
	}
}