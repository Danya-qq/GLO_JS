// 1)

let money = +prompt('Ваш месячный доход?'),
income = 'freelance',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 10e5,
period = 6,
expenses1 = prompt('Введите обязательную статью расходов'),
amount1 = +prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов'),
amount2 = +prompt('Во сколько это обойдется?'),
budgetMonth = money - amount1 - amount2,
budgetDay = budgetMonth/30;

if (budgetDay<0) {
    console.log('Что-то пошло не так');
} else if (budgetDay<=600)  {
    console.log('К сожалению, у вас уровень дохода ниже среднего');  
} else if (budgetDay<=1200) {
console.log('У вас средний уровень дохода');
} else {
    console.log('У вас высокий уровень дохода');  
};

console.log('Бюджет на месяц ' + budgetMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(mission/budgetMonth) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));







