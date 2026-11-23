import mysql.connector
from mysql.connector import Error

CONFIG = {"host":"localhost", "user":"root", "password":"", "database":"library_db"}

def connect():
    return mysql.connector.connect(**CONFIG)

def add_book(db):
    title=input("Book title: ").strip(); author=input("Author: ").strip()
    if not title or not author: print("Both fields are required."); return
    copies=int(input("Number of copies: "))
    with db.cursor() as c:
        c.execute("INSERT INTO books(title,author,copies) VALUES(%s,%s,%s)",(title,author,copies))
    db.commit(); print("Book added.")

def list_books(db):
    with db.cursor() as c:
        c.execute("SELECT id,title,author,copies FROM books ORDER BY title")
        rows=c.fetchall()
    print("\nID | TITLE | AUTHOR | AVAILABLE")
    for r in rows: print(f"{r[0]} | {r[1]} | {r[2]} | {r[3]}")

def borrow(db):
    list_books(db)
    try: book_id=int(input("Book ID: ")); borrower=input("Borrower name: ").strip()
    except ValueError: print("Invalid ID."); return
    with db.cursor() as c:
        c.execute("SELECT copies FROM books WHERE id=%s",(book_id,)); row=c.fetchone()
        if not row or row[0]<1: print("Book unavailable."); return
        c.execute("UPDATE books SET copies=copies-1 WHERE id=%s",(book_id,))
        c.execute("INSERT INTO loans(book_id,borrower) VALUES(%s,%s)",(book_id,borrower))
    db.commit(); print("Loan recorded.")

def return_book(db):
    try: loan_id=int(input("Loan ID to return: "))
    except ValueError: print("Invalid ID."); return
    with db.cursor() as c:
        c.execute("SELECT book_id FROM loans WHERE id=%s AND returned_at IS NULL",(loan_id,)); row=c.fetchone()
        if not row: print("Active loan not found."); return
        c.execute("UPDATE loans SET returned_at=NOW() WHERE id=%s",(loan_id,))
        c.execute("UPDATE books SET copies=copies+1 WHERE id=%s",(row[0],))
    db.commit(); print("Book returned.")

def main():
    try: db=connect()
    except Error as e: print("Database connection failed:",e); return
    try:
        while True:
            print("\nLIBRARY MANAGER\n1 Add book\n2 List books\n3 Borrow book\n4 Return book\n5 Exit")
            choice=input("Choose: ")
            if choice=="1": add_book(db)
            elif choice=="2": list_books(db)
            elif choice=="3": borrow(db)
            elif choice=="4": return_book(db)
            elif choice=="5": break
            else: print("Choose 1-5.")
    finally: db.close()
if __name__=="__main__": main()
