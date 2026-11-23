def get_grade():
    print("\n=== STUDENT GRADE CALCULATOR ===")
    name = input("Student name: ").strip()
    if not name:
        print("Name is required.")
        return
    subjects = []
    while True:
        subject = input("Subject name (or DONE): ").strip()
        if subject.upper() == "DONE":
            break
        if not subject:
            continue
        try:
            score = float(input(f"Grade for {subject} (0-100): "))
            if not 0 <= score <= 100:
                raise ValueError
        except ValueError:
            print("Enter a number from 0 to 100.")
            continue
        subjects.append((subject, score))
    if not subjects:
        print("No grades entered.")
        return
    average = sum(score for _, score in subjects) / len(subjects)
    print("\n--- REPORT ---")
    print(f"Student: {name}")
    for subject, score in subjects:
        print(f"{subject:<22} {score:>6.2f}")
    print(f"Average: {average:.2f}")
    print("Status:", "PASSED" if average >= 75 else "FAILED")

if __name__ == "__main__":
    while True:
        get_grade()
        if input("\nCalculate another student? (y/n): ").lower() != "y":
            print("Goodbye!")
            break
