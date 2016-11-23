let str = prompt('Введите любую строку латинскими буквами');

function removeVowels(str) {
	let vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'Y', 'y'],
		arrStr = str.split(''),
		result;

	vowels.forEach(vowel => {
		arrStr = arrStr.filter(el => el !== vowel);
	});

	result = arrStr.join('');

	return result;
}

console.log(removeVowels(str));