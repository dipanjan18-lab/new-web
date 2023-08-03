import subprocess
import mainvoice
from mainvoice import speak
from mainvoice import takecommand 
import speech_recognition as sr 
import pyttsx3  
import gdriveaudio

def install_package(package):
    subprocess.check_call(['pip', 'install', package])

def main():
    required_packages = ['flask', 
                         'pywhatkit', 
                         'PyQt5',
                         'bs4', 
                         'wikipedia', 
                         'pywikihow',
                         'opencv-python', 
                         'pyjokes', 
                         'pyautogui',
                         'keyboard', 
                         'psutil', 
                         'playsound==1.2.2',
                         'pyfirmata', 
                         'pyttsx3', 
                         'sr',
                         'SpeechRecognition',
                         'screen_brightness_control',
                         'mysql-connector-python']

    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            print(f"Package {package} not found. Installing...")
            install_package(package)

    # Rest of your main program logic
    print("Packages installed. Starting the program...")
    speak("Installelation complete.")