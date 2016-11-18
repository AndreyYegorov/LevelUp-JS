function argsToString(...params) {
	let result = params.map(el => typeof el).join(', ');

	return result;
}

let argsTypes = argsToString(10, 'string', 20, 'string', true, 0);

console.log(argsTypes);