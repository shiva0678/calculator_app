const display = document.querySelector("#display");

const buttons = document.querySelectorAll(".num");
const clearbtn = document.getElementById("clear-btn");
const operators = document.querySelectorAll(".operator");
const deletebtn = document.getElementById('delete');
const equalsbtn = document.getElementById('equals');

let result = "";
const appendToDisplay = (number) => {
    if (number === '.') {
        // Split result into parts seperated by operators
        let strippedResult = result.split(/[\-\+\*\/\(\)]/);
        // Get last number after last operator
        let lastpart = strippedResult.pop();
        if (lastpart.includes('.')) return;
        // if last part is empty string add 0.
        if (lastpart === '') {
            result += '0.';
        }
    }
    if (result === "0" && number !== ".") result = ""; // Replace initial 0
    result += number;
    updateDisplay();
}

const updateDisplay = () => {
    if (result === "") {
        display.innerText = "0";
    } else {
        display.innerText = result;
    }
    // Scroll to the end to show latest numbers
    display.scrollLeft = display.scrollWidth;
}

const clearDisplay = () => {
    result = "";
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        appendToDisplay(button.innerText);
    })
})
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operator.innerText === '*' ||
            operator.innerText === '/' ||
            operator.innerText === '+' ||
            operator.innerText === '-') {

            if (result !== "" && !['+', '-', '*', '/', '('].includes(result[result.length - 1])) {
                appendToDisplay(operator.innerText);
            }

        } else {
            appendToDisplay(operator.innerText);
        }
    })
})

clearbtn.addEventListener('click', () => {
    clearDisplay();
})
deletebtn.addEventListener('click', () => {
    result = result.slice(0, result.length - 1);
    updateDisplay();
})
equalsbtn.addEventListener('click', () => {
    result = calculateResult(result);
    updateDisplay();
})
const calculateResult = (expression) => {
    let i = 0;
    function helper() {
        let stack = [];
        let currentNumber = 0;
        let lastOperator = '+';//to handle initiial case so that it manages to push first number

        while (i < expression.length) {
            let char = expression[i];
            if (!isNaN(char) || char == '.') {
                let str = "";
                while (i < expression.length && (!isNaN(expression[i]) || expression[i] === '.')) {
                    str += expression[i];
                    i++;
                }
                currentNumber = parseFloat(str);
                i--;//because i++ is done in while loop , if we dont decrement we will skip operator


            }
            if (char === '(') {
                i++;
                currentNumber = helper();

            }
            if (i === expression.length - 1 || (isNaN(char) && char !== ' ' && char !== '.')) {
                if (lastOperator === '+') {
                    stack.push(currentNumber);
                }
                else if (lastOperator === '-') {
                    stack.push(-currentNumber);
                }
                else if (lastOperator === '*') {
                    stack.push(stack.pop() * currentNumber);
                }
                else if (lastOperator === '/') {
                    stack.push(stack.pop() / currentNumber);
                }

                currentNumber = 0;
                lastOperator = char;

                if (char === ')') {
                    break;//to exit from while loop or inner helper function
                }

            }
            i++;

        }
        return stack.reduce((a, b) => a + b, 0);

    }
    return helper();

}

