let messageEmail = prompt('Привет, введите пожалуйста ваш e-mail');

if(messageEmail) {
	if(messageEmail.includes('@') && messageEmail.includes('.', messageEmail.lastIndexOf('@'))) {
		let messageEmail_name = messageEmail.slice(0, messageEmail.lastIndexOf('@')),
			messageEmail_domain = messageEmail.slice(messageEmail.lastIndexOf('@') + 1, messageEmail.lastIndexOf('.')),
			messageEmail_zone = messageEmail.slice(messageEmail.lastIndexOf('.') + 1);

		if(messageEmail_name.length < 5) {
			alert('"Имя" для вашего e-mail должно содержать больше 4-х символов, перезагрузите страницу и попробуйте ещё раз.');
		}
		else if(messageEmail_domain.length < 2 || messageEmail_domain.length > 9) {
			alert('"Домен" для вашего e-mail должен содержать не менее 2-х и не более 9-и символов, перезагрузите страницу и попробуйте ещё раз.');
		}
		else if(messageEmail_zone.length < 2 || messageEmail_zone.length > 4) {
			alert('"Зона" для вашего e-mail должен содержать не менее 2-х и не более 4-х символов, перезагрузите страницу и попробуйте ещё раз.');
		}
		else {
			alert(`Поздравляем, вы ввели корректный e-mail ${messageEmail}.`);
		}
	}	
	else {
		alert('Вы ввели некорректный e-mail, перезагрузите страницу и попробуйте ещё раз.');
	}
}
else {
	alert('Вы не отправили ваш e-mail, перезагрузите страницу и попробуйте ещё раз.');	
}

// test email: emailfortesting@domain.zone