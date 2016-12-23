;(function() {
	'use strict';

	let users = [
		{
			name: 'John',
			lastname: 'Dou',
			age: '30',
			id: 'user1'
		},
		{
			id: 'user2',
			name: 'Sasha',
			lastname: 'Pushkin',
			age: '33'
			
		},
		{
			name: 'Richard',
			lastname: 'Brown',
			age: '35',
			id: 'user3'
		},
		{
			name: 'Kate',
			lastname: 'Mose',
			age: '20',
			id: 'user4',
			default: true
		}
	];

	let $nav = document.querySelector('nav'),
		$link = document.querySelector('a'),
		$name = document.querySelector('.name span'),
		$lastname = document.querySelector('.lastname span'),
		$age = document.querySelector('.age span');

	let	pageIdDefault = users.find(user => user.default).id;


	renderPerson(pageIdDefault);

	$nav.addEventListener('click', userClickHandler);

	window.addEventListener('popstate', historyHandler);

	window.addEventListener('hashchange', hashHandler);


	function userClickHandler(e) {
		let $target = e.target;

		if($target.nodeName.toLowerCase() === 'a') {
			e.preventDefault();

			let pageId = $target.getAttribute('href').slice(1);

			renderPerson(pageId);
		}
	}

	function historyHandler(e) {
		if(e.state) {
			renderPerson(e.state.id);
		}
		else {
			$name.textContent = '';	
			$lastname.textContent = '';	
			$age.textContent = '';
		}
	}

	function hashHandler(e) {
		let pageId = location.pathname.slice(1);

		renderPerson(pageId);
	}

	function renderPerson(id) {
		let user = users.find(user => user.id === id),
			urlPathname = id,
			urlPropStr = '',
			userName = user.name,
			userLastname = user.lastname,
			userAge = user.age;

		for(let prop in user) {
			if(prop !== 'id') {
				if(urlPropStr !== ''){
	                urlPropStr += '&';
	            }

	            urlPropStr += `${prop}=${user[prop]}`;	
			}
        }

		if(location.pathname.slice(1) !== urlPathname) {
			history.pushState({
				id, 
				name: userName, 
				lastname: userLastname, 
				age: userAge
			}, 'title', `${location.origin}/${urlPathname}?${urlPropStr}`);
		}

		let urlHash = location.hash;

		if(urlHash) {
			let hashName = urlHash.match(/\w+(?=\=)/g)[0],
				hashValue = urlHash.match(/\=\w+/g)[0].slice(1);

			for(let prop in user) {
				if(prop === hashName) user[prop] = hashValue;
			}

			userName = user.name;
			userLastname = user.lastname;
			userAge = user.age;
		}

		$name.textContent = userName;	
		$lastname.textContent = userLastname;	
		$age.textContent = userAge;
	}
})();