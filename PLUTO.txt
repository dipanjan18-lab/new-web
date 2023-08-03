from PyQt5 import QtCore, QtWidgets, QtGui
from PyQt5.QtGui import QMovie
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtCore import Qt, QTimer, QTime, QDate
from PLUTOUI import Ui_MainWindow
import sys
import main

class MainThread(QThread):
    def __init__(self):
        super(MainThread,self).__init__()

    def run(self):
        self.Task_Gui()

    def Task_Gui(self):
        from mainvoice import wishMe
        wishMe()
        main.TaskExecution()

startfunctions = MainThread()

class Gui_Start(QMainWindow):
    
    def __init__(self):

        super().__init__()

        self.PLUTO_UI = Ui_MainWindow()

        self.PLUTO_UI.setupUi(self)

        self.PLUTO_UI.start_button.clicked.connect(self.startFunc)

        self.PLUTO_UI.stop_button.clicked.connect(self.close)

    def startFunc(self):

        self.PLUTO_UI.movies = QtGui.QMovie("E:/PLUTO/animation/pluto-unscreen.gif")
        self.PLUTO_UI.pluto_gif.setMovie(self.PLUTO_UI.movies)
        self.PLUTO_UI.movies.start()

        self.PLUTO_UI.movies_1 = QtGui.QMovie("E:/PLUTO/animation/QWc9.gif")
        self.PLUTO_UI.nuron_gif.setMovie(self.PLUTO_UI.movies_1)
        self.PLUTO_UI.movies_1.start()

        self.PLUTO_UI.movies_2 = QtGui.QMovie("E:/PLUTO/animation/J4o.gif")
        self.PLUTO_UI.time_date_bggif.setMovie(self.PLUTO_UI.movies_2)
        self.PLUTO_UI.movies_2.start()

        self.PLUTO_UI.movies_3 = QtGui.QMovie("E:/PLUTO/animation/Mr3W.gif")
        self.PLUTO_UI.circle_gif.setMovie(self.PLUTO_UI.movies_3)
        self.PLUTO_UI.movies_3.start()

        self.PLUTO_UI.movies_4 = QtGui.QMovie("E:/PLUTO/animation/norse-banks-cyberthreats.gif")
        self.PLUTO_UI.worldmap_gif.setMovie(self.PLUTO_UI.movies_4)
        self.PLUTO_UI.movies_4.start()

        self.PLUTO_UI.movies_4 = QtGui.QMovie("E:/PLUTO/animation/voice.gif")
        self.PLUTO_UI.voice.setMovie(self.PLUTO_UI.movies_4)
        self.PLUTO_UI.movies_4.start()

        
        timer = QTimer(self)
        timer.timeout.connect(self.showtime)
        timer.start(1000)
        startfunctions.start()

    def showtime(self):
        cuerrent_time = QTime.currentTime()
        label_time = cuerrent_time.toString("hh:mm:ss")
        labbel = "Time : " + label_time
        self.PLUTO_UI.time.setText(labbel)

        cuerrent_date = QDate.currentDate()
        label_date = cuerrent_date.toString("dd-MM-yyyy")
        labbel_1 = "Date : " + label_date
        self.PLUTO_UI.date.setText(labbel_1)

Gui_App = QApplication(sys.argv)

Gui_PLUTO = Gui_Start()

Gui_PLUTO.show()

exit(Gui_App.exec_())
