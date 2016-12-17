;(function() {
	'use strict';

	let dateStr = '2016/05/20-12:00:35+0300',
		timestamp = Date.parse(dateStr.replace(/-/g, 'T').replace(/\//g, '-'));

	console.log(timestamp);
})();