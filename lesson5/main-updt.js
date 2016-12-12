/*--BAR--*/
/*------------------------------------------------*/
function Bar(
	name
	) {
	this.name = name;
	this.employees = {
		barmen: [],
		waiters: []
	};
	this.store = {
		drinks: []
	};
	this.orders = [];
	this.tips = 0;
}

Bar.prototype.fillUpStore = function(prod, type = 'Unknown', limit = 5) {
	let prodArray;

	if(type.toLowerCase() in this.store) {
		prodArray = this.store[type.toLowerCase()];

		let prodTheSame = prodArray.find(el => el.name === prod.name);

		if(prodArray.length < limit) {
			if(prodTheSame) {
				prodTheSame.amount += prod.amount;
			}
			else {
				prodArray.push(prod);
			}	
		}
		else {
			console.log('Store is filled up');
		}
	}
	else {
		console.log(`We haven't ${type} in our store`);
	}

	return prodArray;
}

Bar.prototype.divideTips = function() {
	let employees = this.employees,
		tips = this.tips,
		employeesAmount = Object.keys(employees).length,
		result = null;

		if(tips >= 0) result = tips / employeesAmount;

		return result;
}

Bar.prototype.hireEmployee = function(name = 'Unknown', age = 18, position = 'Unknown', feature = 'Unknown') {
	let	employee,
		employeesArray,
		vacancies = {
			barmen: new Barman(name, age, feature),
			waiters: new Waiter(name, age)
		}	

	if(position.toLowerCase() in vacancies) {
		employeesArray = this.employees[position.toLowerCase()];
		employee = vacancies[position.toLowerCase()];

		employeesArray.push(employee);
	}

	return employee;
}

Bar.prototype.fireEmployee = function(name = 'Unknown', position = 'Unknown') {
	let employeesArray;

	if(position.toLowerCase() in this.employees) {
		employeesArray = this.employees[position.toLowerCase()];

		let employeeIndex = employeesArray.findIndex(el => el.name === name);

		if(employeeIndex != -1) employeesArray.splice(employeeIndex, 1);
	}	

	return employeesArray;
}
/*------------------------------------------------*/


/*--EMPLOYEE--*/
/*------------------------------------------------*/
function Employee(
	name,
	age
	) {
	this.name = name;
	this.age = age;
}
/*------------------------------------------------*/


/*--BARMAN--*/
/*------------------------------------------------*/
function Barman(
	name, 
	age,
	superCocktail
	) {
	Employee.apply(this, arguments);

	this.superCocktail = superCocktail;
}

Barman.prototype = Object.create(Employee.prototype);

Barman.prototype.makeOrder = function(order, type = 'Unknown') {
	let prodArray,
		ordersArray = bar.orders;

	if(type.toLowerCase() in bar.store) {
		prodArray = bar.store[type.toLowerCase()];

		let prodOrdered = prodArray.find(el => el.name === order.name);

		if(prodOrdered.amount < order.amount) {
			console.log(`Sorry, but we haven't such amount of ${order.name} now.`);
		}
		else {
			prodOrdered.amount -= order.amount;
		}

		let orderIndex = ordersArray.findIndex(el => el === order);

		if(orderIndex != -1) ordersArray.splice(orderIndex, 1);
	}		

	return order;
};
/*------------------------------------------------*/


/*--WAITER--*/
/*------------------------------------------------*/
function Waiter(
	name, 
	age
	) {
	Employee.apply(this, arguments);
}

Waiter.prototype = Object.create(Employee.prototype);

Waiter.prototype.getOrder = function(order, type) {
	let prodArray,
		ordersArray = bar.orders;

	if(type.toLowerCase() in bar.store) {
		prodArray = bar.store[type.toLowerCase()];

		let prodOrdered = prodArray.find(el => el.name === order.name);

		if(prodOrdered.amount < order.amount) {
			console.log(`Sorry, but we haven't such amount of ${order.name} now.`);
		}
		else {
			console.log(`Please, wait a little, your order will be prepared soon.`);

			ordersArray.push(order);
		}	
	}		

	return ordersArray;
};

Waiter.prototype.getTip = function(tips = 0) {
	bar.tips += tips;

	return bar.tips;
};
/*------------------------------------------------*/


let bar = new Bar('Midnight light');

let viktor = bar.hireEmployee('Viktor Vernov', 23, 'Barmen');	
let george = bar.hireEmployee('George Massa', 25, 'Barmen', 'Night burn');
let john = bar.hireEmployee('John Dou', 22, 'Waiters');
let lena = bar.hireEmployee('Lena Mackgregor', 20, 'Waiters');
bar.fireEmployee('John Dou', 'Waiters');
bar.fireEmployee('Viktor Vernov', 'Barmen');

bar.fillUpStore({
	name: 'Bourbon',
	amount: 10
});

bar.fillUpStore({
	name: 'Bourbon',
	amount: 30 
}, 'Drinks');

bar.fillUpStore({
	name: 'Juice',
	amount: 50 
}, 'Drinks');

bar.fillUpStore({
	name: 'Vodka',
	amount: 12 
}, 'Drinks');

lena.getTip(100);
john.getOrder({name: 'Juice', amount: 64}, 'Drinks');
john.getOrder({name: 'Vodka', amount: 10}, 'Drinks');
john.getOrder({name: 'Juice', amount: 20}, 'Drinks');
john.getOrder({name: 'Bourbon', amount: 12}, 'Drinks');
george.makeOrder(bar.orders[0], 'Drinks');

console.log(bar); 
console.log(bar.divideTips()); 