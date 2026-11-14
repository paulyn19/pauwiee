import tkinter as tk
from tkinter import ttk


def next_state(state, char):
    fixed = {
        'q0': ('D', 'q1'),
        'q1': ('O', 'q2'),
        'q2': ('R', 'q3'),
        'q3': ('M', 'q4'),
        'q4': ('-', 'q5'),
        'q7': ('-', 'q8'),
    }
    if state in fixed:
        expected, destination = fixed[state]
        return destination if char == expected else 'qERR'
    if state == 'q5':
        return 'q6' if char in 'ABCD' else 'qERR'
    if state == 'q6':
        return 'q7' if char in '12345' else 'qERR'
    if state == 'q8':
        return {'0': 'q9', '1': 'q10', '2': 'q11'}.get(char, 'qERR')
    if state == 'q9':
        return 'q12' if char in '123456789' else 'qERR'
    if state == 'q10':
        return 'q12' if char in '0123456789' else 'qERR'
    if state == 'q11':
        return 'q12' if char == '0' else 'qERR'
    return 'qERR'


def check_code():
    code = code_entry.get()  # Do not change case or trim: DFA checks exact input.
    state = 'q0'
    path = [state]
    for char in code:
        state = next_state(state, char)
        path.append(state)
        if state == 'qERR':
            break

    path_value.config(text=' → '.join(path))
    if state == 'q12':
        result_value.config(text='VALID — ACCEPTED', foreground='#13764a')
        tokens = (
            f'PREFIX : {code[:4]}\n'
            f'HYPHEN : {code[4]}\n'
            f'BLOCK  : {code[5]}\n'
            f'FLOOR  : {code[6]}\n'
            f'HYPHEN : {code[7]}\n'
            f'BED    : {code[8:10]}'
        )
        token_value.config(text=tokens)
    else:
        result_value.config(text='INVALID — REJECTED', foreground='#b3261e')
        token_value.config(text='No tokens: the code is invalid.')


def clear_all():
    code_entry.delete(0, tk.END)
    result_value.config(text='Enter a code to begin.', foreground='#445566')
    path_value.config(text='—')
    token_value.config(text='—')
    code_entry.focus_set()


root = tk.Tk()
root.title('DormLex — DFA Bed Code Validator')
root.geometry('690x610')
root.minsize(560, 540)
root.configure(bg='#edf5f0')

style = ttk.Style()
style.theme_use('clam')
style.configure('TButton', font=('Arial', 12), padding=9)

main = tk.Frame(root, bg='white', padx=28, pady=22)
main.pack(fill='both', expand=True, padx=24, pady=22)

tk.Label(main, text='DormLex', font=('Arial', 26, 'bold'),
         fg='#126443', bg='white').pack(anchor='w')
tk.Label(main, text='DFA-Based Dormitory Bed Code Validator',
         font=('Arial', 12), fg='#445566', bg='white').pack(anchor='w', pady=(0, 18))

tk.Label(main, text='Enter dormitory bed code:', font=('Arial', 12, 'bold'),
         bg='white').pack(anchor='w')
code_entry = ttk.Entry(main, font=('Consolas', 17))
code_entry.pack(fill='x', pady=(7, 5))
tk.Label(main, text='Format: DORM-B3-12  |  Blocks A–D, Floors 1–5, Beds 01–20',
         font=('Arial', 10), fg='#56636c', bg='white').pack(anchor='w')

buttons = tk.Frame(main, bg='white')
buttons.pack(anchor='w', pady=15)
ttk.Button(buttons, text='Check Code', command=check_code).pack(side='left', padx=(0, 12))
ttk.Button(buttons, text='Clear', command=clear_all).pack(side='left')

tk.Label(main, text='Validation Result', font=('Arial', 12, 'bold'),
         bg='white').pack(anchor='w')
result_value = tk.Label(main, text='Enter a code to begin.',
                        font=('Arial', 16, 'bold'), fg='#445566', bg='white')
result_value.pack(anchor='w', pady=(4, 15))

tk.Label(main, text='DFA State Path', font=('Arial', 12, 'bold'),
         bg='white').pack(anchor='w')
path_value = tk.Label(main, text='—', font=('Consolas', 11),
                      wraplength=580, justify='left', bg='white', fg='#263849')
path_value.pack(anchor='w', pady=(6, 15))

tk.Label(main, text='Tokens (valid codes only)', font=('Arial', 12, 'bold'),
         bg='white').pack(anchor='w')
token_value = tk.Label(main, text='—', font=('Consolas', 12),
                       justify='left', anchor='nw', bg='white', fg='#263849')
token_value.pack(anchor='w', pady=(7, 0))

root.bind('<Return>', lambda event: check_code())
code_entry.focus_set()
root.mainloop()
