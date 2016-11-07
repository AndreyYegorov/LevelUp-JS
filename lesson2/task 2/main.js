let players = 2,
	scores = [], score, scoreTotal,
	answer,
	message;

for (let i = 1; i <= players; i++) {
	score = 0; scoreTotal = 0;
	message = `Игрок${i}, введите "Y", чтобы начать игру и получить от 1 до 11 очков либо "N", чтобы отказаться.`;
	
	while(true) {
		answer = prompt(message);

		if(answer === 'Y' || answer === 'y') {
			score = getRandomInt(1, 11); scoreTotal += score;

			if(scoreTotal > 21) {
				alert(`Игрок${i}, вы набрали ${scoreTotal}, а это больше 21 очков, вы выбыли из игры... :(`);

				scoreTotal = 0;
				scores.push(scoreTotal);

				break;
			}

			message = `Игрок${i}, ваше количество очков: ${scoreTotal} введите "Y", чтобы продолжить либо "N", чтобы прекратить игру.`;
		}
		else if(answer === 'N' || answer === 'n') {
			scores.push(scoreTotal);

			break;
		}
		else {
			scores.push(scoreTotal);

			alert(`Ошибка. Игрок${i}, вы ввели неккоректные данные, ваше количество очков ${scoreTotal}, ваша игра закончена, ждите результата.`);

			break;
		}
	}
}

if(scores) {
	console.log(scores);
	
	// only for players = 2
	if(Math.max(...scores) === Math.min(...scores)) {
		alert(`Ничья, игроки набрали по ${Math.max(...scores)}`);
	}
	else {
		alert(`Выиграл Игрок${scores.indexOf(Math.max(...scores)) + 1}, который набрал ${Math.max(...scores)}`);
	}
}

function getRandomInt(min, max) {
 	return Math.floor(Math.random() * (max - min + 1) + min);
}