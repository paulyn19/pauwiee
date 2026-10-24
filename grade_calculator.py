import tkinter as tk
from tkinter import messagebox

BG    = "#000000"
CARD  = "#111111"
WHITE = "#ffffff"
GRAY  = "#888888"
GREEN = "#22c55e"
RED   = "#ef4444"

# ── OOP LAYER ─────────────────────────────────
class Student:
    def __init__(self, name, subjects):
        self.name     = name
        self.subjects = subjects

class GradeCalculator:
    def __init__(self, student):
        self.student = student
        self._compute()

    def _compute(self):
        grades       = [g for _, g in self.student.subjects]
        self.average = round(sum(grades) / len(grades), 2)
        self.passed  = self.average >= 75
        self.remarks = [self._get_remarks(g) for g in grades]

    def _get_remarks(self, g):
        if g >= 90: return "EXCELLENT"
        if g >= 85: return "VERY GOOD"
        if g >= 80: return "GOOD"
        if g >= 75: return "PASSED"
        return "FAILED"

# ── GUI LAYER ─────────────────────────────────
class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Grade Calculator")
        self.geometry("520x720")
        self.resizable(False, False)
        self.configure(bg=BG)
        self.rows = []
        self._build()

    def _build(self):
        # Header
        tk.Label(self, text="GRADE CALCULATOR",
                 font=("Courier", 20, "bold"),
                 bg=BG, fg=WHITE).pack(pady=(24, 2))
        tk.Label(self, text="STUDENT GRADE MANAGEMENT SYSTEM",
                 font=("Courier", 9, "bold"),
                 bg=BG, fg=GRAY).pack()
        tk.Frame(self, bg="#333", height=1).pack(fill="x", padx=24, pady=(14, 0))

        # Student Name
        frm = tk.Frame(self, bg=BG)
        frm.pack(fill="x", padx=24, pady=14)
        tk.Label(frm, text="STUDENT NAME",
                 font=("Courier", 9, "bold"),
                 bg=BG, fg=GRAY, anchor="w").pack(fill="x")
        self.ent_name = tk.Entry(frm, font=("Courier", 13, "bold"),
                                 relief="flat", bg=CARD, fg=WHITE,
                                 insertbackground=WHITE)
        self.ent_name.pack(fill="x", ipady=7, pady=(4, 0))

        # Column headers
        tk.Frame(self, bg="#333", height=1).pack(fill="x", padx=24, pady=(14, 0))
        col = tk.Frame(self, bg=BG)
        col.pack(fill="x", padx=24, pady=(8, 2))
        tk.Label(col, text="SUBJECT",
                 font=("Courier", 9, "bold"),
                 bg=BG, fg=GRAY).pack(side="left", expand=True, anchor="w")
        tk.Label(col, text="GRADE (0-100)",
                 font=("Courier", 9, "bold"),
                 bg=BG, fg=GRAY).pack(side="right", anchor="e")

        self.subj_frame = tk.Frame(self, bg=BG)
        self.subj_frame.pack(fill="x", padx=24)

        for _ in range(3):
            self._add_row()

        # Buttons
        tk.Frame(self, bg="#333", height=1).pack(fill="x", padx=24, pady=(14, 0))
        btn_outer = tk.Frame(self, bg=BG)
        btn_outer.pack(fill="x", padx=24, pady=12)

        btn_top = tk.Frame(btn_outer, bg=BG)
        btn_top.pack(fill="x", pady=(0, 6))

        tk.Button(btn_top, text="+ ADD SUBJECT",
                  font=("Courier", 10, "bold"),
                  bg="#222", fg=WHITE, relief="flat",
                  pady=8, cursor="hand2",
                  command=self._add_row).pack(side="left", expand=True,
                                              fill="x", padx=(0, 4))
        tk.Button(btn_top, text="CLEAR",
                  font=("Courier", 10, "bold"),
                  bg="#222", fg=RED, relief="flat",
                  pady=8, cursor="hand2",
                  command=self._reset).pack(side="left", expand=True,
                                            fill="x", padx=(4, 0))
        tk.Button(btn_outer, text="CALCULATE",
                  font=("Courier", 13, "bold"),
                  bg=WHITE, fg=BG, relief="flat",
                  pady=11, cursor="hand2",
                  command=self._calculate).pack(fill="x")

        # Result
        self.res_frame = tk.Frame(self, bg=BG)
        tk.Frame(self.res_frame, bg="#333", height=1).pack(fill="x",
                                                            padx=24,
                                                            pady=(10, 8))
        res_inner = tk.Frame(self.res_frame, bg=BG)
        res_inner.pack(fill="x", padx=24)

        self.result_text = tk.Text(res_inner,
                                   font=("Courier", 11, "bold"),
                                   height=12, relief="flat",
                                   bg=CARD, fg=WHITE,
                                   insertbackground=WHITE,
                                   state="disabled")
        self.result_text.pack(fill="x")

        tk.Button(res_inner, text="CALCULATE ANOTHER",
                  font=("Courier", 10, "bold"),
                  bg=WHITE, fg=BG, relief="flat",
                  pady=8, cursor="hand2",
                  command=self._clear_result).pack(fill="x", pady=(10, 0))

    def _add_row(self, subject=""):
        row = tk.Frame(self.subj_frame, bg=BG)
        row.pack(fill="x", pady=3)
        name_e  = tk.Entry(row, font=("Courier", 12, "bold"),
                   relief="flat", bg=WHITE, fg=BG,
                   insertbackground=BG)
        grade_e = tk.Entry(row, font=("Courier", 12, "bold"),
                   relief="flat", bg=WHITE, fg=BG,
                   insertbackground=BG, width=10)

        name_e.pack(side="left", fill="x", expand=True, ipady=5)
        grade_e.pack(side="right", padx=(8, 0), ipady=5)
        if subject:
            name_e.insert(0, subject)
        self.rows.append((name_e, grade_e))

    def _calculate(self):
        name = self.ent_name.get().strip().upper()
        if not name:
            messagebox.showwarning("ERROR", "PLEASE ENTER THE STUDENT NAME.")
            return

        subjects = []
        for name_e, grade_e in self.rows:
            sname  = name_e.get().strip().upper()
            sgrade = grade_e.get().strip()
            if sname and sgrade:
                try:
                    g = float(sgrade)
                    if g < 0 or g > 100:
                        messagebox.showwarning("ERROR", "GRADES MUST BE BETWEEN 0 AND 100.")
                        return
                    subjects.append((sname, g))
                except ValueError:
                    messagebox.showwarning("ERROR", f"INVALID GRADE FOR '{sname}'.")
                    return

        if not subjects:
            messagebox.showwarning("ERROR", "PLEASE ENTER AT LEAST ONE SUBJECT AND GRADE.")
            return

        calc = GradeCalculator(Student(name, subjects))

        S = "============================================"
        D = "--------------------------------------------"
        lines  =        S + "\n"
        lines += "  STUDENT : " + name + "\n"
        lines +=        D + "\n"
        lines += "  " + "SUBJECT".ljust(22) + "GRADE".ljust(10) + "REMARKS\n"
        lines +=        D + "\n"
        for i, (sname, g) in enumerate(subjects):
            lines += "  " + sname.ljust(22) + f"{g:.2f}".ljust(10) + calc.remarks[i] + "\n"
        lines +=        D + "\n"
        lines += "  " + "FINAL AVERAGE".ljust(22) + f"{calc.average:.2f}\n"
        lines +=        S + "\n"
        lines += "  RESULT  : " + ("PASSED" if calc.passed else "FAILED") + "\n"
        lines +=        S

        self.result_text.config(state="normal",
                                fg=GREEN if calc.passed else RED)
        self.result_text.delete("1.0", "end")
        self.result_text.insert("end", lines)
        self.result_text.config(state="disabled")
        self.res_frame.pack(fill="x")

    def _clear_result(self):
        self.ent_name.delete(0, "end")
        for name_e, grade_e in self.rows:
            name_e.delete(0, "end")
            grade_e.delete(0, "end")
        self.res_frame.pack_forget()
        self.ent_name.focus()

    def _reset(self):
        self.ent_name.delete(0, "end")
        for name_e, grade_e in self.rows:
            name_e.delete(0, "end")
            grade_e.delete(0, "end")
        self.res_frame.pack_forget()
        self.result_text.config(state="normal")
        self.result_text.delete("1.0", "end")
        self.result_text.config(state="disabled")
        self.ent_name.focus()

if __name__ == "__main__":
    App().mainloop()







