'use strict';

let start = document.getElementById('start'),
 cancel = document.getElementById('cancel'),
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
 placeHolderName = document.querySelectorAll('input[placeholder = "Наименование"]'),
 placeHolderSum = document.querySelectorAll('input[placeholder = "Сумма"]'),
 inputTypeText = document.querySelectorAll('input[type="text"]');
 
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};


const AppData = function() {
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.budget = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false,
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function(){
    if (salaryAmount.value.trim() === '') {
        return;
    }
};

AppData.prototype.start = function(){
    if (salaryAmount.value.trim() === '') {
        return;
    };
   
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.block();

    this.showResult();
};

const appData = new AppData();
console.log(appData);


AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(' ,');
    additionalIncomeValue.value = this.addIncome.join(' ,');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
       incomePeriodValue.value = this.value*_this.budgetMonth;
    });

};
AppData.prototype.block = function(){
    inputTypeText.forEach(function(item){
        if (item.hasAttribute('disabled')) {
            return;
        } else {
            item.toggleAttribute('disabled')
        };
        
    });
        start.style.display = 'none';
        cancel.setAttribute('style', 'display: inline');
};
AppData.prototype.reset = function(){
    let inputs = document.querySelectorAll('input');
    inputs.forEach(function(elem){
        if (elem == periodSelect) {
            elem.value = periodAmount.innerHTML = 1;
        } else {
        elem.value = '';
        elem.removeAttribute('disabled');
        };  
    });
    console.log(this); 

    cancel.style.display = 'none';
    start.style.display = 'block';
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    };
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if  (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    };
};
AppData.prototype.getExpenses = function(){
    const _this = this
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;  
        };
    });
};
AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){  
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = +cashIncome;
        };
        
    });

    for (let key in this.income){
        this.incomeMonth += +this.income[key];
    };
};
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function(){
    additionalIncomes.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    }, this);
};
AppData.prototype.getExpensesMonth = function(){
    let sum = 0;
    for (let key in this.expenses) {
         sum += this.expenses[key]; 
    };
    return this.expensesMonth = sum;
};                            
AppData.prototype.getBudget  = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
    this.budgetDay = Math.ceil(this.budgetMonth/30);
     
};
AppData.prototype.getTargetMonth = function(){
    let target = targetAmount.value/this.budgetMonth;
    return target;
        
};
AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay<0) {
        return ('Что-то пошло не так');
    } else if (this.budgetDay<=600)  {
        return ('К сожалению, у вас уровень дохода ниже среднего');  
    } else if (this.budgetDay<=1200) {
    return ('У вас средний уровень дохода');
    } else {
        return ('У вас высокий уровень дохода');  
    };
};
AppData.prototype.getInfoDeposit = function(){
    if (this.deposit){
        this.percentDeposit = prompt('Какой годовой процент?', 10);
            while(!isNumber(this.percentDeposit) || this.percentDeposit === 0){
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            };
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while(!isNumber(this.moneyDeposit) || this.moneyDeposit === 0){
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            };
    };
};
AppData.prototype.calcPeriod = function(){
    return this.budgetMonth*periodSelect.value;
};
AppData.prototype.eventsListeners = function(){
    start.addEventListener('click', appData.start.bind(appData)); 
    cancel.addEventListener('click', appData.reset.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', function(){
        periodAmount.innerHTML = this.value;
    }); 
};

AppData.prototype.holdInputs = function(){
    placeHolderName.forEach(function(elem){
        elem.addEventListener('input', (event)=> {
            event.target.value = event.target.value.replace(/([A-Z])|(\d)/gi,"")
        });  
    });
    
    placeHolderSum.forEach(function(elem){
        elem.addEventListener('input', (event)=> {
            event.target.value = event.target.value.replace(/\D/g, '');
        })   
    });
}
appData.holdInputs();
appData.eventsListeners();











