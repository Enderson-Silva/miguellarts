class Main {
	constructor(){
		//atributos
		this.urlParams = new URLSearchParams(window.location.search);
		this.params = {
			categoria: this.urlParams.get("categoria"),
			id: this.urlParams.get("id")
		}

		//chamada de funções
		this.menu = new Menu();
		this.fetchArts = new FetchArts();
		this.slide = new Slide();
		this.ultimasPostagens = new ultimasPostagens();
		this.menu.setInstances(this.slide, this.fetchArts);
		this.slide.setInstances(this.fetchArts);
		this.fetchArts.setInstances(this.slide);
		this.ultimasPostagens.setInstances(this.slide, this.fetchArts);
		this.openArt();

		//document.addEventListener('contextmenu', event => event.preventDefault());

	}

	openArt(){
		if(this.params.categoria !== null){
			var categorys = ["ads", "emblemas", "headers", "logos", "variadas"];
			if(categorys.includes(this.params.categoria.toLowerCase())){
				this.slide.openSpecificCategory(this.params.categoria, this.params.id);
				window.history.pushState("", "", "/");
			}
		}
	}
}

var main = new Main();
