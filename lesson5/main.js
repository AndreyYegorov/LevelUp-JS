/*--BAR--*/
/*------------------------------------------------*/
function Bar(
	name,
	employees = {},
	store = {},
	orders = [],
	tips = 0
	) {
	this.name = name;
	this.employees = {};
	this.employees.barmen = [];
	this.employees.waiters = [];
	this.store = {};
	this.store.drinks = [];
	this.orders = orders;
	this.tips = 0;
}

Bar.prototype.fillUpStore = function(unit, type) {
	let result = null,
		prodArray,
		prodTheSame,
		limit = 5;

	switch(type) {
		case 'Drinks':
			prodArray = this.store.drinks;

			break;
		default:
			break;		
	}

	prodTheSame = prodArray.find(el => el.name === unit.name);

	if(prodArray.length < limit) {
		if(prodTheSame) {
			prodTheSame.amount += unit.amount;
		}
		else {
			prodArray.push(unit);
		}	
	}
	else {
		console.log('Store is filled up');
	}

	result = prodArray;	

	return result;
}

Bar.prototype.divideTips = function() {
	let employees = this.employees,
		tips = this.tips,
		employeesAmount = 0,
		result = null;

		Object.keys(employees).forEach(el => employeesAmount += employees[el].length);

		if(tips >= 0) result = tips / employeesAmount;

		return result;
}

Bar.prototype.hireEmployee = function(name, age, position, feature) {
	let result = null,
		employee,
		posArray;

	switch(position) {
		case 'Barman':
			posArray = this.employees.barmen;
			employee = new Barman(name, age, feature);

			break;
		case 'Waiter':
			posArray = this.employees.waiters;
			employee = new Waiter(name, age);

			break;	
		default:
			break;		
	}

	posArray.push(employee);

	result = employee;

	return result;
}

Bar.prototype.fireEmployee = function(name, position) {
	let result = null,
		employeeId,
		posArray;

	switch(position) {
		case 'Barman':
			posArray = this.employees.barmen;

			break;
		case 'Waiter':
			posArray = this.employees.waiters;

			break;	
		default:
			break;	
	}

	employeeId = posArray.findIndex(el => el.name === name);

	if(employeeId != -1) posArray.splice(employeeId, 1);

	result = posArray;

	return result;
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

Barman.prototype.makeOrder = function(order, type) {
	let result = null,
		prodArray = null,
		prodOrdered,
		orderId,
		ordersArray = bar.orders;

	switch(type) {
		case 'Drinks':
			prodArray = bar.store.drinks;

			break;
		default:
			break;		
	}

	prodOrdered = prodArray.find(el => el.name === order.name);

	if(prodOrdered.amount < order.amount) {
		console.log(`Sorry, but we haven't such amount of ${order.name} now.`);
	}
	else {
		prodOrdered.amount -= order.amount;
	}

	orderId = ordersArray.findIndex(el => el.id === order.id);

	if(orderId != -1) ordersArray.splice(orderId, 1);

	result = order;	

	return result;
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
	let result = null,
		prodArray = null,
		prodOrdered,
		ordersArray = bar.orders;

	switch(type) {
		case 'Drinks':
			prodArray = bar.store.drinks;

			break;
		default:
			break;		
	}

	prodOrdered = prodArray.find(el => el.name === order.name);

	if(prodOrdered.amount < order.amount) {
		console.log(`Sorry, but we haven't such amount of ${order.name} now.`);
	}
	else {
		console.log(`Please, wait a little, your order will be prepared soon.`);

		ordersArray.push(order);

		result = ordersArray;
	}	

	return result;
};

Waiter.prototype.getTip = function(tips = 0) {
	let result;

	bar.tips += tips;

	result = bar.tips;

	return result;
};
/*------------------------------------------------*/


let bar = new Bar('Midnight light');

let viktor = bar.hireEmployee('Viktor Vernov', 24, 'Barman', 'Red sun');
let george = bar.hireEmployee('George Massa', 25, 'Barman', 'Night burn');
let john = bar.hireEmployee('John Dou', 22, 'Waiter');
let lena = bar.hireEmployee('Lena Mackgregor', 20, 'Waiter');
bar.fireEmployee('John Dou', 'Waiter');
bar.fireEmployee('Viktor Vernov', 'Barman');

bar.fillUpStore({
	name: 'Bourbon',
	amount: 10 // bottles
}, 'Drinks');

bar.fillUpStore({
	name: 'Bourbon',
	amount: 30 // bottles
}, 'Drinks');

bar.fillUpStore({
	name: 'Juice',
	amount: 50 // bottles
}, 'Drinks');

bar.fillUpStore({
	name: 'Vodka',
	amount: 12 // bottles
}, 'Drinks');

console.log(bar); 
john.getOrder({name: 'Juice', amount: 12, id: 0}, 'Drinks');
john.getOrder({name: 'Vodka', amount: 10, id: 1}, 'Drinks');
john.getOrder({name: 'Vodka', amount: 10, id: 2}, 'Drinks');
john.getOrder({name: 'Vodka', amount: 10, id: 3}, 'Drinks');
console.log(john.getTip(100));
console.log(bar.divideTips());
console.log(bar); 
console.log(george.makeOrder(bar.orders[3], 'Drinks'));
console.log(bar);