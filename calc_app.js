
const display = document.querySelector("#display"); // assigns the value of the calculator display for later use
let operator = '';
let num1 = '';
let num2 = '';


// ----- Gets the key values. This function parses and collects data from/for other functions -----
function getKeyValue() { // utilized closures to allow button values to be parsed to required functions.
    const buttons = document.querySelectorAll("button"); // querySelectorAll (local scope) creates a static node list that match elements with "button" tag.
    buttons.forEach(btn => { // forEach (array iterator method) loops through each btn element in the collection of nodes (NodeList object).
        btn.addEventListener('click', () => { //attaches addEventListener-"click" as event & anonymous arrow function (callback) as the listener argument (event handler runs the listener func).
            btn.matches('#clearButton') ? clearDisplayValue() // .matches() method returns a boolean value whether an element matches a CSS selector. ternary operator for readability.
            : btn.matches('#posNeg') ? posNegToggle() // switches between positive and negative values.
            : btn.matches('#percent') ? percentConversion()
            : btn.matches('.numButton') ? displayNum(btn) // displays the number value chosen by the user.
            : btn.matches('.operator') ? getOperator(btn) // gets the arithmatic operator value. 
            : btn.matches('#decimal') ? insertDecimal() // calls the decimal function to insert the decimal.
            : btn.matches('#equal') ? calculate() // calculates the num1 and num2 values.
            : display.innerText = "ERROR";
        })
    })
}
getKeyValue();

// ----- Gets the number value to display and assigns values num1 and num2 variables -----
function displayNum(btn) { // takes the number button value as a parameter.
    if (!operator) { // condition to check for first entry (prior to user selecting an operator).
        if (display.innerText === '0') { // checks for the display default value.
            display.innerText = btn.innerText; // replaces default value with the first user-chosen value.
        } else {
            display.innerText += btn.innerText; // appends additional user-chosen values.
        }
        num1 = display.innerText; // assigns the display value to num1.
        console.log(num1);
    }
// assigns the value of zero to num1 if the user choses NOT to enter a number or wants to add to zero (for display asthetics).
    if (num1 === '' && operator) {
        num1 ='0';
    }
// after num1 has been defined AND an operator has been chosen by the user.
    if (operator) { // checks if the operator value is present.
        if (display.innerText === num1) { // condition to confirm the first number has been entered by the user.
            display.innerText = btn.innerText; // replaces the cleared display with new set of chosen number(s).
        } else {
            display.innerText += btn.innerText; // appends additional user-chosen values.
        }
        num2 = display.innerText; // assigns the display value to num2.
        console.log(num2);
    }
}

// ----- Inserts the decimal point for float values -----
function insertDecimal() {
    if (display.innerText.includes('.')) { // using the "str.includes()" method (returns boolean t/f) to search for an existing decimal place so it can't be entered twice.
        return; // this ends the conditional statement, preventing the user from adding another decimal place.
    } else {
        display.innerText = `${display.innerText}.` // adds the decimal place if it doesn't exist in the number string using template literal and string interpolation .
    }
}

// ----- Gets number value for math calculations -----
function getOperator(btn) {
    operator = btn.innerText; // defines the operator value based on the user's choice.
    console.log(operator)
}

// CAN I CHANGE ANY OF THE IF STATEMENTS TO WHILE LOOPS?
function posNegToggle() { // changes the value of the current number to positive or negative, depending on the current sign of the number.
    if (!operator) {
        if (display.innerText === num1) { // checks if the current display value is num1.
            if (Math.sign(display.innerText) === 1) { // Math.sign() returns a 1 or -1 negative depending the the sign of the number argument.
                display.innerText = (-display.innerText); // toggles the display value to negative if positive.
            } else if (Math.sign(display.innerText) === -1) {
                display.innerText = (-display.innerText); // toggles the display value to positive if negative.
            }
            num1 = display.innerText; // reassigns the value of num1 to the new positive or negative sign.
            console.log(`this is num1: ${num1}`);
        }
    }
// after num1 has been reassigned the new positive or negative value.
    if (operator) { // condition to verify that the value the user will enter is distinct from num1, even of they are the same (example: 5 - -5 or 5 + -5).
        if (display.innerText === num2) {
            if (Math.sign(display.innerText) === 1) {
                display.innerText = (-display.innerText); 
            } else if (Math.sign(display.innerText) === -1) {
                display.innerText = (-display.innerText);
            }
            num2 = display.innerText; // reassigns the value of num2 to the new positive or negative sign.
            console.log(`this is num2: ${num2}`);
        }
    }
    console.log(`NUM1 is ${num1} and NUM2 is ${num2}`);
}

function percentConversion() { // changes the value to a decimal representation of percent.
    if (display.innerText === num1) {
        display.innerText = display.innerText / 100; // uses implicit coercion.
        num1 = display.innerText;
    } else if (display.innerText === num2) {
        display.innerText = display.innerText / 100;
        num2 = display.innerText;
    }
}

// ----- Calculates the first and second number based on the operator -----
function calculate() {
    let result = NaN;
    switch(operator) { // operator value to compare against.
        case '/':
            result = parseFloat(num1) / parseFloat(num2); // converts string to a floating point number.
            break;
        case 'x':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        default:
            result;
    }
    console.log(num1, num2);
    display.innerText = String(result); // converts the result from a floating point number to back to a string for further concatenation.
    num1 = display.innerText; // reassigns num1 value to the calculated value for further calculations.
    num2 = ''; // resets num2 for the next calculation.
    console.log(`num1 is ${num1} and num2 is ${num2}`);
}

// ----- Resets the calculator display and global variables -----
function clearDisplayValue() {
    console.log('clear button');
    operator = '';
    num1 = '';
    num2 = '';
    display.innerText = '0';
}