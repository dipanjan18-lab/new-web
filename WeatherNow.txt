import subprocess as sp
import requests
from bs4 import BeautifulSoup
from bs4 import BeautifulSoup as bs
import argparse
import mainvoice
from mainvoice import speak
from mainvoice import takecommand 
import speech_recognition as sr
import pyttsx3 
import geocoder
import pycountry
g = geocoder.ip('me')

# Function to convert country code to country name
def country_code_to_name(country_code):
    try:
        country = pycountry.countries.get(alpha_2=country_code)
        if country is not None:
            return country.name
        else:
            return "Country not found"
    except LookupError:
        return "Invalid country code"

def location():
    # Check if the location information is available
    if g.ok:
        # Print the location details
        print("Current Location:")
        loc = country_code_to_name(g.country)
        print("Country:", loc)
        speak(f"Now you are in {loc}")
        city = g.city
        print("City:", city)
        state = g.state
        print("State:", state)
        speak(f"Your current city and state is {city},{state}")
        print("Latitude:", g.latlng[0])
        print("Longitude:", g.latlng[1])
        lati = g.latlng[0]
        long = g.latlng[1]
        speak(f"And your aproximate Latitude & Longitude is {lati} North,{long} East")
    else:
        print("Failed to retrieve the location information.")

def get_weather_data(url):
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
    # US english
    LANGUAGE = "en-US,en;q=0.5"

    session = requests.Session()
    session.headers['User-Agent'] = USER_AGENT
    session.headers['Accept-Language'] = LANGUAGE
    session.headers['Content-Language'] = LANGUAGE
    html = session.get(url)
    soup = bs(html.text, "html.parser")

    result = {}
    result['region'] = soup.find("div", attrs={"id": "wob_loc"}).text
    result['temp_now'] = soup.find("span", attrs={"id": "wob_tm"}).text
    result['dayhour'] = soup.find("div", attrs={"id": "wob_dts"}).text
    result['weather_now'] = soup.find("span", attrs={"id": "wob_dc"}).text
    result['precipitation'] = soup.find("span", attrs={"id": "wob_pp"}).text
    result['humidity'] = soup.find("span", attrs={"id": "wob_hm"}).text
    result['wind'] = soup.find("span", attrs={"id": "wob_ws"}).text
    return result

def weather():    
    URL = "https://www.google.com/search?lr=lang_en&ie=UTF-8&q=weather"
    parser = argparse.ArgumentParser(description="Quick Script for Extracting Weather data using Google Weather")
    parser.add_argument("region", nargs="?", help="", default="")
    # parse arguments
    args = parser.parse_args()
    region = args.region
    URL += region
    # get data
    data = get_weather_data(URL)
    city = g.city
    state = g.state
    print("location : ", city, state)
    print(f"Day : {data['dayhour']}")
    print(f"Temperature : {data['temp_now']}°C")
    print(f"Weather : {data['weather_now']}")
    print(f"Precipitation : {data['precipitation']}")
    print(f"Humidity : {data['humidity']}")
    print(f"Wind : {data['wind']}")
    speak(f"Weather for {city}, {state}")
    speak(f"Now it is {data['dayhour']}")
    speak(f"current Temperature is {data['temp_now']}°C")
    speak(f"current atmosphere is {data['weather_now']}")
    speak(f"The Precipitation of your current location is {data['precipitation']}")
    speak(f"and Humidity is {data['humidity']}")
    speak(f"And Wind is blowing {data['wind']}")     