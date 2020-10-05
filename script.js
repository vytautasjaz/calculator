const numbersButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const clearEntryButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]');
const currentOperandField = document.querySelector('[data-current-operand]');
const previousOperandField = document.querySelector('[data-previous-operand]');
const equalsButton = document.querySelector('[data-equals]');
const backspaceButton = document.querySelector('[data-backspace]');

let finalValue = 0;
let operand;
let action = '';
let start = true;
let equalsClick = false;
currentOperandField.innerHTML = '0';

//Functions
const clearAll = () => {
  previousOperandField.innerHTML = '';
  currentOperandField.innerHTML = '0';
  operand = 0;
  finalValue = 0;
  start = true;
};

const clearEntry = () => {
  if (start) {
    previousOperandField.innerHTML = '';
    currentOperandField.innerHTML = '0';
  } else {
    operand = '';
    currentOperandField.innerHTML = '0';
  }
};

const equals = () => {
  if (action === '+') {
    finalValue += +operand;
  } else if (action === '-') {
    finalValue -= +operand;
  } else if (action === '*') {
    finalValue *= +operand;
  } else if (action === '÷') {
    finalValue /= +operand;
  }

  previousOperandField.innerHTML += ` ${currentOperandField.innerHTML}`;
  currentOperandField.innerHTML = finalValue;
  finalValue = 0;
  start = true;
  equalsClick = true;
};

const clearLastEntry = () => {
  let newOperand = currentOperandField.innerHTML.slice(0, -1);
  currentOperandField.innerHTML = newOperand;
  operand = newOperand;
};

//Events

//Event when number button is clicked
numbersButtons.forEach((number) => {
  number.addEventListener('click', () => {
    if (start) {
      previousOperandField.innerHTML = '';
      currentOperandField.innerHTML = '';
    }

    if (currentOperandField.innerHTML == finalValue) {
      currentOperandField.innerHTML = '';
    }

    currentOperandField.innerHTML += number.innerHTML;
    operand = currentOperandField.innerHTML;
    start = false;
  });
});

//Event when operation button is clicked
operationsButtons.forEach((operation) => {
  operation.addEventListener('click', () => {
    if (equalsClick === false) {
      previousOperandField.innerHTML += ` ${currentOperandField.innerHTML} ${operation.innerHTML}`;
      if (finalValue === 0) {
        finalValue = +operand;
      } else if (action === '+') {
        finalValue += +operand;
      } else if (action === '-') {
        co;
        finalValue -= +operand;
      } else if (action === '*') {
        finalValue *= +operand;
      } else if (action === '÷') {
        finalValue /= +operand;
      }

      action = operation.innerHTML;
      currentOperandField.innerHTML = finalValue;
    } else if (equalsClick === true) {
      previousOperandField.innerHTML = `${currentOperandField.innerHTML} ${operation.innerHTML}`;
      operand = currentOperandField.innerHTML;
      finalValue = +currentOperandField.innerHTML;
      equalsClick = false;
      action = operation.innerHTML;
    }
    start = false;
  });
});

clearAllButton.addEventListener('click', clearAll);
clearEntryButton.addEventListener('click', clearEntry);
backspaceButton.addEventListener('click', clearLastEntry);
equalsButton.addEventListener('click', equals);
