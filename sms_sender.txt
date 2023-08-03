import mainvoice
from mainvoice import speak
from mainvoice import takecommand 
import datetime
import pywhatkit
from my_contacts import find_number

a = "2"  
hour = int(datetime.datetime.now().hour)
minute = int(datetime.datetime.now().minute) 
def name_check(query):
    query = query.replace("send a sms ","")
    query = query.replace("send sms ","")
    query = query.replace("send a whatsapp sms ","")
    query = query.replace("send the sms ","")
    query = query.replace("to ","")
    print(query)
    query = query.lower()
    number = find_number(query)
    print(number)
    if number is not None:
        speak("what should i say ?")
        qs = takecommand()  
        speak("It will take some time, please wait")
        minute1 = int(minute) + int(a) 
        pywhatkit.sendwhatmsg(f"{number}", f"{qs}",int(hour),int(minute1))
        speak(f"Sir the sms send to {query} succesfully.")

    else: 
        speak("Please ensure the name is correct then I can create new contact with this name.")
        option = takecommand().lower()
        
        if "yes" in option or "may be correct" in option or "correct" in option:
            from my_contacts import new_contact_with_name
            speak("Pleae enter the data in dialog box manully.")
            new_contact_with_name(query)

        elif "no" in option or "may be not correct" in option or "not correct" in option or "this is not correct" in option:
            speak("okay sir")
