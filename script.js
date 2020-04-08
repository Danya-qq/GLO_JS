
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};
let money;
let start = function(){
    do {
      money = prompt('Ваш месячный доход?', 50000);
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
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 100000,
        period: 3,
        asking: function(){

            if (confirm('Есть ли у вас доп. заработок?')){
                let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
                    while (isNumber(itemIncome) || itemIncome === null || itemIncome == false){
                        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
                    };
                let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
                    while(!isNumber(cashIncome) || cashIncome === 0) {
                        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
                    };
                appData.income[itemIncome] = cashIncome;
            };
                let addExpenses = prompt('Перечислите возможные расходы через запятую');
                appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
                appData.deposit = confirm('Имеется ли вклад в банке?');
                for (let i=0; i<2; i++){
                    let itemExpenses = prompt('Введите обязательную статью расходов', 'ку');
                        while (isNumber(itemExpenses) || itemExpenses === null || itemExpenses == false) {
                            itemExpenses = prompt('Введите обязательную статью расходов', 'ку');
                        };
                    let cashExpenses = +prompt('Во сколько это обойдется?', 4000);   
                        while (!isNumber(cashExpenses) || cashExpenses === 0) {
                            cashExpenses = +prompt('Во сколько это обойдется?', 4000); 
                        };
                        appData.expenses[itemExpenses] = cashExpenses;
            };  
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
            appData.budgetDay = Math.ceil(appData.budgetMonth/30);
             
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
        getInfoDeposit: function(){
            if (appData.deposit){
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
                    while(!isNumber(appData.percentDeposit) || appData.percentDeposit === 0){
                        appData.percentDeposit = prompt('Какой годовой процент?', '10');
                    };
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                    while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0){
                        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                    };
            };
        },
        calculateSavedMoney: function(){
            return appData.budgetMonth*appData.period;
        }
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
appData.getInfoDeposit();

let result = appData.addExpenses.map(function(elem) {
    return elem.trim()[0].toLocaleUpperCase()+ elem.trim().slice('1')
});
console.log(result.join(', '));



