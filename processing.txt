import mainvoice
from mainvoice import speak
from mainvoice import takecommand 
from pywikihow import search_wikihow 



def food(query):
    result = query.replace("can you make","How to make")
    result = result.replace("for me","")
    result = result.replace("me","")
    query  = query.replace("can you","I can't")
    query  = query.replace("me","")
    query  = query.replace("for","")
    speak("Sir, " + query + " for you")
    speak("But I can tell you how to make it")
    max_result = 1
    make = search_wikihow(result,max_result)
    assert len(make) == 1
    make[0].print()
    speak(make[0].summary)

def making(query):
    temp = query.replace("how to","if you want to")
    speak("sir, " + temp + " please follow my stapes.")
    max_result = 1
    make = search_wikihow(query,max_result)
    assert len(make) == 1
    make[0].print()
    speak(make[0].summary)