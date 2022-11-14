class Listagem {
	constructor(){
		//atributos
		this.fetchArts = null;
		this.functions = null;
		this.activeCategory = null;
		this.contentListagem = document.querySelector(".alinhamento-listagem");
		this.iconLoad = document.querySelector(".icone-carregamento");

		//Atributos para excluir/editar
		this.botoesEditar = null;
		this.botoesExcluir = null;
		this.interfaceEditar = null;
		this.editarSalvar = null;
		this.editarCancelar = null;
		this.interfaceExcluir = null;
		this.excluirExcluir = null;
		this.excluirCancelar = null;
		this.idExcluir = null;
		this.categoriaExcluir = null;
		this.idEditar = null;
		this.categoriaEditar = null;
		this.linkTextarea = null;
		this.ids = [];
	}

	setInstances(fetchArts, functions){
		this.fetchArts = fetchArts;
		this.functions = functions;
	}

	listarArts(category){
		if(this.activeCategory !== category){
			this.activeCategory = category;
			this.contentListagem.style.transition = "opacity 0s";
			this.contentListagem.style.opacity = "0";
			this.iconLoad.style.display = "block";
			this.contentListagem.innerHTML = "";
			this.fetchArts.fetchPosts("../scripts/listar.php", category);
		}
	}

	renderArts(data){
		data.forEach((args) => {
			var selectedCategoria;
			switch(args['categoria']){
				case "ads":
					selectedCategoria = `<option value="ads" selected>Ads</option>
									<option value="emblemas">Emblema</option>
									<option value="logos">Logo</option>
									<option value="headers">Header</option>
									<option value="variadas">Variada</option>`;
				break;
				case "emblemas":
					selectedCategoria = `<option value="ads">Ads</option>
									<option value="emblemas" selected>Emblema</option>
									<option value="logos">Logo</option>
									<option value="headers">Header</option>
									<option value="variadas">Variada</option>`;
				break;
				case "logos":
					selectedCategoria = `<option value="ads">Ads</option>
									<option value="emblemas">Emblema</option>
									<option value="logos" selected>Logo</option>
									<option value="headers">Header</option>
									<option value="variadas">Variada</option>`;
				break;
				case "headers":
					selectedCategoria = `<option value="ads">Ads</option>
									<option value="emblemas">Emblema</option>
									<option value="logos">Logo</option>
									<option value="headers" selected>Header</option>
									<option value="variadas">Variada</option>`;
				break;
				case "variadas":
					selectedCategoria = `<option value="ads">Ads</option>
									<option value="emblemas">Emblema</option>
									<option value="logos">Logo</option>
									<option value="headers">Header</option>
									<option value="variadas" selected>Variada</option>`;
				break;
			}

			this.contentListagem.insertAdjacentHTML("beforeend",`
				<div class="itens">
					<div class="imagemItens">
						<img src="${args['link']}"/>
					</div>
					<div class="botoesItens">
						<span class="botaoEditar">Editar</span>
						<span class="botaoExcluir">Excluir</span>
					</div>
					<div class="interface-editar">
						<div class="campo-link-editar">
							<textarea class="linkTextarea">${args['link']}</textarea>
						</div>
						<div class="select-categoria-editar">
							<select class="categoriaEditar" name="categoria">
								${selectedCategoria}
							</select>
						</div>
						<div class="botoes-editar">
							<span class="editar-cancelar">Cancelar</span>
							<span class="editar-salvar">Salvar</span>
						</div>
						<input class="idEditar" type="hidden" name="idImagem" value="${args['id']}"/>
					</div>
					<div class="interface-excluir">
						<div class="mensagem-confirmar">
							<p>Você tem certeza que deseja excluir essa postagem?</p>
						</div>
						<div class="botoes-excluir">
							<span class="excluir-excluir">Excluir</span>
							<span class="excluir-cancelar">Cancelar</span>
						</div>
						<input class="idExcluir" type="hidden" name="idImagem" value="${args['id']}"/>
						<input class="categoriaExcluir" type="hidden" name="categoria" value="${args['categoria']}"/>
					</div>
				</div>
			`);
		});

		this.setEvents();

	}

	setEvents(){
		this.botoesEditar = document.querySelectorAll(".botaoEditar");
		this.botoesExcluir = document.querySelectorAll(".botaoExcluir");
		this.interfaceEditar = document.querySelectorAll(".interface-editar");
		this.editarSalvar = document.querySelectorAll(".editar-salvar");
		this.editarCancelar = document.querySelectorAll(".editar-cancelar");
		this.interfaceExcluir = document.querySelectorAll(".interface-excluir");
		this.excluirExcluir = document.querySelectorAll(".excluir-excluir");
		this.excluirCancelar = document.querySelectorAll(".excluir-cancelar");
		this.idExcluir = document.querySelectorAll(".idExcluir");
		this.categoriaExcluir = document.querySelectorAll(".categoriaExcluir");
		this.idEditar = document.querySelectorAll(".idEditar");
		this.categoriaEditar = document.querySelectorAll(".categoriaEditar");
		this.linkTextarea = document.querySelectorAll(".linkTextarea");

		this.botoesEditar.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.interfaceEditar[index].style.visibility = "visible";
				this.interfaceEditar[index].style.transform = "scale(1)";

			});
		});

		this.editarSalvar.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.functions.editImg(this.linkTextarea[index].value, this.categoriaEditar[index].options[this.categoriaEditar[index].selectedIndex].value, this.idEditar[index].value);
			});
		});

		this.editarCancelar.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.interfaceEditar[index].style.visibility = "hidden";
				this.interfaceEditar[index].style.transform = "scale(0)";
			});
		});

		this.botoesExcluir.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.interfaceExcluir[index].style.visibility = "visible";
				this.interfaceExcluir[index].style.transform = "scale(1)";
			});
		});

		this.excluirCancelar.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.interfaceExcluir[index].style.visibility = "hidden";
				this.interfaceExcluir[index].style.transform = "scale(0)";
			});
		});

		this.excluirExcluir.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.functions.deleteImg(this.idExcluir[index].value, this.categoriaExcluir[index].value);
			});
		});

		this.contentListagem.style.transition = "opacity 1s";
		this.iconLoad.style.display = "none";
		this.contentListagem.style.opacity = "1";
	}
}