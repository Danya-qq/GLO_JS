let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
income = 'freelance',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, еда'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 10e5,
period = 6,
expenses = [];

let start = function(){
      do {
        money = prompt('Ваш месячный доход?');
      }  
      while (!isNumber(money))
    return money;
};

money = start();

let getExpensesMonth = function(){
    let sum = 0;
    for (let i=0; i<2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов', 'ку');
        
        sum += +prompt('Во сколько это обойдется?');

        while (!isNumber(sum) || sum === 0) {
            sum = +prompt('Во сколько это обойдется?');
        }

    };  
    console.log(expenses);
    
     return sum;
}; 

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function(){
    return money - expensesAmount;
};

let accumulatedMonth  = getAccumulatedMonth();
let budgetDay = accumulatedMonth/30;

let getTargetMonth = function(){
    let target = mission/accumulatedMonth;
    if (target >0) {
        return console.log('Цель будет достигнута за: ' + Math.ceil(target) + ' месяцев');
        
    } else {
        console.log('Цель не будет достигнута');
    }

};


let showTypeOf = function(data){
    console.log(data, typeof(data));
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



showTypeOf(income);
console.log('Сумма обязательных расходов ', expensesAmount);
console.log('Возможные расходы ', addExpenses.split(','));
// console.log('Цель будет достигнута за: ' + Math.ceil(getTargetMonth()) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
getTargetMonth();
console.log(getStatusIncome());