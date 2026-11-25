import mysql.connector
from mysql.connector import Error
from datetime import date
CONFIG={"host":"localhost","user":"root","password":"","database":"dormitory_db"}

def main():
    try: db=mysql.connector.connect(**CONFIG)
    except Error as e: print("Database connection failed:",e); return
    try:
        while True:
            print("\nDORMITORY MANAGER\n1 Add room\n2 List rooms\n3 Register tenant\n4 List tenants\n5 Record payment\n6 Payment history\n7 Exit")
            choice=input("Choose: ")
            with db.cursor() as c:
                if choice=="1":
                    room=input("Room number: ").strip()
                    try: cap=int(input("Capacity: ")); rate=float(input("Monthly rate: "))
                    except ValueError: print("Invalid number."); continue
                    if not room or cap<1 or rate<0: print("Check room details."); continue
                    try: c.execute("INSERT INTO rooms(room_number,capacity,monthly_rate) VALUES(%s,%s,%s)",(room,cap,rate)); db.commit(); print("Room added.")
                    except Error as e: db.rollback(); print("Could not add room:",e)
                elif choice=="2":
                    c.execute("SELECT r.id,r.room_number,r.capacity,r.monthly_rate,COUNT(t.id) FROM rooms r LEFT JOIN tenants t ON t.room_id=r.id GROUP BY r.id ORDER BY r.room_number")
                    for r in c.fetchall(): print(f"ID {r[0]} | {r[1]} | occupants {r[4]}/{r[2]} | ₱{r[3]}/month")
                elif choice=="3":
                    name=input("Tenant name: ").strip(); contact=input("Contact: ").strip()
                    try: room_id=int(input("Room ID: "))
                    except ValueError: print("Invalid room ID."); continue
                    c.execute("SELECT capacity,(SELECT COUNT(*) FROM tenants WHERE room_id=rooms.id) FROM rooms WHERE id=%s",(room_id,)); room=c.fetchone()
                    if not name or not room or room[1]>=room[0]: print("Name invalid, room missing, or room full."); continue
                    c.execute("INSERT INTO tenants(full_name,contact,room_id,move_in) VALUES(%s,%s,%s,%s)",(name,contact,room_id,date.today())); db.commit(); print("Tenant registered.")
                elif choice=="4":
                    c.execute("SELECT t.id,t.full_name,t.contact,r.room_number,t.move_in FROM tenants t LEFT JOIN rooms r ON r.id=t.room_id ORDER BY t.full_name")
                    for r in c.fetchall(): print(f"{r[0]} | {r[1]} | {r[2]} | Room {r[3] or 'Unassigned'} | {r[4]}")
                elif choice=="5":
                    try: tid=int(input("Tenant ID: ")); amount=float(input("Amount paid: "))
                    except ValueError: print("Invalid amount or ID."); continue
                    if amount<=0: print("Amount must be positive."); continue
                    note=input("Payment note: ")
                    c.execute("INSERT INTO payments(tenant_id,amount,paid_on,note) VALUES(%s,%s,%s,%s)",(tid,amount,date.today(),note))
                    try: db.commit(); print("Payment recorded.")
                    except Error as e: db.rollback(); print("Could not record payment:",e)
                elif choice=="6":
                    c.execute("SELECT p.id,t.full_name,p.amount,p.paid_on,p.note FROM payments p JOIN tenants t ON t.id=p.tenant_id ORDER BY p.paid_on DESC")
                    for r in c.fetchall(): print(f"{r[0]} | {r[1]} | ₱{r[2]} | {r[3]} | {r[4]}")
                elif choice=="7": break
                else: print("Choose 1-7.")
    finally: db.close()
if __name__=="__main__": main()
