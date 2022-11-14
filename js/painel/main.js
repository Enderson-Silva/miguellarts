class Main {
	constructor(){
		//atributos

		//Chamada de funções
		this.fetchArts = new FetchArts();
		this.listagem = new Listagem();
		this.menu = new Menu();
		this.dragdrop = new DragDrop();
		this.functions = new Functions();

		//Set instances
		this.listagem.setInstances(this.fetchArts, this.functions);
		this.listagem.listarArts("ads");
		this.menu.setInstances(this.listagem);
		this.fetchArts.setInstances(this.listagem);
		this.functions.setInstances(this.listagem);
		this.dragdrop.setInstances(this.listagem, this.functions);

	}

}

var main = new Main();
var active = main.listagem.activeCategory;
var listagem = main.listagem;