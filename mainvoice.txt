import speech_recognition as sr
import pyttsx3
import datetime
import time

a = "2"
th = int(time.strftime("%I"))
tm = int(time.strftime("%M"))
tap = time.strftime("%p")
now = datetime.datetime.now()
y = int(now.strftime("%y"))
m = int(now.strftime("%m"))
d = int(now.strftime("%d"))

def getProperty(self, name):
    return self.proxy.getProperty(name)

def setProperty(self, name, value):
    self.proxy.setProperty(name, value)
  
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[2].id)
engine.setProperty('rate', 175)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def takecommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:     
        print("Listening...")
        r.pause_threshold = 0.8
        # r.energy_threshold = 200
        audio = r.listen(source)
   
    try:
        print("Recognizing...")   
        query = r.recognize_google(audio, language ='en-in')
        print(f"User said: {query}\n")
  
    except Exception as e:
        print(e)   
        print("Unable to Recognize your voice.") 
        return "None"
     
    return query

def wishMe():
    hour = int(datetime.datetime.now().hour)

    if hour>=0 and hour<4:  
        print(f"wellcome sir.  its {th}:{tm} {tap} and are you still working. Please take some rest")
        speak(f"wellcome sir.  its {th}:{tm} {tap} and are you still working. Please take some rest") 

    elif hour>=4 and hour<12:
        print(f"Good Morning sir!, its {th}:{tm} {tap}")
        speak(f"Good Morning sir!, its {th}:{tm} {tap}")

    elif hour>=12 and hour<17:
        print(f"Good Afternoon sir, its {th}:{tm} {tap}")  
        speak(f"Good Afternoon sir, its {th}:{tm} {tap}") 

    elif hour>=17 and hour<22:
        print(f"Good Evening sir, its {th}:{tm} {tap}")  
        speak(f"Good Evening sir, its {th}:{tm} {tap}") 

    else:
        print(f"wellcome sir.  its {th}:{tm} {tap}") 
        speak(f"wellcome sir.  its {th}:{tm} {tap}") 

# speak("Now may to introduce myself. I am PLUTO, the virtual artificial intelligence. I am hear to assist you with a varity of tasks as best i can. 24 hours a day,7 days a week, importing all preferences from home interface. Systems are now fully operational.")