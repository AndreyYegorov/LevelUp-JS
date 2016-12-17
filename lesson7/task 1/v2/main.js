;(function() {
	'use strict';

	let dateStr = '2016/05/20-12:00:35+0300',
		timestamp = (function(str) {
			let date = str.match(/\d+\/\d+\/\d+/g)[0].split('/'),
				time = str.match(/\d+:\d+:\d+/g)[0].split(':'),
				timeZone = +str.match(/\+\d+/g)[0].slice(1, 3);

			let dateArr = [].concat(date, time).map(el => +el);

			dateArr[1] -= 1;
			dateArr[3] += timeZone - Math.abs(new Date().getTimezoneOffset()/60);

			return new Date(...dateArr).getTime();
		})(dateStr);

	console.log(timestamp);
})();