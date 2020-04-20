'use strict';

const start = document.getElementById('start'),
 cancel = document.getElementById('cancel'),
 btnPlus = document.getElementsByTagName('button'),
 incomePlus = btnPlus[0],
 expensesPlus = btnPlus[1],
 depositCheck = document.getElementById('deposit-check');
  let depositBank = document.querySelector('.deposit-bank'),
 depositAmount = document.querySelector('.deposit-amount'),
 depositPercent = document.querySelector('.deposit-percent'),
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
 additionalExpensesItem= document.querySelectorAll('.additional_expenses-item'),
 targetAmount = document.querySelector('.target-amount'),
 periodSelect = document.querySelector('.period-select'),
 periodAmount = document.querySelector('.period-amount'),
 placeHolderName = document.querySelectorAll('input[placeholder = "Наименование"]'),
 placeHolderSum = document.querySelectorAll('input[placeholder = "Сумма"]');
 let inputTypeText = document.querySelectorAll('input[type="text"]'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items');
 
const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

console.log(depositPercent);




class AppData {
    constructor(){
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
    }

    check(){
        if (salaryAmount.value.trim() === '') {
            return;
        };
    }

    start = function(){
        if (salaryAmount.value.trim() === '') {
            return;
        };
    
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getAddData();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.block();

        this.showResult();
    };

    showResult = () => {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(' ,');
        additionalIncomeValue.value = this.addIncome.join(' ,');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = this.value*this.budgetMonth;
        });

    }
   
    block(){
        inputTypeText = document.querySelectorAll('input[type="text"]');
        inputTypeText.forEach((item) => {

            if (item.hasAttribute('disabled') && item.value == '') {
                return;
            } else {
                item.toggleAttribute('disabled')
            };
            
        });
            incomePlus.setAttribute('disabled', true);
            expensesPlus.setAttribute('disabled', true);

            start.style.display = 'none';
            cancel.setAttribute('style', 'display: inline');
            depositBank.toggleAttribute('disabled');
            depositCheck.toggleAttribute('disabled');
    }
   
    reset(){
        let inputs = document.querySelectorAll('input');   
        let incomes = document.querySelectorAll('.income-items');
        let expenses = document.querySelectorAll('.expenses-items');
        incomes.forEach(() => { 
        if (incomes[0].nextElementSibling !== incomePlus) {
            incomes[0].nextElementSibling.remove();
        } else incomePlus.style = 'display: "block'
    })
    expenses.forEach(() => { 
        if (expenses[0].nextElementSibling !== expensesPlus) {
            expenses[0].nextElementSibling.remove();
        } else expensesPlus.style = 'display: "block'
    })
        
        inputs.forEach((elem) => {
        
            if (elem == periodSelect) {
                elem.value = periodAmount.innerHTML = 1;
            } else {
            elem.value = '';
            elem.removeAttribute('disabled');

            };  
        });

        console.log(this); 
        this.incomeMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetMonth = 0;
        this.addExpenses = [];
        this.addIncome = [];
        this.deposit = false;
        this.income = {};
        this.expenses = {};
        this.expensesMonth = 0;
        cancel.style.display = 'none';
        start.style.display = 'block';
        incomePlus.removeAttribute('disabled');
        expensesPlus.removeAttribute('disabled');
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositPercent.value = '';
        depositAmount.value = '';
        depositCheck.checked = false;
        depositBank.toggleAttribute('disabled');
        depositCheck.removeAttribute('disabled');
    }
   
    getNewBlocks(){
            let item = this.previousElementSibling;
            let cloneElem = item.cloneNode(true);
            cloneElem.children[0].value = '';
            cloneElem.children[1].value = ''; 
            item.after(cloneElem); 
            if (item.parentElement.childElementCount === 5) 
                this.style.display = 'none'     
           
        }  

    getExpInc(){
        expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItems = document.querySelectorAll('.income-items');
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = +itemAmount;
            };
        };
        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income){
            this.incomeMonth += +this.income[key];

        }
    }
    getAddExpenses(){
       
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    }
    
    getAddIncome(){
        additionalIncomes.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    getAddData(){
        const count = (item) => {
            
            const startStr = item.className;
            let itemValue = item.value;
            if (itemValue !== '' && startStr.includes('expenses')){
                this.addExpenses.push(itemValue);
            };
            if (itemValue !== '' && startStr.includes('income')){
                this.addIncome.push(itemValue);
            };    
        
        };
        additionalExpensesItem.forEach(count);
        additionalIncomes.forEach(count);
    }
    
    getExpensesMonth(){
        let sum = 0;
        for (let key in this.expenses) {
            sum += this.expenses[key]; 
        };
        return this.expensesMonth = sum;
    }                            
    
    getBudget (){
        const monthDeposit = this.moneyDeposit*(this.percentDeposit/100);
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
        
    }
    
    getTargetMonth(){
        let target = targetAmount.value/this.budgetMonth;
        return target;
            
    }
   
    getStatusIncome(){
        if (this.budgetDay<0) {
            return ('Что-то пошло не так');
        } else if (this.budgetDay<=600)  {
            return ('К сожалению, у вас уровень дохода ниже среднего');  
        } else if (this.budgetDay<=1200) {
        return ('У вас средний уровень дохода');
        } else {
            return ('У вас высокий уровень дохода');  
        };
    }
  
    getInfoDeposit(){
        if (this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        };
    }
    
    calcPeriod(){
        return this.budgetMonth*periodSelect.value;
    }

    changePercent(){
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style = 'display: inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('blur', ()=>{
                if (depositPercent.value >= 100 || depositPercent.value < 1 ||!isNumber(depositPercent.value)){
                alert('Введите корректное значение в поле проценты');
                start.setAttribute('disabled', true);
                } 
                else  {
                    start.removeAttribute('disabled');
                }
            });
            
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            
            
        }          
    }
    
    depositHandler(){
        if (depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent)
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';

            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePersent)

        };
        
    }
    
    eventsListeners(){
        start.addEventListener('click', appData.start.bind(appData)); 
        cancel.addEventListener('click', appData.reset.bind(appData));
        expensesPlus.addEventListener('click', appData.getNewBlocks);
        incomePlus.addEventListener('click', appData.getNewBlocks);
        periodSelect.addEventListener('input', () => {
            periodAmount.innerHTML = event.target.value;
        }); 
        depositCheck.addEventListener('change', this.depositHandler.bind(this))
    }

    holdInputs(){
        placeHolderName.forEach((elem) => {
            elem.addEventListener('input', (event)=> {
                event.target.value = event.target.value.replace(/([A-Z])|(\d)/gi,"")
            });  
        });
        
        placeHolderSum.forEach((elem) => {
            elem.addEventListener('input', (event)=> {
                event.target.value = event.target.value.replace(/\D/g, '');
            })   
        });
    }

};

const appData = new AppData();
console.log(appData);
appData.holdInputs();
appData.eventsListeners();










