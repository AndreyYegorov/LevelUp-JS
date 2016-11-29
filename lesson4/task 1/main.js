;(function() {
	let someObj = {
		num: 1.24,
		str: 'not very long string',
		f() {
			return this.str.split('')
		},
		arr: ['some', 'array', {someProp: 'value'}],
		prop: { 
			key: 1
		},
		empty: null,
		last: 0
	};

	function parseObject(obj) {
		let	parsedObj,
			propNames = Object.keys(obj),
			propValues = propNames.map(el => obj[el])
			propTypes = propValues.map(el => typeof el);
			propsAmount = propNames.length,

		parsedObj = {
			'Own properties amount': propsAmount,
			propTypes,
			propNames
		}

		propNames.forEach(function(el) {
			if(typeof this[el] === 'number') {
				// this[el] = this[el].toFixed(2);
				this[el] = Math.round(this[el] * 100) / 100;
			}

			if(typeof this[el] === 'string') {
				this[el] = this[el].toUpperCase();
			}
		}, obj);

		Object.preventExtensions(obj);

		return parsedObj;
	}
})();