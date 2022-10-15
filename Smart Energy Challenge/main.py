import re
from Backend import Backend
from ReadSerial import ReadSerial

#hate python, copied from https://stackoverflow.com/questions/606191/convert-bytes-to-a-string
def formatReading(value):
    return re.findall(r"[-+]?(?:\d*\.\d+|\d+)", value)[0]

def processReading(line):
    line = line.strip()
    if "Current" in line:
        return 2
    elif "Voltage" in line:
        #do something
        return 1
    elif "Power" in line:
        #do something
        return 0

if __name__ == "__main__":
    connection = Backend('credentials.json', 'Data Logging')
    ser = ReadSerial()
    while True:
        values = [[],[],[]]
        for i in range (3):
            temp = ser.serialRead()
            index = processReading(temp)
            temp = formatReading(temp)
            values[index].append(temp)
        connection.updateSheet(values[0], values[1], values[2])
        ser.flush()
        print("Updated")
        print("Power: ", values[0][0], " Voltage: ", values[1][0], " Current: ", values[2][0])        

