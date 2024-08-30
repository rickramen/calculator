const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let num1 = null;
let num2 = null;
let operator = null;
let displayValue = ''; 

// Math Functions
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 == 0){
        return ':(';
    }
    return num1 / num2;
}


function operate(operator, num1, num2){
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

// Button click events
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        switch (buttonText) {
            case 'C':
                clearDisplay();
                break;
            case '⌫':
                backspace()
                break;
            case '=':
                break;
            case '±':
                negate();
                break;
            default:
                updateDisplay(buttonText);
                break;
        }
    });
});

// Display updates
function updateDisplay(value) {
    displayValue += value;
    display.value = displayValue; // Update display with new value
}

function clearDisplay() {
    displayValue = '';
    display.value = '';
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


console.log(operate('+',5,5));
console.log(operate('-',10,5));
console.log(operate('*',5,5));
console.log(operate('/',25,5));