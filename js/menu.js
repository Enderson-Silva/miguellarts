class Menu {
	constructor(){
		//Atributos para abrir e fechar menu
		this.iconButtonMenu = document.querySelector(".action-menu");
		this.buttonMenu = document.querySelector(".botao");
		this.menu = document.querySelector(".menu-lateral");
		this.ulMenu = document.querySelector(".ul-menu");
		this.statusMenu = false;

		//Atributos para carregar categoria/slide
		this.optionsUl = document.querySelectorAll(".li-menu");
		this.optionsUlText = ["ads", "emblemas", "headers", "logos", "variadas"];
		this.slide = null;
		this.fetchArts = null;

		//Atributos para animação do menu
		this.categorys = [".ctg1", ".ctg2", ".ctg3", ".ctg4", ".ctg5"];
		this.widthCategorys = ["44px", "148px", "114px", "78px", "120px"];
		this.animationCategorys();

	}

	setInstances(slide, fetchArts){
		this.slide = slide;
		this.fetchArts = fetchArts;
		this.setEventClick();
		this.actionItemsUl();
	}

	animationCategorys(){

		this.optionsUl.forEach((element, index) => {
			element.addEventListener("mouseover", () => {
				var ctg = document.querySelector(this.categorys[index]);
				ctg.style.width = this.widthCategorys[index];

			});
			element.addEventListener("mouseout", () => {
				var ctg = document.querySelector(this.categorys[index]);
				ctg.style.width = "0px";
			});
		});
	}

	setEventClick(){
		this.iconButtonMenu.addEventListener("click", () => {
			switch(this.statusMenu){
				case false:
					this.menu.style.width = "100%";
					this.buttonMenu.style.left = "87px";
					this.iconButtonMenu.src = "https://i.imgur.com/f0UNlm2.png";
					this.ulMenu.style.left = "0%";
					this.statusMenu = true;
					break;
				case true:
					this.menu.style.width = "40px";
					this.buttonMenu.style.left = "27px";
					this.iconButtonMenu.src = "https://i.imgur.com/eKx8ZiJ.png";
					this.ulMenu.style.left = "-100%";
					this.statusMenu =  false;
					break;
			}
		});
	}

	actionItemsUl(){
		this.optionsUl.forEach((element, index) => {
			element.addEventListener("click", () => {
				if(!this.slide.loading){
					this.slide.loadSlide(this.optionsUlText[index]);
				}
			});
		});
	}

}