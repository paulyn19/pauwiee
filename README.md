# Library Management System

A Python terminal application for managing books and recording borrow/return transactions using MySQL.

## Features
- Add and list books
- Borrow books while checking available copies
- Return books and update stock
- Uses parameterized SQL queries

## Requirements
Python 3.9+, MySQL Server, and MySQL Workbench (optional).

## Setup
1. Start MySQL Server.
2. Run `schema.sql` in MySQL Workbench.
3. Edit `CONFIG` in `main.py` with your MySQL username and password.
4. Install dependencies: `pip install -r requirements.txt`.
5. Run `python main.py`.

## Notes
- This project is an educational mini-project.
- Change demo credentials and configuration before using it with real data.
- Never commit passwords, API keys, or private credentials to GitHub.
