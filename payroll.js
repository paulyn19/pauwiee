"use strict";
const readline = require("readline");
const rl  = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res => rl.question(q, res));

// ── Calculations ──────────────────────────────────
function compute(name, gross, type) {
  const isPrivate = type === "private";

  const pension = isPrivate
    ? (() => { const msc = Math.round(Math.min(Math.max(gross,5000),35000)/500)*500; return msc*0.05; })()
    : gross * 0.09;

  const sal        = Math.min(Math.max(gross, 10000), 100000);
  const philhealth = Math.min(Math.max(sal * 0.025, 500), 5000);
  const pagibig    = Math.min(Math.min(gross, 10000) * 0.02, 200);
  const totalEE    = +((pension + philhealth + pagibig).toFixed(2));

  const taxable = gross - totalEE;
  const tax = calcBIR(taxable);
  const totalDed = +((totalEE + tax).toFixed(2));
  const net      = +((gross  - totalDed).toFixed(2));

  return { name, gross, type, pension, philhealth, pagibig,
           label: isPrivate ? "SSS" : "GSIS",
           totalEE, tax, totalDed, net };
}

function calcBIR(t) {
  if (t > 666667) return +((200833.33 + (t - 666667) * 0.35).toFixed(2));
  if (t > 166667) return +((40833.33  + (t - 166667) * 0.30).toFixed(2));
  if (t >  66667) return +((10833.33  + (t -  66667) * 0.25).toFixed(2));
  if (t >  33333) return +((2500      + (t -  33333) * 0.20).toFixed(2));
  if (t >  20833) return +(((t - 20833) * 0.15).toFixed(2));
  return 0;
}

// ── Display ───────────────────────────────────────
function show(p) {
  const f   = v => "P" + v.toLocaleString("en-PH", { minimumFractionDigits: 2 });
  const row = (l, v) => console.log(`  ${l.padEnd(30)} ${f(v).padStart(16)}`);
  const S   = "=".repeat(50);
  const D   = "-".repeat(50);

  console.log(`\n${S}`);
  console.log("  PAYROLL SYSTEM  |  JS Procedural  |  2025");
  console.log(S);
  console.log(`  Name      : ${p.name}`);
  console.log(`  Type      : ${p.type === "private" ? "Private" : "Government"}`);
  console.log(`  Gross Pay : ${f(p.gross)}`);
  console.log(D);
  row(`${p.label} Contribution`, p.pension);
  row("PhilHealth",              p.philhealth);
  row("Pag-IBIG",                p.pagibig);
  row("Total Deductions (EE)",   p.totalEE);
  console.log(D);
  row("BIR Withholding Tax",     p.tax);
  console.log(D);
  row("Total Deductions",        p.totalDed);
  console.log(S);
  row("NET TAKE-HOME PAY",       p.net);
  console.log(`${S}\n`);
}

// ── Run ───────────────────────────────────────────
async function main() {
  console.log("\n" + "=".repeat(50));
  console.log("  PHILIPPINE PAYROLL SYSTEM  (JS Procedural)");
  console.log("=".repeat(50));

  let again = true;
  while (again) {
    const name  = await ask("\n  Name: ");
    const gross = parseFloat((await ask("  Gross Salary: P")).replace(/,/g, ""));
    const t     = (await ask("  Type [1=Private / 2=Government]: ")).trim();
    const type  = ["1","private"].includes(t.toLowerCase()) ? "private" : "government";

    show(compute(name, gross, type));

    const ans = await ask("  Another? [y/n]: ");
    again = ans.trim().toLowerCase() === "y";
  }

  console.log("\n  Goodbye!\n");
  rl.close();
}

main();
