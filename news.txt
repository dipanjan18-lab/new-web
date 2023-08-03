import pyautogui
from time import sleep
import webbrowser as web
import speech_recognition as sr
from mainvoice import speak
from mainvoice import takecommand 
import speech_recognition as sr  
import pyttsx3 
# pip install newsapi-python
# pip install pycountry

def todaynews():
    from newsapi import NewsApiClient
    import pycountry 
    newsapi = NewsApiClient(api_key='f80fe771775d44f5a8f3aca412bc5295')

    input_country = str("India")
    input_countries = [f'{input_country.strip()}']
    countries = {}

    for country in pycountry.countries:
        countries[country.name] = country.alpha_2
    codes = [countries.get(country.title(), 'Unknown code')
            for country in input_countries]

    speak("Please tell me Which category are you interested ?")
    option = takecommand()

    top_headlines = newsapi.get_top_headlines(category=f'{option.lower()}', language='en-in', country=f'{codes[0].lower()}')

    Headlines = top_headlines['articles']

    if Headlines:
        for articles in Headlines:
            b = articles['title'][::-1].index("-")
            if "news" in (articles['title'][-b+1:]).lower():
                print(f"{articles['title'][-b+1:]}: {articles['title'][:-b-2]}.")
                speak(f"{articles['title'][-b+1:]}: {articles['title'][:-b-2]}.")
            else:
                print(f"{articles['title'][-b+1:]} News: {articles['title'][:-b-2]}.")
                speak(f"{articles['title'][-b+1:]} News: {articles['title'][:-b-2]}.")
    else:
        print(f"Sorry no articles found for {input_country}, Something Wrong!!!")
        speak(f"Sorry no articles found for {input_country}, Something Wrong!!!")
        exit()

