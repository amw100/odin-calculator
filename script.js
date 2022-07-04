const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearbtn = document.querySelector(".clear");
const delbtn = document.querySelector(".delete");
const eqlbtn = document.querySelector(".equals");
const decimalbtn = document.querySelector(".decimal")
const display = document.querySelector(".display-text");

let currentNum = '';
let previousNum = '';
let currentOperator = undefined;
let clickedEquals = false;

initialize();

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return roundToTwo(add(num1, num2));
        case '-':
            return roundToTwo(subtract(num1, num2));
        case '*':
            return roundToTwo(multiply(num1, num2));
        case '/':
            return roundToTwo(divide(num1, num2));
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

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function updateDisplay(){
    display.value = currentNum.toString();
}

function appendNumber(number){
    if(clickedEquals){
        clickedEquals = false;
        currentNum = '';
    }
    currentNum += number.toString();
}

function chooseOperator(operator){
    clickedEquals = false;
    if (currentNum === '') return;
    if (previousNum !== '') compute();
    currentOperator = operator;
    previousNum = currentNum;
    updateDisplay();
    currentNum = '';
}

function clr(){
    clickedEquals = false;
    currentNum = '';
    previousNum = '';
    currentOperator = undefined;
}

function del(){
    clickedEquals = false;
    currentNum = currentNum.toString().slice(0,-1);
}

function compute(){
    prev = parseFloat(previousNum);
    cur = parseFloat(currentNum);
    if(isNaN(prev) || isNaN(cur)) return;
    currentNum = operate(prev, cur, currentOperator);
    console.log(currentNum);
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
        });
    });
    eqlbtn.addEventListener('click', () => {
        compute()
        updateDisplay();
        clickedEquals = true;
    });
    decimalbtn.addEventListener('click', () => {
        appendNumber(decimalbtn.innerHTML);
        updateDisplay();
    })
    clearbtn.addEventListener('click', () => {
        clr();
        updateDisplay();
    });
    delbtn.addEventListener('click', () => {
        del();
        updateDisplay();
    });
    document.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        if (event.key >= "0" && event.key <= "9"){
            appendNumber(event.key);
            updateDisplay();
        }
        else if (event.key == '+' || event.key == '*' || event.key == '-' || event.key == '/'){
            chooseOperator(event.key);
        } 
        else if(event.key == '='){
            compute()
            updateDisplay();
            clickedEquals = true;
        }
        else if(event.key =='.'){
            appendNumber(decimalbtn.innerHTML);
            updateDisplay();
        }
        else if(event.key == "Backspace"){
            del();
            updateDisplay();
        }
    })
}
