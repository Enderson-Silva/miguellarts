class ultimasPostagens {
	constructor(){
		//atributos
		this.slideUltimas = document.querySelector(".slide-ultimas");
		this.itensUltimas = [];
		this.idUltimas = [];
		this.categoryUltimas = [];
		this.typeFetch = 2;
		this.count = 0;
		this.score = 1;

		this.slide = null;
		this.fetchArts = null;

		window.onload = () => {
			this.fetchUltimas();
		}
	}

	setInstances(slide, fetch){
		this.slide = slide;
		this.fetchArts = fetch;
	}

	fetchUltimas(){
		fetch("scripts/listar.php", {
			method: "POST",
			body: JSON.stringify({
				typefetch: this.typeFetch
			}),
			headers: {
				'Content-Type':'application/json'
			}
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			this.renderUltimas(data);
		})
		.catch((error) => {
			console.error(`Houve um erro ao executar o fetch -> ${error}`);
		})
	}

	renderUltimas(data){
		data.forEach((args) => {
			this.count++;
			var newItem = document.createElement("div");
			newItem.setAttribute("class", "item-slide-ultimas");

			var newImg = document.createElement("img");
			newImg.src = args['link'];

			var newInv = document.createElement("div");
			newInv.setAttribute("class", "tl-inv-ultimas");

			newItem.appendChild(newImg);
			newItem.appendChild(newInv);

			this.slideUltimas.appendChild(newItem);
			this.itensUltimas.push(newInv);
			this.idUltimas.push(args['id']);
			this.categoryUltimas.push(args['categoria']);
		});
		setTimeout(() => {
			this.animationUltimas();
		}, 2000);
		this.setOpenArt();
	}

	setOpenArt(){
		this.itensUltimas.forEach((element, index) => {
			element.addEventListener("click", () => {
				this.slide.openSpecificCategory(this.categoryUltimas[index], this.idUltimas[index]);
			});
		});
	}

	animationUltimas(){
		var time = 2000*this.count;
		var height = this.slideUltimas.offsetHeight-400;
		var scrollOn = true;
		var anime = this.slideUltimas.animate([
			{
				transform: "translateY(0px)"
			},
			{
				transform: `translateY(-${height}px)`
			}
		], {
			easing: 'linear',
			fill: 'forwards',
			duration: time

		});

		var reverseAnime = () => {
			scrollOn = false;
			setTimeout(() => {
				anime.reverse();
				scrollOn = true;
			}, 2000);
		}

		anime.onfinish = reverseAnime;

		this.slideUltimas.addEventListener("mouseover", () => {
			anime.pause();
		});

		this.slideUltimas.addEventListener("mouseout", () => {
			if(scrollOn){
				anime.play();
			}
		});
	}
}