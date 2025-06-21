// clear the display
const display = document.querySelector(".display");
display.textContent = "";

// object to store relevant fields for operations
const calculator = {
    operandOne: [],
    operator: "",
    operandTwo: [],
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
    let target = event.target.closest(".btn") || event.target.closest(".btn-zero")

    const display = document.querySelector(".display");


    if (target.classList.contains("number")) {
        numberPressed(calculator, target, display);
    } else if (target.classList.contains("operator")) {
        operatorPressed(calculator, target, display);
    } else if (target.classList.contains("special")) {
        specialPressed(calculator, target, display);
    }
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "ERROR";
    }
}

function modulo(a, b) {
    if (b !== 0) {
        return a % b;
    } else {
        return "ERROR";
    }
}

function operate(a, b, operator) {
    let num1 = parseFloat(a);
    let num2 = parseFloat(b);

    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "x") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    } else if (operator === "%") {
        return modulo(num1, num2);
    }
}



function numberPressed(calculator, target, display) {
    let newDigit = target.textContent; // we take the content of the button pressed as the new digit to register
    let accepted;
    if (calculator.operator === "") { // operator has not been pressed yet -> we are editing operandTwo
        accepted = processNewDigit(calculator.operandOne, newDigit) // we add the new digit to operandOne
    } else { // operator has been pressed -> we are processing operandTwo
        if (display.textContent === calculator.operandOne.join("") && calculator.operandTwo.length === 0) { // we are currently displaying the result of a previous chain
            display.textContent = ""; // start fresh for operandTwo 
        }
        accepted = processNewDigit(calculator.operandTwo, newDigit) // append new digit to operandTwo 
    }
    if (accepted) {
        display.textContent += newDigit;
    }
}

function processNewDigit(operand, newDigit) {
    if (newDigit === ".") {
        if (operand.includes(newDigit)) {
            return false;
        } else if (operand.length === 0) {
            operand.push("0");
        }
    }
    operand.push(newDigit);
    return true;
}

function operatorPressed(calculator, target, display) {
    let op = target.textContent; // the operator that was just pressed

    if (op !== "=") { // the operator is not =
        if (calculator.operator === "" &&  // operator had not been pressed yet in current chain
            calculator.operandOne.length !== 0 && // operandOne has been entered
            calculator.operandTwo.length === 0) {  // operandTwo is yet to be entered
                display.textContent = ""; // clear display
                calculator.operator = op;
        } else if (calculator.operator !== "" && // operator has been entered before
            calculator.operandOne.length !== 0 && // operandOne has been entered
            calculator.operandTwo.length !== 0) { // operandTwo has been entered 
                // this is our calculation chaining logic
                let result = operate(calculator.operandOne.join(""), calculator.operandTwo.join(""), calculator.operator); // complete calculation with previous operator
                calculator.operandOne = String(result).split(""); // set result of previous chain to the current operandOne
                calculator.operandTwo.length = 0; // clear operandTwo
                calculator.operator = op; // set operator to the operator that was just pressed

                display.textContent = calculator.operandOne.join(""); // display operandOne
        } else if (calculator.operator !== "" && // operator has been entered
            calculator.operandOne.length !== 0 && // operandOne is populated -> ie during a chain
            calculator.operandTwo.length === 0 // operandTwo is empty -> it has been used in a calculation to become operandOne
        ) {
            // this is the second part of the calculation chaining logic
            display.textContent = "";

        }
    } else { // "=" has been pressed
        if (calculator.operandOne.length !== 0 &&
            calculator.operator !== "" &&
            calculator.operandTwo.length !== 0
        ) { // check if all three params for operate() are valid
            console.log(calculator);
            calculator.operandOne = String(operate(calculator.operandOne.join(""), calculator.operandTwo.join(""), calculator.operator)).split(""); // calculate the expression
            display.textContent = calculator.operandOne.join(""); // push result to display
            calculator.operandTwo.length = 0;
            calculator.operator = "";
        }
    }
}

function specialPressed(calculator, target, display) {
    if (target.textContent === "AC") {
        clear(calculator, display);
    } else if (target.textContent === "DEL") {
        del(calculator, display);
    }
}

function clear(calculator, display) {
    calculator.operandOne.length = 0;
    calculator.operator = "";
    calculator.operandTwo.length = 0;

    display.textContent = "";
}

function del(calculator, display) {
    if (calculator.operandTwo.length !== 0 && display.textContent === calculator.operandTwo.join("")) { // if operandTwo has digits and is being displayed
        calculator.operandTwo.splice(calculator.operandTwo.length - 1, 1); // remove last digit from operandTwo
    } else if (calculator.operandOne.length !== 0 && display.textContent === calculator.operandOne.join("")) { // if operandOne has digits and is being displayed
        calculator.operandOne.splice(calculator.operandOne.length - 1, 1); // remove last digit from operandTwo
    }    
    display.textContent = display.textContent.slice(0, -1); // remove last character from what's being displayed
}
