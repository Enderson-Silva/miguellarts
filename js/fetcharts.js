class FetchArts {

	constructor(){
		this.slide = null;
		this.typeFetch = 1;
	}

	setInstances(slide){
		this.slide = slide;
	}

	fetchPosts(api, categoria){
		if(categoria !== undefined){
			fetch(api, {
				method: "POST",
				body: JSON.stringify({
					categoria: categoria,
					typefetch: this.typeFetch
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if(data.hasOwnProperty("aviso")){
					console.log(data["aviso"]);
				}else if(data.hasOwnProperty("error")){
					console.error(data["error"]);
				}else{
					this.slide.renderArts(data, categoria);
				}
			})
			.catch((error) => {
				console.error(`Houve um erro ao executar o fetch -> ${error}`);
			});
			return true;
		}
	}

}