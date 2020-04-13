const calculatorOperationsContainer = document.querySelector('#calculator__operations');
const calculatorResult = document.querySelector('#calculator__result');

const displayValues = {
    numbers: '',
    operator: '',
}

let operationsLength = 0;
let displayNumbersLength = 0;
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
        document.querySelector('#error__message').classList.add('show');
    } else {
        return Math.round(num1 / num2);
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
    let currentNumber = this.textContent || e.key;
    
    if((currentNumber.match(/^[0-9]+$/) != null) && displayValues.numbers.length < 12){
       displayValues.numbers += currentNumber;
       calculatorOperationsContainer.textContent += currentNumber;
       operationsLength = calculatorOperationsContainer.textContent.trim().length;
       displayNumbersLength = displayValues.numbers.length
       console.log(displayValues)
    }
}

function populateDisplayOperators(e){
    let currentOperator = this.textContent || e.key;
    
    switch(currentOperator){
        case '+':   
            
            if(operators.length == 2){
                operators[1] = '+';  
               
                
            } else if(operators.length == 1){
                calculatorOperationsContainer.textContent += currentOperator;
                operators.push('+');
                operators[0] = displayValues.numbers;
                displayValues.numbers = '';                 
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
            operators[0] = displayValues.numbers;
            displayValues.numbers = '';
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
                operators[0] = displayValues.numbers;
                displayValues.numbers = '';
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
                operators[0] = displayValues.numbers;
                displayValues.numbers = '';
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
                displayNumbersLength = displayValues.numbers.length
                
                operators = []
                operators.push(calculatorOperationsContainer.textContent.trim());
                displayValues.numbers = operators[0].slice();
                     
                 

            }
        break;
    }
    displayNumbersLength = displayValues.numbers.length
    operationsLength = calculatorOperationsContainer.textContent.trim().length;
   

}
 
function clearScreen(e){
    let currentDelete = e.key || this.textContent.toLowerCase();
    console.log(currentDelete, '12')
    if(currentDelete == 'c'){
        calculatorOperationsContainer.textContent = '';
        calculatorResult.textContent = '';
        operators = [];
        displayValues.numbers = '';
        displayNumbersLength = displayValues.numbers.length
       
    }
     
}

function erase(e){
     
    let currentBackSpace = e.key || this.textContent
     console.log(currentBackSpace)
    if(currentBackSpace == '<' || currentBackSpace == 'Backspace'){
        console.log(currentBackSpace)    
     if(operationsLength < 1){
        operationsLength = 0;
     } else {
        operationsLength--;
         
     }
     if(displayNumbersLength < 1){
         displayNumbersLength = 0;
     } else {
         displayNumbersLength--;
     }
     
     if(calculatorOperationsContainer.textContent.trim().length > 0){
        calculatorOperationsContainer.textContent = updateErase(calculatorOperationsContainer.textContent.trim(), operationsLength)

    }
        calculatorResult.textContent = updateErase(calculatorResult.textContent.trim(), operationsLength);
        displayValues.numbers = updateErase(displayValues.numbers, displayNumbersLength);
       
    
    }
  
       
 
}
  
function updateErase(currentDigits, strLength){
    return currentDigits.slice(0, strLength);
}

 function removeErrorMessage(){
     this.parentNode.parentNode.removeChild(this.parentNode);
 }
 
 
 

// event on numbers
document.querySelectorAll('.numbers').forEach(button => button.addEventListener('click', populateDisplayNumbers));
window.addEventListener('keydown', populateDisplayNumbers);

// event on operators
document.querySelectorAll('.operator').forEach(operator => operator.addEventListener('click', populateDisplayOperators));
window.addEventListener('keydown', populateDisplayOperators);

// event on remove all
document.querySelector('.delete').addEventListener('click', clearScreen)
window.addEventListener('keydown', clearScreen)

// event on erasing single digits or operators
document.querySelector('.erase').addEventListener('click', erase);
window.addEventListener('keydown', erase)

// adding event listener to remove error message when number divided by 0 
document.querySelector('.remove__error-message').addEventListener('click', removeErrorMessage);