// 1)

let money = +prompt('Ваш месячный доход?', 50000),
income = 'freelance',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, еда'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 10e5,
period = 6,
expenses1 = prompt('Введите обязательную статью расходов', 'ку'),
amount1 = +prompt('Во сколько это обойдется?', 4000),
expenses2 = prompt('Введите обязательную статью расходов', 'бензин'),
amount2 = +prompt('Во сколько это обойдется?', 4000),
accumulatedMonth  = getAccumulatedMonth();
budgetDay = accumulatedMonth/30;


let showTypeOf = function(data){
    console.log(data, typeof(data));
};

function getExpensesMonth(){
    return amount1 + amount2;
}; 
 function getAccumulatedMonth (){
    return money - getExpensesMonth();
};

let getTargetMonth = function(){
    return mission/accumulatedMonth;
};



let getStatusIncome = function(){
    if (budgetDay<0) {
        return ('Что-то пошло не так');
    } else if (budgetDay<=600)  {
        return ('К сожалению, у вас уровень дохода ниже среднего');  
    } else if (budgetDay<=1200) {
    creturn ('У вас средний уровень дохода');
    } else {
        return ('У вас высокий уровень дохода');  
    };
};


// console.log('Цель будет достигнута за: ' + Math.ceil(mission/budgetMonth) + ' месяцев');

showTypeOf(money);
console.log('Сумма обязательных расходов ', getExpensesMonth());
console.log('Возможные расходы ', addExpenses.split(','));
console.log('Цель будет достигнута за: ' + Math.ceil(getTargetMonth()) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(getStatusIncome());







