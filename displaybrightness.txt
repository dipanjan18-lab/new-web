import screen_brightness_control as sbc
import pyttsx3
import speech_recognition as sr
import mainvoice
from mainvoice import getProperty
from mainvoice import setProperty
from mainvoice import speak
from mainvoice import takecommand 
import speech_recognition as sr
import pyttsx3 

def brightness():
    speak("sir please tell me the brightness level")
    while True:
        val = takecommand().lower()
        val = val.replace("set","")
        val = val.replace("display","")
        val = val.replace("change","")
        val = val.replace("brightness","")
        val = val.replace("at","")
        val = val.replace("%","")
        val = val.replace("parcent","")
        val = val.replace("hundred","100")  
        # check_user_input(val)
        if val.strip().isdigit():
            sbc.set_brightness(val, display=0)
            speak(f"Sir the display brightness level set at {val} % successfully")
            print(sbc.get_brightness()) 
            break
        elif '' in val:
            speak("Sir i couldn't understand, please tell me again")
        else:
            speak("Sir i couldn't understand, please tell me again")
      