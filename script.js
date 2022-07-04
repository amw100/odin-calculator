const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearbtn = document.querySelector(".clear");
const delbtn = document.querySelector(".delete");
const eqlbtn = document.querySelector(".equals");
const display = document.querySelector(".display-text");

let currentNum = '';
let previousNum = '';
let currentOperator = undefined;

initialize();

function operate(num1, num2, operator) {
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
            return;
    }
}

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
    return num1 / num2;
}

function updateDisplay(){
    display.nodeValue = currentNum.toString();
}

function appendNumber(number){
    currentNum += number.toString();
}

function chooseOperator(operator){
    if (currentNum === '') return;
    if (previousNum !== '') compute();
    currentOperator = operator;
    previousNum = currentNum;
    currentNum = '';
}

function clr(){
    currentNum = '';
    previousNum = '';
    currentOperator = undefined;
}

function del(){
    currentNum = currentNum.toString().slice(0,-1);
}

function compute(){
    prev = parseFloat(previousNum);
    cur = parseFloat(currentNum);
    if(isNaN(prev) || isNaN(cur)) return;
    currentNum = operate(previousNum, currentNum, currentOperator);
    currentOperator = undefined;
    previousNum = '';
}

function initialize(){
    numberButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            appendNumber(btn.innerHTML);
            updateDisplay();
        });
    });
    operatorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            chooseOperator(btn.innerHTML);
            updateDisplay();
        });
    });
    eqlbtn.addEventListener('click', () => {
        operate(previousNum, currentNum, currentOperator);
        updateDisplay();
    });
    clearbtn.addEventListener('click', () => {
        clr();
        updateDisplay();
    });
    delbtn.addEventListener('click', () => {
        del();
        updateDisplay();
    });
}
