class FetchArts {
	constructor(){
		//Atributos
		this.listagem = null;
	}

	setInstances(listagem){
		this.listagem = listagem;
	}

	fetchPosts(api, category){
		fetch(api, {
			method: "POST",
			body: JSON.stringify({
				categoria: category,
				typefetch: 1
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			this.listagem.renderArts(data);
		})
		.catch((error) => {
			console.error(`Houve um error[Fetch/Catch]: ${error}`);
		});
	}
}