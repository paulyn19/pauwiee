const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

// ── PROCEDURAL FUNCTIONS ──────────────────────

function getRemarks(g) {
  if (g >= 90) return "EXCELLENT";
  if (g >= 85) return "VERY GOOD";
  if (g >= 80) return "GOOD";
  if (g >= 75) return "PASSED";
  return "FAILED";
}

function computeAverage(subjects) {
  var total = 0;
  for (var i = 0; i < subjects.length; i++) {
    total += subjects[i].grade;
  }
  return total / subjects.length;
}

function displayResult(name, subjects, avg) {
  var passed = avg >= 75;
  var S = "============================================";
  var D = "--------------------------------------------";

  console.log("\n" + S);
  console.log("  STUDENT : " + name.toUpperCase());
  console.log(D);
  console.log("  " + "SUBJECT".padEnd(22) + "GRADE".padEnd(10) + "REMARKS");
  console.log(D);
  for (var i = 0; i < subjects.length; i++) {
    var s = subjects[i];
    console.log(
      "  " +
      s.name.toUpperCase().padEnd(22) +
      s.grade.toFixed(2).padEnd(10) +
      getRemarks(s.grade)
    );
  }
  console.log(D);
  console.log("  " + "FINAL AVERAGE".padEnd(22) + avg.toFixed(2));
  console.log(S);
  console.log("  RESULT  : " + (passed ? "PASSED" : "FAILED"));
  console.log(S + "\n");
}

async function getSubjects() {
  var subjects = [];
  var count = parseInt(await ask("  HOW MANY SUBJECTS? "));
  if (isNaN(count) || count <= 0) {
    console.log("  INVALID NUMBER OF SUBJECTS.");
    return [];
  }
  for (var i = 0; i < count; i++) {
    var name  = await ask("  SUBJECT " + (i + 1) + " NAME: ");
    var grade = parseFloat(await ask("  GRADE FOR " + name.toUpperCase() + " (0-100): "));
    if (isNaN(grade) || grade < 0 || grade > 100) {
      console.log("  INVALID GRADE. MUST BE 0-100.");
      return [];
    }
    subjects.push({ name: name.trim(), grade: grade });
  }
  return subjects;
}

async function calculate() {
  var name = await ask("\n  STUDENT NAME: ");
  if (!name || name.trim() === "") {
    console.log("  PLEASE ENTER A STUDENT NAME.");
    return;
  }
  var subjects = await getSubjects();
  if (subjects.length === 0) return;

  var avg = computeAverage(subjects);
  displayResult(name.trim(), subjects, avg);
}

async function main() {
  console.log("\n============================================");
  console.log("          GRADE CALCULATOR");
  console.log("  STUDENT GRADE MANAGEMENT SYSTEM");
  console.log("============================================");

  var again = true;
  while (again) {
    await calculate();
    var ans = await ask("  CALCULATE ANOTHER STUDENT? (Y/N): ");
    again = ans.trim().toLowerCase() === "y";
  }

  console.log("\n  GOODBYE!\n");
  rl.close();
}

main();




