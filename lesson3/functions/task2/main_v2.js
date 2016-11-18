function argsToString() {
	let types = [],
		result;

	for (let i = 0; i < arguments.length; i++) {
		types.push(typeof arguments[i]);
	}

	result = types.join(', ');

	return result;
}

let argsTypes = argsToString(10, 'string', 20, 'string', true, 0);

console.log(argsTypes);