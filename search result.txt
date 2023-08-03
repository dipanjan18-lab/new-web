from bs4.element import ResultSet
import pyautogui
from time import sleep
import keyboard
import webbrowser as web
import speech_recognition as sr
import webbrowser


cm = input("Enter what you want to search")
webbrowser.open(f"https://www.google.com/search?q={cm}")
sleep(9)
print(ResultSet)