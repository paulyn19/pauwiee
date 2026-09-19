function calculator(a, b, operation) {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return b !== 0 ? a / b : "Error: division by zero";
    default:
      return "Invalid operation";
  }
}

console.log("5 + 3 =", calculator(5, 3, "add"));
console.log("5 - 3 =", calculator(5, 3, "subtract"));
console.log("5 * 3 =", calculator(5, 3, "multiply"));
console.log("5 / 3 =", calculator(5, 3, "divide"));