let getInit = +prompt('Введите стартовое число счетчика') || 0,
	getStep = +prompt('Введите шаг счетчика') || 0,
	getCall = +prompt('Введите количество повторений счетчика') || 0;

function setCounter(init, step, call) {
	if(call > 0) {
		alert(`Цикл №${call}, значение ${init}`);
		
		call--; init += step;
	
		setCounter(init, step, call);
	}
};

setCounter(getInit, getStep, getCall);