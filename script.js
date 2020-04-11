 'use strict';

let start = document.getElementById('start'),
 btnPlus = document.getElementsByTagName('button'),
 incomePlus = btnPlus[0],
 expensesPlus = btnPlus[1],
 checkboxButton = document.getElementById('deposit-check'),
 additionalIncomes = document.querySelectorAll('.additional_income-item'),
 budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
 budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
 expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
 additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
 additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
 incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
 targetMonthValue = document.getElementsByClassName('target_month-value')[0],
 salaryAmount = document.querySelector('.salary-amount'),
 incomeTitle = document.querySelector('.income-title'),
 expensesTitle  = document.querySelector('.expenses-title'),
 expensesItems = document.querySelectorAll('.expenses-items'),
 additionalExpensesItem= document.querySelector('.additional_expenses-item'),
 targetAmount = document.querySelector('.target-amount'),
 periodSelect = document.querySelector('.period-select'),
 incomeItems = document.querySelectorAll('.income-items'),
 periodAmount = document.querySelector('.period-amount'),
 placeHolder = document.querySelectorAll('input[placeholder = "Наименование"]');



let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        start: function(){
            if (salaryAmount.value.trim() === '') {
                return;
            };
            

            appData.budget = +salaryAmount.value;

            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();

            appData.showResult();
        },
        showResult: function(){
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(' ,');
            additionalIncomeValue.value = appData.addIncome.join(' ,');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcPeriod();
            periodSelect.addEventListener('input', function(){
               incomePeriodValue.value = this.value*appData.budgetMonth;
            });

        },
        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            };
        },
        addIncomeBlock: function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if  (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            };
        },
        getExpenses: function(){
            expensesItems.forEach(function(item){
                console.log(item);
                
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
            });
        },
        getIncome: function(){
            incomeItems.forEach(function(item){
                console.log(item);
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = +cashIncome;
                };
                
            });

            for (let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            };
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            })
        },
        getAddIncome: function(){
            additionalIncomes.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function(){
            let sum = 0;
            for (let key in appData.expenses) {
                 sum += appData.expenses[key]; 
            };
            return appData.expensesMonth = sum;
        },                             
        getBudget : function(){
            appData.budgetMonth = appData.budget + appData.incomeMonth - this.getExpensesMonth();
            appData.budgetDay = Math.ceil(appData.budgetMonth/30);
             
        },
        getTargetMonth: function(){
            let target = targetAmount.value/appData.budgetMonth;
            return target;
                
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
        calcPeriod: function(){
            return appData.budgetMonth*periodSelect.value;
        }
    };

function changeRange(){
   periodAmount.innerHTML = this.value;
    
};

start.addEventListener('click', appData.start); 
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', changeRange);





