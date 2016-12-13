;(function() {
	'use strict';

	let characterId = (function getCharacterId() {
		let id = +prompt('Введите номер персонажа от 1 до 88'),
			isValid = !isNaN(id) && id > 0 && id <= 88;

		if(isValid) return id;

		return getCharacterId();
	})();

	(function(url) {
		fetch(url)
			.then(res => res.json())
			.then(res => {
				let name = res.name,
					fimms = res.films,
					species = res.species;

				let filmTitlesReq = fimms.map(film => fetch(film).then(res => res.json()).then(res => res.title));

				let speciesReq = species.map(species => fetch(species).then(res => res.json()).then(res => {
					let speciesName = res.name,
						speciesLanguage = res.language,
						speciesTheSameOriginReq = res.people.map(people => fetch(people).then(res => res.json()).then(res => res));

						return Promise.all(speciesTheSameOriginReq).then(res => ({
							speciesName,
							speciesLanguage,
							speciesTheSameOrigin: res
						}));
				}));

				return Promise.all(filmTitlesReq).then(res => ({
					name,
					filmTitles: res,
					speciesReq
				}));
			})
			.then(res => {
				let name = res.name,
					filmTitles = res.filmTitles;

				return Promise.all(res.speciesReq).then(res => res[0]).then(res => ({
					name,
					filmTitles,
					speciesName: res.speciesName,
					speciesLanguage: res.speciesLanguage,
					speciesTheSameOrigin: res.speciesTheSameOrigin.map(people => people.name)
				}));
			})
			.then(res => ({
				name: res.name,
				filmTitles: res.filmTitles,
				speciesName: res.speciesName,
				speciesLanguage: res.speciesLanguage,
				speciesTheSameOrigin: res.speciesTheSameOrigin,
			}))
			.then(res => {
				console.log(`
Name: ${res.name};
Films: ${res.filmTitles.join(', ')};
Species: ${res.speciesName};
language: ${res.speciesLanguage};
Same origin: ${res.speciesTheSameOrigin.join(', ')}.`
							);
			});
	})(`http://swapi.co/api/people/${characterId}`);		
})();