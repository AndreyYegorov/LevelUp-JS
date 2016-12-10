;(function() {
	'use strict';

	let peopleNum = +prompt('Введите номер персонажа от 1 до 88');

	if(!isNaN(peopleNum) && peopleNum > 0 && peopleNum <= 88) {
		let apiUrl = "http://swapi.co/api/",
        	apiPeopleUrl = `people/${peopleNum}/`;

        	getPeopleApi(apiUrl, apiPeopleUrl);
	}	
	else {
		alert('Вы ввели некорректное значения');
	}

	function getPeopleApi(apiUrl, apiPeopleUrl) {
		fetch(`${apiUrl}${apiPeopleUrl}`)
			.then(res => res.json())
			.then(res => {
				let request = [res];

				return request;
			})
			.then(res => {
				let req = res.map(character => {
					let name = character.name,
						getFilms = character.films.map(url => fetch(url));

					return Promise.all(getFilms)
						.then(res => {
			                let parsed = res.map(response => response.json());

			                return Promise.all(parsed)
			                	.then(res => {
			                		let getSpecies = character.species.map(url => fetch(url)),
					            		films = res;

					            	return Promise.all(getSpecies)
					            		.then(res => {
							            	let parsed = res.map(response => response.json());

							            	return Promise.all(parsed)
							            		.then(res => {
							            			let speciesInfo = res.map(species => {
							            				let speciesname = species.name,
							            					speciesLanguage = species.language,
							            					getPeople = species.people.map(url => fetch(url));

							            					return Promise.all(getPeople)
							            						.then(res => {
							            							let parsed = res.map(response => response.json());

							            							return Promise.all(parsed)
							            						})
							            						.then(res => ({
							            							speciesname,
							            							speciesLanguage,
							            							speciesPeople: res
							            						}));
							            			});

							            			return Promise.all(speciesInfo);
							            		})
							            		.then(res => ({
							            			name,
							            			films,
							            			speciesInfo: res
							            		}));
							            });	
					            });
			            });
				});

				return Promise.all(req);
			})
			.then(function(res) {
				res.forEach(result => {
					console.log(`
Name: ${result.name};
Films: ${result.films.map(film => film.title).join(', ')};
Species: ${result.speciesInfo.map(species => species.speciesname).join(', ')};
language: ${result.speciesInfo.map(species => species.speciesLanguage).join(', ')};
Same origin: ${result.speciesInfo.map(species => species.speciesPeople.map(people => people.name).join(', ')).join(', ')}.`
								);
				});
			});
	}	
})();