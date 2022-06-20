const buttons = document.querySelectorAll(".btn-area>div");
// console.log(buttons)
const btnArg = Array.from(buttons); // looping
// display
const displayElm = document.querySelector(".display");
let displayValue = "";
// audio
// const a = new Audio(a.wav);

let operators = ["+", "-", "/", "*"];
let lastOperators = "";

btnArg.forEach((button) => {
  button.addEventListener("click", function () {
    const val = button.innerText;
    // console.log(val);
    displayElm.innerText = val;

    if (val === "AC") {
      displayValue = "";
      display();
      return;
    }

    if (val === "C") {
      displayValue = displayValue.slice(0, -1);
      display(displayValue);
      return;
    }

    if (operators.includes(val)) {
      lastOperators = val;
      //   console.log(lastOperators);
      let lastChar = displayValue[displayValue.length - 1];
      //   console.log(lastChar);
      if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
        displayValue += val;
        display(displayValue);
        return;
      }
    }

    if (val === ".") {
      if (lastOperators) {
        const operatorIndex = displayValue.lastIndexOf(lastOperators);
        const lastNumberSet = displayValue.slice(operatorIndex + 1);
        if (lastNumberSet.includes(".")) {
          return;
        }
      }
      if (!lastOperators && displayValue.includes(".")) {
        return;
      }
    }

    if (val === "=") {
      const lastChar = displayValue[displayValue.length - 1];
      if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
      }
      return total();
    }

    if (displayValue === "") {
      if (operators.includes(val)) {
        return;
      }
    }

    displayValue += val;
    display(displayValue);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  //   const Audio = new Audio(a);
  const prankValue = randomNumber();
  prankValue > 0 && (displayValue += prankValue);
  const ttl = eval(displayValue) + prankValue;
  displayValue = ttl.toString();
  display(ttl);
};

const randomNumber = () => {
  const num = Math.ceil(Math.random() * 10);
  return num > 3 ? 0 : num;
};
