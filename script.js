let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};
let money;
let start = function(){
    do {
      money = prompt('Ваш месячный доход?');
    }  
    while (!isNumber(money))
  return money;
};
money = start();

let appData = {
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        mission: 100000,
        period: 3,
        asking: function(){
            let addExpenses = prompt('Перечислите возможные расходы через запятую');
            appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
            appData.deposit = confirm('Имеется ли вклад в банке?');
            for (let i=0; i<2; i++){
                let value = prompt('Введите обязательную статью расходов', 'ку'); 
                appData.expenses[value] = +prompt('Во сколько это обойдется?');   
                    while (!isNumber(appData.expenses[value]) || appData.expenses[value] === 0) {
                        appData.expenses[value] = +prompt('Во сколько это обойдется?');
                    };
            };  
            console.log(appData.expenses);
        },
        getExpensesMonth: function(){
            let sum = 0;
            for (key in appData.expenses) {
                 sum += appData.expenses[key]; 
            };
            return sum;
        },                             
        getBudget : function(){
            appData.budgetMonth = money - this.getExpensesMonth();
            appData.budgetDay = appData.budgetMonth/30;
            console.log(appData.budgetMonth);
            console.log(appData.budgetDay);    
        },
        getTargetMonth: function(){
            let target = appData.mission/appData.budgetMonth;
                if (target >0) {
                    return console.log('Цель будет достигнута за: ' + Math.ceil(target) + ' месяцев');
                } else {
                    console.log('Цель не будет достигнута');
                };
        },
        getStatusIncome: function(){
            if (this.budgetDay<0) {
                return ('Что-то пошло не так');
            } else if (this.budgetDay<=600)  {
                return ('К сожалению, у вас уровень дохода ниже среднего');  
            } else if (this.budgetDay<=1200) {
            return ('У вас средний уровень дохода');
            } else {
                return ('У вас высокий уровень дохода');  
            };
        },
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
console.log('Расходы за месяц ' + appData.getExpensesMonth());
console.log(appData.getStatusIncome());

let showProp = function() {
    for (key in appData) {
        console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
        
    };
}();


