import serial

class ReadSerial:
    def __init__(self):
        print("---------------------SETUP---------------------")
        self.ser = serial.Serial()
        print("Enter Baudrate")
        self.ser.baudrate = int(input())
        print("Enter the port")
        self.ser.port = 'COM' + input()
        self.ser.open()
        print("---------------------START---------------------")

    def serialRead(self):
        string = self.ser.readline()
        string = string.decode("utf-8")
        return string
    
    def flush(self):
        self.ser.flushInput()