// ===================== EXERCISE 2 =====================
function activity1() { alert("Welcome to JavaScript!"); console.log("This is my first JS Program."); }
function activity2() { let name = "Paulyn E. Cargadera"; let age = 20; let isStudent = true; console.log("Name:", name); console.log("Age:", age); console.log("Is Student:", isStudent); console.log(`My name is ${name}, I am ${age} years old.`); alert("Check the console for your details!"); }
function activity3() { let num1 = 10; let num2 = 5; console.log("Sum:", num1 + num2); console.log("Difference:", num1 - num2); console.log("Product:", num1 * num2); console.log("Quotient:", num1 / num2); alert("Results available in console!"); }
function activity4() { let userName = prompt("Enter your name:"); let favNum = prompt("Enter your favorite number:"); alert(`Hello ${userName}! Your favorite number is ${favNum}.`); }
function activity5() { let age = prompt("Enter your age:"); if (age >= 18) { alert("You are eligible for the main role!"); } else { alert("You are not eligible yet. Keep training!"); } }
function activity6() { console.log("For loop: 1 to 10"); for (let i = 1; i <= 10; i++) { console.log(i); } console.log("While loop: 10 to 1"); let j = 10; while (j >= 1) { console.log(j); j--; } alert("Check the console for results!"); }
function activity7() { alert("Button Clicked!"); }

// ===================== EXERCISE 3 =====================
function ex3_activity1() {
    const html = document.documentElement;
    const currentBg = html.getAttribute('data-bg') || '0';
    if (currentBg === '0') { html.setAttribute('data-bg', '1'); }
    else if (currentBg === '1') { html.setAttribute('data-bg', '2'); }
    else if (currentBg === '2') { html.setAttribute('data-bg', '3'); }
    else { html.setAttribute('data-bg', '0'); }
}

function ex3_activity2() {
    document.body.classList.toggle("dark-mode");
    if (!document.getElementById("dark-style")) {
        const style = document.createElement("style");
        style.id = "dark-style";
        style.innerHTML = `.dark-mode { background-color: #121212 !important; color: white; } .dark-mode aside, .dark-mode footer { background-color: #1f1f1f; }`;
        document.head.appendChild(style);
    }
}

function ex3_activity3() {
    const outputSection = document.querySelector(".output-content");
    let container = document.getElementById("todo-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "todo-container";
        container.className = "todo-card";
        const title = document.createElement("h3");
        title.textContent = "Item List";
        const inputWrapper = document.createElement("div");
        inputWrapper.className = "todo-input-group";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter a new item...";
        const btn = document.createElement("button");
        btn.textContent = "Add Item";
        const ul = document.createElement("ul");
        ul.id = "todo-list";
        btn.onclick = function () {
            const value = input.value.trim();
            if (value === "") { alert("Please enter a new item!"); return; }
            const li = document.createElement("li");
            li.textContent = value;
            ul.appendChild(li);
            input.value = "";
        };
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(btn);
        container.appendChild(title);
        container.appendChild(inputWrapper);
        container.appendChild(ul);
        outputSection.appendChild(container);
    }
}

function ex3_activity4() {
    const about = document.querySelector(".about-card");
    const paragraph = about.querySelector("p");
    if (paragraph) { paragraph.remove(); alert("Paragraph removed!"); }
    else { alert("Paragraph already removed!"); }
}

function ex3_activity5() {
    const outputSection = document.querySelector(".output-content");
    let container = document.getElementById("char-counter-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "char-counter-container";
        container.className = "char-counter-card";
        const title = document.createElement("h3");
        title.textContent = "Character Counter";
        const input = document.createElement("input");
        input.id = "charInput";
        input.type = "text";
        input.placeholder = "Type something...";
        const counter = document.createElement("p");
        counter.id = "charCount";
        counter.textContent = "Characters: 0";
        input.addEventListener("input", function () {
            counter.textContent = "Characters: " + input.value.length;
        });
        container.appendChild(title);
        container.appendChild(input);
        container.appendChild(counter);
        outputSection.appendChild(container);
    }
}

function ex3_activity6() {
    const parent = document.querySelector(".output-content");
    let container = document.getElementById("calculator-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "calculator-container";
        const title = document.createElement("h3");
        title.textContent = "Calculator";
        const input1 = document.createElement("input");
        input1.type = "number";
        input1.placeholder = "Enter first number";
        const input2 = document.createElement("input");
        input2.type = "number";
        input2.placeholder = "Enter second number";
        const button = document.createElement("button");
        button.textContent = "Add";
        const result = document.createElement("p");
        result.id = "calc-result";
        result.textContent = "Result will appear here";
        button.onclick = function () {
            result.textContent = "The sum is: " + (Number(input1.value) + Number(input2.value));
        };
        container.appendChild(title);
        container.appendChild(input1);
        container.appendChild(input2);
        container.appendChild(button);
        container.appendChild(result);
        parent.appendChild(container);
    }
}

