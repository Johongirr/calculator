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
    let currentNumber = this.textContent || e.key;
    
    if(currentNumber.match(/^[0-9]+$/) != null){
       displayValues.numbers += currentNumber;
       calculatorOperationsContainer.textContent += currentNumber;
       operationsLength = calculatorOperationsContainer.textContent.trim().length;
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
        case 'Enter':
        case '=':
            
            if(operators.length == 2){
                operators.push(displayValues.numbers)
                const [num1,operator, num2] = operators;
                console.log(operators)
                calculatorResult.textContent = operate(operator, parseInt(num1),parseInt(num2));
                calculatorOperationsContainer.textContent = calculatorResult.textContent;
                operationsLength = calculatorOperationsContainer.textContent.trim().length;

                
                operators = []
                operators.push(calculatorOperationsContainer.textContent.trim());
                displayValues.numbers = operators[0].slice();
                console.log(displayValues)
                 
                 

            }
        break;
    }
    operationsLength = calculatorOperationsContainer.textContent.trim().length;

}
 
function clearScreen(e){
    let currentDelete = e.key || this.textContent.toLowerCase();
    if(currentDelete.includes('c')){
        calculatorOperationsContainer.textContent = '';
        calculatorResult.textContent = '';
        operators = [];
        displayValues.numbers = '';
        console.log(`Operators after clear screen: ${operators}, ${displayValues}`)
    }
     
}

function erase(e){
    let currentBackSpace = e.key || this.textContent
    
    if(currentBackSpace == 'Backspace' || currentBackSpace == '<'){
        console.log(e.key)
     if(operationsLength < 1){
        operationsLength = 0;
     } else {
        operationsLength--;
         
     }
     if(calculatorOperationsContainer.textContent.trim().length > 0){
        calculatorOperationsContainer.textContent = updateErase(calculatorOperationsContainer.textContent.trim())

    }
        displayValues.numbers = updateErase(displayValues.numbers);
        calculatorResult.textContent = updateErase(calculatorResult.textContent.trim());
    
    console.log(`Operators after erase: ${operators}`)       
    }
       
 
}
  
function updateErase(currentDigits){
    return currentDigits
    .split('')
    .filter((letter,index)=>{
            if(index == operationsLength){
          
            } else {
                return letter;
            }
    })
    .join('') 
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