;(function() {
	'use strict';

	let websocket = io('http://178.62.203.188:8888');

	let urlGIFS = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';

	let $formStart = document.querySelector('.formStart'),
		$formStart_inputName = document.querySelector('.formStart-nameInput'),
		$chat = document.querySelector('.chat'),
		$chatArea = document.querySelector('.chat-area'),
		$chatPics = document.querySelector('.chat-pics'),
		$chatForm = document.querySelector('.chat-form'),
		$chatForm_inputMessage = document.querySelector('.chat-form-messageInput'),
		$error = document.createElement('div');

	let dataChat = {
		name: '',
		message: '',
		pic: ''
	};	

	$formStart_inputName.focus();

	initGIFS(urlGIFS);

	$formStart_inputName.addEventListener('keyup', validateStartForm);
	$formStart.addEventListener('submit', onFormStartSubmit);
	$chatForm.addEventListener('submit', onChatFormSubmit);
	$chatPics.addEventListener('click', onChatPicsClick);
	websocket.on('chat message', onWebsocketChatMessage);

	function onFormStartSubmit(e) {
		e.preventDefault();

		let name = $formStart_inputName.value.trim();

		if(validateStartForm()) {
			dataChat.name = name;

			$formStart.style.display = 'none';
			$chat.style.display = 'block';
		}

		$chatForm_inputMessage.focus();
	}

	function onChatFormSubmit(e) {
		e.preventDefault();

		dataChat.message = $chatForm_inputMessage.value.trim();

		if(dataChat.message || dataChat.pic) websocket.emit('chat message', dataChat);

		if(!dataChat.pic) $chatForm_inputMessage.value = '';

		dataChat.message = ''; 
		dataChat.pic = '';
	}

	function onChatPicsClick(e) {
		let $pic = e.target;

		dataChat.pic = $pic.getAttribute('src');

		onChatFormSubmit(e);
	}

	function onWebsocketChatMessage(data) {
		let $chatLine = document.createElement('p'),
			chatLineNameHTML = `<b>${data.name}:</b>`,
			chatLineMessageHTML = `${data.message}`;

		if(data.pic) {
			chatLineMessageHTML = `<img src='${data.pic}'></img>`;
		}

		$chatLine.innerHTML = chatLineNameHTML + chatLineMessageHTML;
		
		if(data.name) $chatArea.appendChild($chatLine);

		console.log(data);
	}  

	function validateStartForm() {
		let $inputWrapper = $formStart_inputName.parentNode;

		let name = $formStart_inputName.value.trim();

		$error.className = 'formStart-error';
		$error.textContent = 'Your name must contain more than 1 symbol';

		if(name.length < 2) {
			$inputWrapper.appendChild($error);

			return false;
		}
		else {
			if($inputWrapper.querySelector('.formStart-error')) {
				$inputWrapper.removeChild($error);
			}

			return true;
		}
	}

	function initGIFS(url) {
		fetch(url)
			.then(res => res.json())
			.then(res => {
				let pics = res.data;

				pics.forEach(el => {
					let $pic = document.createElement('img'),
						pic = el.images.fixed_height,
						src = pic.url;

					$pic.setAttribute('src', src);	

					$chatPics.appendChild($pic);
				});
			});
	}
})();