const calculatorOperationsContainer = document.querySelector('#calculator__operations');
const calculatorResult = document.querySelector('#calculator__result');

const displayValues = {
    numbers: '',
    operator: '',
}

let operationsLength = 0;
let operators = [];
const second = [];

function add(num1,num2){
    return num1 + num2;
}
function substract(num1, num2){
    return num1 - num2;
}
function multiply(num1,num2){
    return num1 * num2;
}
function divide(num1,num2){
    if(num2 == 0){
        return 'Can\'t divide by 0'
    } else {
        return num1 / num2;
    }
}
function operate(operator,num1,num2){
    switch(operator) {
        case '+':
            return add(num1, num2);
        break;
        case '-':
            return substract(num1,num2);
        break;
        case 'x':
            return multiply(num1,num2);
        break;
        case '/':
            return divide(num1,num2);
        break;
    }
}





function populateDisplayNumbers(e){
    console.log(e.key)
   if(this.hasAttribute('data-digit')){
       displayValues.numbers += this.textContent;
       
       calculatorOperationsContainer.textContent += this.textContent;
       operationsLength = calculatorOperationsContainer.textContent.trim().length;
   }  
}

function populateDisplayOperators(e){
    let currentOperator = this.textContent || e.key;
    console.log(currentOperator)
    switch(currentOperator){
        case '+':   
            
            if(operators.length == 2){
                operators[1] = '+';  
                 
               
            } else if(operators.length == 1){
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push('+');
            } else if(operators.length == 0) {
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push(displayValues.numbers);
                operators.push('+');
                displayValues.numbers = '';
            }

           
        break;
        case '-':   
            
        if(operators.length == 2){
            operators[1] = '-';  
             
           
        } else if(operators.length == 1){
            calculatorOperationsContainer.textContent += currentOperator;
            operators.push('-');
        } else if(operators.length == 0) {
            calculatorOperationsContainer.textContent += currentOperator;
            operators.push(displayValues.numbers);
            operators.push('-');
            displayValues.numbers = '';
        }

       
        break;
        case 'x':   
            
            if(operators.length == 2){
                operators[1] = 'x';  
                 
               
            } else if(operators.length == 1){
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push('x');
            } else if(operators.length == 0) {
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push(displayValues.numbers);
                operators.push('x');
                displayValues.numbers = '';
            }

           
        break;
        case '/':   
            
            if(operators.length == 2){
                operators[1] = '/';  
                 
               
            } else if(operators.length == 1){
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push('/');
            } else if(operators.length == 0) {
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push(displayValues.numbers);
                operators.push('/');
                displayValues.numbers = '';
            }

           
        break;
        case '=':
            if(operators.length == 2){
                operators.push(displayValues.numbers)
                const [num1,operator, num2] = operators;
                calculatorResult.textContent = operate(operator, parseInt(num1),parseInt(num2));
                calculatorOperationsContainer.textContent = calculatorResult.textContent;
                operationsLength = calculatorOperationsContainer.textContent.trim().length;

                operators = []
                operators.push(calculatorOperationsContainer.textContent);
                displayValues.numbers = '';

            }
        break;
    }
    operationsLength = calculatorOperationsContainer.textContent.trim().length;

}
 
function clearScreen(){
    calculatorOperationsContainer.textContent = '';
    calculatorResult.textContent = '';
    operators = [];
    displayValues.numbers = '';
}
function erase(){
    if(operationsLength < 1){
        operationsLength = 0;
    } else {
        operationsLength--;
        operators.pop();
    }
 if(calculatorOperationsContainer.textContent.trim().length > 0){
    calculatorOperationsContainer.textContent = calculatorOperationsContainer.textContent.trim()
    .split('')
    .filter((letter,index)=>{
        if(index == operationsLength){
             
        } else {
           return letter;
        }
    })
    .join('') 
 }
 displayValues.numbers = displayValues.numbers
 .split('')
 .filter((letter,index)=>{
     if(index == operationsLength){
          
     } else {
        return letter;
     }
 })
 .join('') 
 calculatorResult.textContent = calculatorResult.textContent.trim()
 .split('')
 .filter((letter,index)=>{
     if(index == operationsLength){
          
     } else {
        return letter;
     }
 })
 .join('') 

 console.log(displayValues, operators)

}
  
 

// keyboard event for all digits and operators
//window.addEventListener('keydown', populateDisplayNumbers);
window.addEventListener('keydown', populateDisplayOperators);
// event on numbers
document.querySelectorAll('.numbers').forEach(button => button.addEventListener('click', populateDisplayNumbers));

// event on operators
document.querySelectorAll('.operator').forEach(operator => operator.addEventListener('click', populateDisplayOperators));

// event on remove all
document.querySelector('.delete').addEventListener('click', clearScreen)
  
// even on erasing single digits or operators
document.querySelector('.erase').addEventListener('click', erase);