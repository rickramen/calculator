let num1 = null;
let num2 = null;
let operator = null;

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


console.log(operate('+',5,5));
console.log(operate('-',10,5));
console.log(operate('*',5,5));
console.log(operate('/',25,5));