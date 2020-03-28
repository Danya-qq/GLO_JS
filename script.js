// 1)

let money = 10e4;
let income = 'freelance';
let addExpenses = 'интернет, КУ, такси, развлечения';
let deposit = true;
let mission = 10e5;
let period = 6;
let budgetDay = money/30;

// 2)

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.' + ' Цель заработать ' + mission + ' рублей');

let arr = addExpenses.split(',');
addExpenses = []; // пправильно ли понимаю, что надо переопределять переменную?
for (let item of arr) {
    addExpenses.push(item.toLowerCase());
};
console.log(addExpenses);

console.log(budgetDay);


// for (let i = 0; i < arr.length; i++) {
//     arrLow.push(arr[i].toLocaleLowerCase());
//   };

// console.log(arrLow);

