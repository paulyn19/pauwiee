def calculator(a, b, operation):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        return a / b if b != 0 else "Error: division by zero"
    else:
        return "Invalid operation"

print("5 + 3 =", calculator(5, 3, "add"))
print("5 - 3 =", calculator(5, 3, "subtract"))
print("5 * 3 =", calculator(5, 3, "multiply"))
print("5 / 3 =", calculator(5, 3, "divide"))