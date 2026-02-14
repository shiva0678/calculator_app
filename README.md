# Calculator
# Calculator (JavaScript)
netlify link : https://wondrous-bublanina-1fa114.netlify.app

This is a calculator built using HTML, CSS and JavaScript.

The main goal of this project was to build a calculator without using JavaScript's built-in `eval()` function. Instead, I implemented my own expression evaluation logic using recursion and stack concepts.

---

## Features

- Supports +, -, *, /
- Supports parentheses ( )
- Handles nested parentheses
- Supports multi-digit numbers
- Supports decimal values
- Clear (AC) and Delete (DEL) buttons
- Proper operator precedence handling

---

## How It Works

The calculator uses a recursive helper function to evaluate expressions.

Basic idea:

- Traverse the expression character by character.
- Build numbers (including decimals).
- When encountering '(', recursively evaluate the sub-expression.
- Use a stack to manage operator precedence.
- Immediately resolve multiplication and division.
- Defer addition and subtraction by pushing signed values to the stack.
- At the end, sum the stack to get the final result.

Time complexity: O(n)  
Space complexity: O(n)

---

## Example Expressions

- 2*(3+4)
- 12.5+3.2
- (2+3)*(4+5)
- 10/2+6*3

---

## Why I Built This

I wanted to understand how expression parsing works internally instead of relying on `eval()`.  
This helped me practice recursion, stack usage, and operator precedence handling.

---

## Tech Stack

- HTML
- CSS
- JavaScript (Vanilla JS)

---

## Future Improvements

- Add unary minus support
- Improve input validation
- Add keyboard support
- Improve UI responsiveness
