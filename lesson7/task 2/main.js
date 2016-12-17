;(function() {
	'use strict';

	let dateStr = 'apple:2016/5/27__bid_203.38-ask_203.43|2016/5/28__bid_203.35-ask_203.42|2016/5/29__bid_203.39-ask_203.45',
		obj = (function(str) {
			let name = str.match(/^\w+(?=:)/g)[0],
				rateDates = str.match(/\d+\/\d+\/\d+/g), 
				rateBids = str.match(/\d+\.?\d+(?=-)/g), 
				rateAsks = str.match(/\d+\.?\d+(?=\||$)/g),
				rates = []; 

			rateDates.forEach((el, i) => {
				let rate = {
					date: el,
					bid: +rateBids[i],
					ask: +rateAsks[i]
				}

				rates.push(rate);
			});

			return {
				name,
				rates
			}
		})(dateStr);
	
	console.log(obj);
})();