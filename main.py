import mysql.connector
from mysql.connector import Error
CONFIG={"host":"localhost","user":"root","password":"","database":"inventory_db"}

def main():
    try: db=mysql.connector.connect(**CONFIG)
    except Error as e: print("Could not connect:",e); return
    try:
        while True:
            print("\nINVENTORY SYSTEM\n1 Add product\n2 View products\n3 Update stock\n4 Delete product\n5 Exit")
            choice=input("Choose: ")
            with db.cursor() as c:
                if choice=="1":
                    name=input("Name: ").strip(); category=input("Category: ").strip()
                    try: price=float(input("Price: ")); stock=int(input("Initial stock: "))
                    except ValueError: print("Invalid number."); continue
                    if not name or price<0 or stock<0: print("Check product details."); continue
                    c.execute("INSERT INTO products(name,category,price,stock) VALUES(%s,%s,%s,%s)",(name,category,price,stock)); db.commit(); print("Product saved.")
                elif choice=="2":
                    c.execute("SELECT id,name,category,price,stock FROM products ORDER BY name")
                    for r in c.fetchall(): print(f"#{r[0]} {r[1]} | {r[2]} | ₱{r[3]} | stock: {r[4]}")
                elif choice=="3":
                    try: pid=int(input("Product ID: ")); delta=int(input("Stock change (+/-): "))
                    except ValueError: print("Enter valid numbers."); continue
                    c.execute("UPDATE products SET stock=stock+%s WHERE id=%s AND stock+%s>=0",(delta,pid,delta))
                    if c.rowcount: db.commit(); print("Stock updated.")
                    else: db.rollback(); print("Product not found or stock cannot become negative.")
                elif choice=="4":
                    try: pid=int(input("Product ID: "))
                    except ValueError: print("Invalid ID."); continue
                    c.execute("DELETE FROM products WHERE id=%s",(pid,)); db.commit(); print("Deleted." if c.rowcount else "Not found.")
                elif choice=="5": break
                else: print("Choose 1-5.")
    finally: db.close()
if __name__=="__main__": main()
