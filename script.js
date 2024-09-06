const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation-display');
const buttons = document.querySelectorAll('.buttons button');

let num1 = null;
let num2 = null;
let operator = null;
let displayValue = ''; 
let resultDisplayed = false;
let operatorPressedLast = false;

// Math Functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        return "Can't divide by 0";
    }
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

// Button click events
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        switch (true) {
            case !isNaN(buttonText) || buttonText === '.':
                handleNumberInput(buttonText);
                break;
            case ['+', '-', '*', '/'].includes(buttonText):
                handleOperatorInput(buttonText);
                break;
            case buttonText === '=':
                handleEquals();
                break;
            case buttonText === 'C':
                clearDisplay();
                break;
            case buttonText === '⌫':
                backspace();
                break;
            case buttonText === '±':
                negate();
                break;
        }
    });
});

// Handle numbers and decimal inputs
function handleNumberInput(value) {
    if (resultDisplayed) {
        displayValue = ''; 
        resultDisplayed = false;
    }
    
    // Ignore if decimal is already present
    if (value === '.' && displayValue.includes('.')) {
        return; 
    }

    displayValue += value;
    display.value = displayValue;
    operatorPressedLast = false;
}

// Handles inputs of operator and displays
function handleOperatorInput(value) {
    if (operatorPressedLast) {
        // Replace operator with most recent pressed
        operator = value;
        operationDisplay.textContent = `${num1} ${operator}`;
        return;
    }

    if (num1 === null) {
        num1 = parseFloat(displayValue);
        operator = value;
        operationDisplay.textContent = `${num1} ${value}`; 
        displayValue = ''; 
    } else if (num1 !== null && operator !== null && !resultDisplayed) {
        num2 = parseFloat(displayValue);
        const result = operate(operator, num1, num2);
        displayValue = ''; 
        display.value = result.toString(); 
        num1 = result;
        operator = value;
        operationDisplay.textContent = `${num1} ${value}`; 
    } else if (resultDisplayed) {
        operator = value;
        operationDisplay.textContent = `${num1} ${value}`;
        displayValue = ''; 
        resultDisplayed = false;
    }
    operatorPressedLast = true; 
}

// Perform operation and update display
function handleEquals() {
    if (num1 !== null && operator !== null) {
        num2 = parseFloat(displayValue);
        const result = operate(operator, num1, num2); 
        displayValue = result.toString(); 
        display.value = displayValue;
        operationDisplay.textContent = `${operationDisplay.textContent} ${num2} =`; 
        num1 = result; 
        num2 = null;
        operator = null; 
        resultDisplayed = true; 
        operatorPressedLast = false;
    }
}

function clearDisplay() {
    displayValue = '';
    num1 = null;
    num2 = null;
    operator = null;
    resultDisplayed = false;
    operatorPressedLast = false;
    display.value = '';
    operationDisplay.textContent = '';
}

function backspace() {
    displayValue = displayValue.slice(0, -1); 
    display.value = displayValue;
}

function negate() {
    if (displayValue) {
        displayValue = displayValue.startsWith('-') ? displayValue.slice(1) : '-' + displayValue;
        display.value = displayValue;
    }
}
