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

const disp = document.querySelector(".display");
disp.textContent = "";

let a = "";
console.log(a);
let b = "";
let operator = "";
let equals = false;
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
    let target = event.target.closest(".btn") || event.target.closest(".btn-zero")

    const display = document.querySelector(".display");


    if (target.classList.contains("number")) {
        if (operator === "") {
            let newDigit = target.textContent;
            console.log(target.textContent)
            display.textContent += newDigit;
            a += newDigit;
        } else {
            b += target.textContent;
            let newDigit = target.textContent;
            display.textContent += newDigit;    
        }
    } else if (target.classList.contains("operator")) {
        let op = target.textContent;

        if (op !== "=") {
            if (operator !== "") { // if we already have an operator -> do chained calculation
                a = operate(a, b, operator);
                display.textContent = `${a}`;
                b = ""; 
                operator = "";
            } else {
                operator = op;
                display.textContent = "";
            }
        } else {
            display.textContent = "";
            let result = operate(a, b, operator);
            display.textContent = `${result}`;
            a = result.toString(); // keep current result as first operand of next calculation
            b = "";
            operator = ""
        }
    } else if (target.classList.contains("special")) {
        if (target.textContent === "AC") {
            display.textContent = "";
            a = "";
            b = "";
            operator = "";
            equals = false;
        } else if (target.textContent === "DEL") {
            if (display.textContent !== "") {
                if (a !== "" && b === "") { // if we have a but not b
                    a = a.slice(0, -1); // remove last element
                    display.textContent = a;
                } else {
                    b = b.slice(0, -1);
                    display.textContent = b;
                }
            }
        } else if (target.textContent === "%") {
            operator = "%";
            display.textContent = "";

        }
    }
})

