// 1)

let money = 10e4,
income = 'freelance',
addExpenses = 'интернет, КУ, такси, развлечения',
deposit = true,
mission = 10e5,
period = 6,
budgetDay = money/30;

// 2)

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.' + ' Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(','));

console.log(budgetDay);


