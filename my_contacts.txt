from datetime import datetime
import tkinter as tk
from mainvoice import speak
from mainvoice import takecommand 
import speech_recognition as sr  # pip install sr & pip install SpeechRecognition
import pyttsx3  # pip install pyttsx3
import gdriveaudio
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="names"
)
mycursor = mydb.cursor()
time = datetime.now()

def new_contact():
    def save_contact():
        name = name_entry.get().lower()
        country_code = country_code_entry.get()
        number = number_entry.get()
        final_number = country_code + number

        insert_query = "INSERT INTO my_contact (contact_name, contact_no, contact_created_at, last_update) VALUES (%s, %s, %s, %s)"
        contact_data = [name, final_number, time, time]

        mycursor.execute(insert_query, contact_data)

        window.destroy()  # Close the GUI window after saving the contact
        speak(f"Thanks, This contact has been successfully saved to our database as {name}")

        mydb.commit()
        mycursor.close()
        mydb.close()

    # Create GUI window
    window = tk.Tk()
    window.title("New Contact")
    window.geometry("300x200")

    # Create labels and entry fields
    name_label = tk.Label(window, text="Contact Name:")
    name_label.pack()
    name_entry = tk.Entry(window)
    name_entry.pack()

    country_code_label = tk.Label(window, text="Country Code(with +):")
    country_code_label.pack()
    country_code_entry = tk.Entry(window)
    country_code_entry.pack()

    number_label = tk.Label(window, text="Phone Number:")
    number_label.pack()
    number_entry = tk.Entry(window)
    number_entry.pack()

    save_button = tk.Button(window, text="Save Contact", command=save_contact)
    save_button.pack()

    # Start GUI event loop
    window.mainloop()

def new_contact_with_name(query):
    def save_contact():
        name = name_entry.get().lower()
        country_code = country_code_entry.get()
        number = number_entry.get()
        final_number = country_code + number

        insert_query = "INSERT INTO my_contact (contact_name, contact_no, contact_created_at, last_update) VALUES (%s, %s, %s, %s)"
        contact_data = [name, final_number, time, time]

        mycursor.execute(insert_query, contact_data)

        window.destroy()  # Close the GUI window after saving the contact
        speak(f"Thanks, This contact has been successfully saved to our database as {name}")

        mydb.commit()
        mycursor.close()
        mydb.close()

    # Create GUI window
    window = tk.Tk()
    window.title("New Contact")
    window.geometry("300x200")

    # Create labels and entry fields
    name_label = tk.Label(window, text="Contact Name:")
    name_label.pack()
    name_entry = tk.Entry(window)
    name_entry.pack()

    country_code_label = tk.Label(window, text="Country Code(with +):")
    country_code_label.pack()
    country_code_entry = tk.Entry(window)
    name_entry.insert(tk.END, query)  # Preset the name as "Ram"
    country_code_entry.pack()

    number_label = tk.Label(window, text="Phone Number:")
    number_label.pack()
    number_entry = tk.Entry(window)
    number_entry.pack()

    save_button = tk.Button(window, text="Save Contact", command=save_contact)
    save_button.pack()

    # Start GUI event loop
    window.mainloop()

def delete_contact():
    speak("please enter the contact name.")
    name = input("Enter contact name : ")
    name = name.lower()
    rows = mycursor.fetchall()

    if len(rows) == 0:
        print("No data found for contact name ", name)
        speak(f"Sir no data found for contact name {name} in our database")
    else:
        delete_query = "DELETE FROM my_contact WHERE contact_name = %s"
        contact_data = [name]
        mycursor.execute(delete_query,contact_data)
        speak(f"{name} successfully removed from our database")

    mydb.commit()
    mycursor.close()
    mydb.close()

def change_name():
    speak("Please enter the old contact name")
    old_name = input("Enter old contact name : ")
    old_name = old_name.lower()

    query = "SELECT * FROM my_contact WHERE contact_name = %s"
    data = [old_name]
    mycursor.execute(query, data)
    rows = mycursor.fetchall()

    if len(rows) == 0:
        print("No data found for contact name ", old_name)
        speak(f"Sir no data found for contact name {old_name} in our database")
    else:
        speak("Enter the new contact name")
        new_name = input("Enter old contact name : ")
        new_name = new_name.lower()

        delete_query = "UPDATE my_contact SET contact_name = %s, last_update = %s WHERE contact_name = %s"
        
        contact_data = [new_name, time, old_name]
        mycursor.execute(delete_query,contact_data)

        speak(f"The contact {old_name} successfully replaced as {new_name}")

    mydb.commit()
    mycursor.close()
    mydb.close()

def detail_contact():
    speak("Please enter the contact name.")
    name = input("Enter contact name : ")
    name = name.lower()

    search_query = "SELECT contact_created_at, last_update FROM my_contact WHERE contact_name = %s"
    
    contact_data = [name]
    mycursor.execute(search_query,contact_data)
    rows = mycursor.fetchall()

    if len(rows) == 0:
        print("No data found for contact name ", name)
        speak(f"Sir no data found for contact name {name} in our database")
    else:
        for row in rows:
            creat = row[0]
            update = row[1]

            print("contact create ", creat)
            print("last update ", update )
            speak(f"Sir you create this cotact at {creat} and this contact was last updated on {update}")

def find_number(name):
    search_query = "SELECT contact_no FROM my_contact WHERE contact_name = %s"
    
    contact_data = [name]
    mycursor.execute(search_query,contact_data)
    rows = mycursor.fetchall()

    if len(rows) == 0:
        print("No data found for contact name ", name)
        speak(f"I apologize, but the requested contact {name} could not be found in the database.")
    else:
        for row in rows:
            number = row[0]
            # print(number)
            return number