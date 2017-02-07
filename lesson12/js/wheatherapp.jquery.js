;(function($) {
	'use strict';

	$.fn.wheatherApp = function(input = false) {

		let options = {
			switcher: {
				visibility: input.switcher.visibility || false,
			},
			days: {
				visibility: input.days.visibility || false
			},
			measure: input.measure || 'celsius'
		};

		let $container = this;

		navigator.geolocation.getCurrentPosition(success, error);

		let app = {
			setHTMLTemplate() {
				return {
					main: `
						<section class="wheatherApp">
							<h1 class="wheatherApp-heading">WheatherApp</h1>
							<div class="wheatherApp-day">
								<div class="wheatherApp-day-date"></div>
								<div class="wheatherApp-day-temp">
									<div class="wheatherApp-day-tempMax" data-temp></div>
									<div class="wheatherApp-day-tempMin" data-temp></div>
								</div>
							</div>
							<ul class="wheatherApp-daysList">
							</ul>
						</section>
					`,
					otherDays: `
						<li class="wheatherApp-daysItem">
							<div class="wheatherApp-daysItem-date"></div>
							<div class="wheatherApp-daysItem-temp">
								<div class="wheatherApp-daysItem-tempMax" data-temp></div>
								<div class="wheatherApp-daysItem-tempMin" data-temp></div>
							</div>
						</li>
					`,
					switcher: `
						<div class="wheatherApp-switchTemp">
							<a href="" class="wheatherApp-switchTemp-btn" data-temp-measure="celsius">℃</a>
							<a href="" class="wheatherApp-switchTemp-btn" data-temp-measure="fahrenheit">F</a>
						</div>
					`
				};
			},
			getData(day) {
				return {
					weeksDayShort: app.getDate(day).weeksDayShort,
					weeksDayFull: app.getDate(day).weeksDayFull,
					dateShort: app.getDate(day).dateShort,
					dateFull: app.getDate(day).dateFull,
					tempMinCelsius: app.getTemperature(day.temperatureMin).tempCelsius,
					tempMaxCelsius: app.getTemperature(day.temperatureMax).tempCelsius,
					tempMinFahrenheit: app.getTemperature(day.temperatureMin).tempFahrenheit,
					tempMaxFahrenheit: app.getTemperature(day.temperatureMax).tempFahrenheit,
					iconSrc: app.getIconsSrc(day.icon)
				}
			},
			getTemperature(temp) {
				let tempCelsius = Math.floor(5 / 9 * (temp - 32)),
					tempFahrenheit = Math.floor(temp);

				return {
					tempCelsius: (tempCelsius > 0) ? `+${tempCelsius} ℃`: `${tempCelsius} ℃`,
					tempFahrenheit: (tempFahrenheit > 0) ? `+${tempFahrenheit} ℉` : `${tempFahrenheit} ℉`
				};
			},
			getIconsSrc(iconTitle) {
				let src = `img/icons/${iconTitle}.png`;

				return src;
			},
			getDate(day) {
				let date = new Date(day.time*1000),
					dateFullYear = date.getFullYear(),
					dataDay = date.getDay(),
					dateMonth = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
					dataDate = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate(),
					dateHour = date.getHours(),
					dateMinute = date.getMinutes();

				let days = {
					full: ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'],
					short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
				};	

				let dateFull = `${dataDate}.${dateMonth}.${dateFullYear}`,
					dateShort = `${dataDate}.${dateMonth}`,
					weeksDayFull = days.full[dataDay],
					weeksDayShort = days.short[dataDay];	

				return {
					weeksDayFull,
					weeksDayShort,
					dateFull,
					dateShort
				};	
			},
			switchTemperature() {
				let $wheatherApp = $('.wheatherApp'),
					$temp = $('[data-temp]');

				if(options.switcher.visibility) {
					$wheatherApp.append(app.setHTMLTemplate().switcher);
				}	

				let $wheatherApp_switchTemp_btn = $('.wheatherApp-switchTemp-btn');

				$wheatherApp_switchTemp_btn.each((index, el) => {
					$(el).filter(`[data-temp-measure="${options.measure}"]`).attr('data-default', true);
				});

				let $wheatherApp_switchTemp_btn__default = $wheatherApp_switchTemp_btn.filter('[data-default]');

				let measure = $wheatherApp_switchTemp_btn__default.data('temp-measure');	

				$wheatherApp_switchTemp_btn.on('click', function(e) {
					e.preventDefault();

					let measure = $(this).data('temp-measure');

					app.renderTemperature($temp, measure);

					$wheatherApp_switchTemp_btn.removeClass('is_active');
					$(this).addClass('is_active');
				});

				$wheatherApp_switchTemp_btn.removeClass('is_active');
				$wheatherApp_switchTemp_btn__default.addClass('is_active');

				app.renderTemperature($temp, measure);
			},
			renderTemperature(el, measure = options.measure) {
				el.each((index, el) => {
					let $el = $(el);

					$el.text($el.data(`temp-${measure}`));
				}); 
			},
			renderView(days) {
				$container.append(app.setHTMLTemplate().main);

				let	$wheatherApp_daysList = $('.wheatherApp-daysList'),
					$day = $('.wheatherApp-day'),
					$day_date = $day.find('.wheatherApp-day-date'),
					$day_tempMin = $day.find('.wheatherApp-day-tempMin'),
					$day_tempMax = $day.find('.wheatherApp-day-tempMax'),
					$day_temp = $day.find('[data-temp]');

				if(options.days.visibility) {
					days.forEach((day, index) => {
						initShortView(day, index);
					});
				}		

				let $wheatherApp_daysItem = $('.wheatherApp-daysItem');

				$wheatherApp_daysList.on('click', '.wheatherApp-daysItem', function() { 
					initFullView(days[$(this).data('id')]);

					$wheatherApp_daysItem.removeClass('is_active');
					$(this).addClass('is_active');
				});

				$wheatherApp_daysItem.eq(0).addClass('is_active');
				initFullView(days[0]);

				app.switchTemperature();

				function initShortView(day, index) {
					$wheatherApp_daysList.append(app.setHTMLTemplate().otherDays);

					let $daysItem = $('.wheatherApp-daysItem').eq(index),
						$daysItem_date = $daysItem.find('.wheatherApp-daysItem-date'),
						$daysItem_tempMin = $daysItem.find('.wheatherApp-daysItem-tempMin'),
						$daysItem_tempMax = $daysItem.find('.wheatherApp-daysItem-tempMax');

					$daysItem
						.data('id', index)
						.css('background-image', `url(${app.getData(day).iconSrc})`);	

					$daysItem_date.text(`${app.getData(day).weeksDayShort}, ${app.getData(day).dateShort}`);			
					$daysItem_tempMin.data({'temp-celsius': app.getData(day).tempMinCelsius, 'temp-fahrenheit': app.getData(day).tempMinFahrenheit});
					$daysItem_tempMax.data({'temp-celsius': app.getData(day).tempMaxCelsius, 'temp-fahrenheit': app.getData(day).tempMaxFahrenheit});	
				} 

				function initFullView(day) {
					$day.css('background-image', `url(${app.getData(day).iconSrc})`);
					$day_date.text(`${app.getData(day).weeksDayFull}, ${app.getData(day).dateFull}`);
					$day_tempMin.data({'temp-celsius': app.getData(day).tempMinCelsius, 'temp-fahrenheit': app.getData(day).tempMinFahrenheit});
					$day_tempMax.data({'temp-celsius': app.getData(day).tempMaxCelsius, 'temp-fahrenheit': app.getData(day).tempMaxFahrenheit});

					let measure = $('.wheatherApp-switchTemp-btn').filter('.is_active').data('temp-measure');

					app.renderTemperature($day_temp, measure);
				} 
			},
			init(data) {
				let dataDays = data.daily.data;

				app.renderView(dataDays);
			}
		}

		function success(position) {
			let lat = position.coords.latitude,
				lng = position.coords.longitude,
				apiUrlBase = 'https://api.darksky.net/forecast/',
				apiKey = 'f5c54235e3df8f74ff1028be591b9eb2';

			$.ajax({
				url: `${apiUrlBase}${apiKey}/${lat},${lng}`,
				dataType: 'jsonp',
				success: app.init,
				error: error
			});
		}

		function error() {
			alert('Something bad hapend :(');
		}
	};
})(jQuery);