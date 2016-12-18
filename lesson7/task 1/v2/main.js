;(function() {
	'use strict';

	let dateStr = '2016/05/20-12:00:35+0300',
		timestamp = (function(str) {
			let date = str.match(/\d+\/\d+\/\d+/g)[0].split('/'),
				time = str.match(/\d+:\d+:\d+/g)[0].split(':'),
				timeZone = +str.match(/\+\d+/g)[0].slice(1, 3),
				dateArr = [].concat(date, time).map(el => +el);

			dateArr[1] -= 1;
			dateArr[3] -= timeZone;

			let UTCDate = new Date(Date.UTC(...dateArr));

			return UTCDate.getTime();
		})(dateStr);

	console.log(timestamp);
})();