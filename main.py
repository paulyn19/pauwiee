import mysql.connector
from mysql.connector import Error
from datetime import date
CONFIG={"host":"localhost","user":"root","password":"","database":"attendance_db"}

def main():
    try: db=mysql.connector.connect(**CONFIG)
    except Error as e: print("Database connection failed:",e); return
    try:
        while True:
            print("\nATTENDANCE MANAGER\n1 Register student\n2 List students\n3 Record attendance today\n4 View today's attendance\n5 Exit")
            choice=input("Choose: ")
            with db.cursor() as c:
                if choice=="1":
                    no=input("Student number: ").strip(); name=input("Full name: ").strip()
                    if not no or not name: print("Both fields are required."); continue
                    try: c.execute("INSERT INTO students(student_no,full_name) VALUES(%s,%s)",(no,name)); db.commit(); print("Student registered.")
                    except Error as e: db.rollback(); print("Could not register:",e)
                elif choice=="2":
                    c.execute("SELECT id,student_no,full_name FROM students ORDER BY full_name")
                    for r in c.fetchall(): print(f"{r[0]} | {r[1]} | {r[2]}")
                elif choice=="3":
                    try: sid=int(input("Student ID: "))
                    except ValueError: print("Invalid ID."); continue
                    status=input("Status (Present/Absent/Late): ").strip().title()
                    if status not in ("Present","Absent","Late"): print("Invalid status."); continue
                    try: c.execute("INSERT INTO attendance(student_id,attendance_date,status) VALUES(%s,%s,%s)",(sid,date.today(),status)); db.commit(); print("Attendance saved.")
                    except Error as e: db.rollback(); print("Could not save (student may not exist or already have today's record):",e)
                elif choice=="4":
                    c.execute("SELECT s.student_no,s.full_name,a.status FROM attendance a JOIN students s ON a.student_id=s.id WHERE a.attendance_date=%s ORDER BY s.full_name",(date.today(),))
                    for r in c.fetchall(): print(f"{r[0]} | {r[1]} | {r[2]}")
                elif choice=="5": break
                else: print("Choose 1-5.")
    finally: db.close()
if __name__=="__main__": main()
