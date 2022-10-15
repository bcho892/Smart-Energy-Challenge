from time import sleep
import pygsheets
import pandas as pd

class Backend:
    def __init__(self, credLink, sheetName):
        gc = pygsheets.authorize(service_file=credLink)
        self.gc = gc
        sh = gc.open(sheetName)
        self.wks = sh[0]

    def updateSheet(self, power, voltage, current):
        df = pd.DataFrame()
        df["Power"] = power
        df["Voltage"] = voltage
        df["Current"] = current
        i = 1
        for row in self.wks:
            i = i + 1
        self.wks.set_dataframe(df,  (i,1), copy_head = False)
        sleep(1)


