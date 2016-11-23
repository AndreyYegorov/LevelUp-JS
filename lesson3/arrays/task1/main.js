let nums = [1, 2, 3, 5, 8, 13, 21, 34];
let str = ["this", "is", "a", "very", "long", "array", "which", "has", "absolutely", "no", "sense"];

// NUMS

function getSumDoubled(arr) {
	let result = arr.reduce((p, c) => p + c) * 2;
	
	return result;
}

function checkEvenNums(arr) {
	let checking = arr.some(el => el % 2 === 0);

	if(checking) {
		console.log("It has as minimum one even number inside");

		return checking;
	}
	
	console.log("It hasn't even numbers inside");

	return checking;
}

function filterNumOdd(arr) {
	let result = arr.filter(el => el % 2 !== 0);
	
	return result;
}

function getSumMessage(arr, checkingSum) {
	let sum = arr.reduce((p, c) => p + c);

	if(sum > checkingSum) {
		console.log(`The sum is greater than ${checkingSum}`);

		return true;
	}
	else {
		console.log(`The sum is less or equal to ${checkingSum}`);

		return false;
	}
}

// STRINGS

function getSentence(arr) {
	let result = arr.join(' ');
	
	return result;
}

function getArrayWithLength(arr) {
	let result = arr.map(el => `${el} - ${el.length}`);
	
	return result;
}

function filterLength(arr, minLength) {
	let result = arr.filter(el => el.length >= minLength);
	
	return result;
}

function sortLength(arr) {
	let result = arr.map((el) => el.length).sort((a, b) => a - b);
	
	return result;
}

function getIndexMaxLength(arr) {
	let result = arr.map((el) => el.length).findIndex((el, index, array) => el === Math.max(...array));

	return result;
}

// NUMS, STRINGS

function getStringFromArrays(...arrays) {
	let result = [].concat(...arrays).join(', ');

	return result;
}