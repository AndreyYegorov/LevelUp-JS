;(function() {
	'use strict';

	if(!('getCustomFormatDate' in Date.prototype)) {
		Date.prototype.getCustomFormatDate = function(dateFormat) {
			let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				year = this.getFullYear(),
				yearShort = year.toString().slice(2),
				month = this.getMonth(),
				monthString = months[month],
				day = this.getDate(),
				hour = this.getHours(),
				minute = this.getMinutes(),
				second = this.getSeconds(),
				result = dateFormat;
				
			let matchObj = {
				'YYYY': year,
				'YY': yearShort,
				'MMMM': monthString,
				'MM': month + 1,
				'DD': day,
				'HH': hour,
				'mm': minute,
				'ss': second
			};

			for(let prop in matchObj) {
				result = result.replace(prop, matchObj[prop]);
			}

			return result;
		}
	}

	let date = new Date();

	console.log(date.getCustomFormatDate('YYYY-MMMM-DD HH:mm:ss'));
})();