// 1)

let money = 10e4,
income = 'freelance',
addExpenses = 'интернет, КУ, такси, развлечения',
deposit = true,
mission = 10e5,
period = 6,
budgetDay = money/30;

// // 2)

// // console.log(typeof money);
// // console.log(typeof income);
// // console.log(typeof deposit);
// // console.log(addExpenses.length);
// // console.log('Период равен ' + period + ' месяцев.' + ' Цель заработать ' + mission + ' рублей');

// // console.log(addExpenses.toLowerCase().split(','));

// // console.log(budgetDay);


money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов'),
amount1 = +prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов'),
amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц ' + budgetMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(mission/budgetMonth) + ' месяцев');
budgetDay = budgetMonth/30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay<0) {
    console.log('Что-то пошло не так');
} else if (budgetDay<=600)  {
    console.log('К сожалению, у вас уровень дохода ниже среднего');  
} else if (budgetDay<=1200) {
console.log('У вас средний уровень дохода');
} else {
    console.log('У вас высокий уровень дохода');  
};






