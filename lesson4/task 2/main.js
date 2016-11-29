;(function() {
	let student = {
		name: 'Andrey',
		lastname: 'Yegorov',
		age: 28,
		courses: [
			{
				title: 'JS',
				teacherName: 'Yuriy',
				duration: 96,
				progress: 0.2,
				rates: [5,4,5,4,5]
			},
			{
				title: 'CSS',
				teacherName: 'Viktor',
				duration: 120,
				progress: 0.3,
				rates: [5,5,4,5,5]
			}
		],
		getFullName() {
			let result = `${this.name} ${this.lastname}`;

			return result;
		},
		getAge() {
			let result = `Student is ${this.age} years old`;

			return result;
		},
		getCourses() {
			let result = this.courses.map(el => el.title).join(', ');

			return result;
		},
		addNewCourse(title, teacherName, duration) {
			let courses = this.courses,
				newCourse = {
				title: title,
				teacherName: teacherName,
				duration: duration,
				progres: 0,
				rates: []
			};

			courses.push(newCourse);

			return courses;
		},
		getAvarageMarkByCourse(course) {
			let courses = this.courses,
				result = null;

			courses.forEach(function(el) {
				if(el.title === course) {
					let rates = el.rates,
						ratesLength = rates.length;

					if(ratesLength) {
						result = rates.reduce((a, b) => a + b) / ratesLength;
					}	
				}
			});

			return result;
		},
		getAvarageMark() {
			let courses = this.courses,
				rates = [],
				ratesLength,
				result = null;

			courses.forEach(function(el) {
				rates = rates.concat(el.rates);
			});

			ratesLength = rates.length;

			if(ratesLength) {
				result = rates.reduce((a, b) => a + b) / ratesLength;
			}

			return result;
		},
		addMark(course, mark) {
			let courses = this.courses,
				result = null;

			courses.forEach(function(el) {
				if(el.title === course) {
					let rates = el.rates;

					if(Math.round(mark) > 0 && Math.round(mark) <= 5) {
						rates.push(mark);
					}

					result = rates;
				}
			});

			return result;
		},
		addProgress(course, hours) {
			let courses = this.courses,
				result = null;

			courses.forEach(function(el) {
				if(el.title === course) {
					if(hours <= el.duration) {
						el.progress = Math.round((hours / el.duration) * 100) / 100;
						
						result = el.progress;
					}
				}
			});	

			return result;
		},
		getProgress(course) {
			let courses = this.courses,
				result = null;

			courses.forEach(function(el) {
				if(el.title === course) {
					result = `You've passed ${el.progress * 100}% of this course`;
				}
			});	

			return result;
		}
	}
})();