// ===================== ACTIVITY 7 FIX =====================
function ex3_activity7() {
    const img = document.getElementById("movieImg");
    if (!img) { alert("Error: Image element not found!"); return; }

    // Get or create the label below the image
    let label = document.getElementById("img-label");
    if (!label) {
        label = document.createElement("p");
        label.id = "img-label";
        img.parentNode.insertBefore(label, img.nextSibling);
    }

    // Read which image is currently showing (0 = hidden/none shown yet)
    const current = img.dataset.current || "0";

    if (current === "0" || current === "2") {
        // Show image 1
        img.src = "img1.jpg";
        img.dataset.current = "1";
        label.textContent = "img1.jpg";
    } else {
        // Show image 2
        img.src = "img2.jpg";
        img.dataset.current = "2";
        label.textContent = "img2.jpg";
    }

    // Make the image visible using the CSS class
    img.classList.add("visible");
}
// ==========================================================

function ex3_activity8() {
    const outputSection = document.querySelector(".output-content");
    let container = document.getElementById("todo-container-8");
    if (!container) {
        container = document.createElement("div");
        container.id = "todo-container-8";
        container.className = "todo-card";
        const title = document.createElement("h3");
        title.textContent = "Advanced Todo List";
        const inputWrapper = document.createElement("div");
        inputWrapper.className = "todo-input-group";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter a task...";
        const addBtn = document.createElement("button");
        addBtn.textContent = "Add Task";
        const ul = document.createElement("ul");
        ul.id = "todo-list-8";
        addBtn.onclick = function () {
            const value = input.value.trim();
            if (value === "") { alert("Please enter a task!"); return; }
            const li = document.createElement("li");
            li.textContent = value;
            li.onclick = function () {
                if (confirm("Remove this task?")) { li.remove(); }
            };
            ul.appendChild(li);
            input.value = "";
        };
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(addBtn);
        container.appendChild(title);
        container.appendChild(inputWrapper);
        container.appendChild(ul);
        outputSection.appendChild(container);
    }
}

// ===================== EXERCISE 4 =====================
function ex4_gradeCalculator() {
    const outputSection = document.querySelector(".output-content");
    let container = document.getElementById("grade-calculator-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "grade-calculator-container";
        container.className = "todo-card";
        const title = document.createElement("h3");
        title.textContent = "Student Grade Calculator";
        container.appendChild(title);
        const createField = (labelText, id, placeholder) => {
            const lbl = document.createElement("label");
            lbl.textContent = labelText;
            lbl.className = "grade-label";
            const inp = document.createElement("input");
            inp.type = "number";
            inp.id = id;
            inp.min = "0";
            inp.max = "100";
            inp.placeholder = placeholder;
            inp.className = "grade-input";
            container.appendChild(lbl);
            container.appendChild(inp);
            return inp;
        };
        const quizInput = createField("Ave Quiz (0-100):", "ex4-quiz", "Enter quiz average");
        const examInput = createField("Exam Score (0-100):", "ex4-exam", "Enter exam score");
        const mcoInput  = createField("MCO Score (0-100):", "ex4-mco", "Enter MCO score");
        const btnWrapper = document.createElement("div");
        btnWrapper.className = "todo-input-group";
        btnWrapper.style.marginTop = "14px";
        const calcBtn = document.createElement("button");
        calcBtn.textContent = "Calculate Grade";
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Reset";
        resetBtn.style.background = "linear-gradient(135deg, #6c757d, #5a6268)";
        btnWrapper.appendChild(calcBtn);
        btnWrapper.appendChild(resetBtn);
        container.appendChild(btnWrapper);
        const resultBox = document.createElement("div");
        resultBox.className = "grade-result-box";
        resultBox.style.display = "none";
        const finalGradeP = document.createElement("p");
        const gradeEquivP = document.createElement("p");
        resultBox.appendChild(finalGradeP);
        resultBox.appendChild(gradeEquivP);
        container.appendChild(resultBox);
        outputSection.appendChild(container);
        calcBtn.addEventListener("click", () => {
            const quiz = parseFloat(quizInput.value);
            const exam = parseFloat(examInput.value);
            const mco  = parseFloat(mcoInput.value);
            if ([quiz, exam, mco].some(v => isNaN(v) || v < 0 || v > 100)) { alert("Please enter valid scores between 0 and 100."); return; }
            const finalGrade = (quiz * 0.20) + (exam * 0.30) + (mco * 0.50);
            const getEquivalent = (g) => { if (g >= 90) return "A"; if (g >= 80) return "B"; if (g >= 70) return "C"; if (g >= 60) return "D"; return "F"; };
            finalGradeP.textContent = "Final Grade : " + finalGrade.toFixed(2);
            gradeEquivP.textContent  = "Grade       : " + getEquivalent(finalGrade);
            resultBox.style.display  = "block";
        });
        resetBtn.addEventListener("click", () => {
            quizInput.value = ""; examInput.value = ""; mcoInput.value = "";
            resultBox.style.display = "none";
            finalGradeP.textContent = ""; gradeEquivP.textContent = "";
        });
    }
}
