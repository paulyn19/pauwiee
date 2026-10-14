class Employee:
    def __init__(self, name, gross, emp_type):
        self.name     = name
        self.gross    = gross
        self.emp_type = emp_type.lower()

class Payroll:
    def __init__(self, employee):
        self.emp = employee
        self._compute()

    def _compute(self):
        g = self.emp.gross

        # SSS or GSIS
        if self.emp.emp_type == "private":
            msc      = round(min(max(g, 5000), 35000) / 500) * 500
            self.pension    = round(msc * 0.05, 2)
            self.label      = "SSS"
        else:
            self.pension    = round(g * 0.09, 2)
            self.label      = "GSIS"

        # PhilHealth
        sal            = min(max(g, 10000), 100000)
        self.philhealth = min(max(round(sal * 0.025, 2), 500), 5000)

        # Pag-IBIG
        self.pagibig   = min(round(min(g, 10000) * 0.02, 2), 200)

        # BIR
        self.total_ee  = round(self.pension + self.philhealth + self.pagibig, 2)
        taxable        = round(g - self.total_ee, 2)
        self.tax       = self._bir(taxable)

        self.total_ded = round(self.total_ee + self.tax, 2)
        self.net       = round(g - self.total_ded, 2)

    def _bir(self, t):
        brackets = [
            (666667, 200833.33, 0.35),
            (166667,  40833.33, 0.30),
            ( 66667,  10833.33, 0.25),
            ( 33333,   2500.00, 0.20),
            ( 20833,      0.00, 0.15),
        ]
        for lower, fixed, rate in brackets:
            if t > lower:
                return round(fixed + (t - lower) * rate, 2)
        return 0.0

    def display(self):
        e = self.emp
        S = "=" * 50
        D = "-" * 50
        def row(l, v): print(f"  {l:<30} P{v:>12,.2f}")

        print(f"\n{S}")
        print("  PAYROLL SYSTEM  |  Python OOP  |  2025")
        print(S)
        print(f"  Name      : {e.name}")
        print(f"  Type      : {e.emp_type.title()}")
        print(f"  Gross Pay : P{e.gross:>,.2f}")
        print(D)
        row(f"{self.label} Contribution", self.pension)
        row("PhilHealth",                 self.philhealth)
        row("Pag-IBIG",                   self.pagibig)
        row("Total Deductions (EE)",      self.total_ee)
        print(D)
        row("BIR Withholding Tax",        self.tax)
        print(D)
        row("Total Deductions",           self.total_ded)
        print(S)
        row("NET TAKE-HOME PAY",          self.net)
        print(f"{S}\n")

# ── Run ──────────────────────────────────────────
print("\n" + "=" * 50)
print("  PHILIPPINE PAYROLL SYSTEM  (Python OOP)")
print("=" * 50)

while True:
    name  = input("\n  Name: ")
    gross = float(input("  Gross Salary: P"))
    t     = input("  Type [1=Private / 2=Government]: ")
    etype = "private" if t in ("1", "private") else "government"

    Payroll(Employee(name, gross, etype)).display()

    if input("  Another? [y/n]: ").lower() != "y":
        break

print("\n  Goodbye!\n")

