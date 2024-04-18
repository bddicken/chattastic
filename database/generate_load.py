import threading
import time
import random
import sys
from dotenv import load_dotenv
load_dotenv()
import os
import MySQLdb

connections = []
threads = []
    
def make_connection():
    '''connection = MySQLdb.connect(
      host= os.getenv("DB_HOST"),
      user=os.getenv("DB_USERNAME"),
      passwd= os.getenv("DB_PASSWORD"),
      db= os.getenv("DB_NAME"),
      autocommit = True,
      ssl_mode = "VERIFY_IDENTITY",
      ssl      = {
        "ca": "/etc/ssl/cert.pem"
      }
    )'''
    connection = MySQLdb.connect(
      host= os.getenv("DB_HOST"),
      user=os.getenv("DB_USERNAME"),
      passwd= os.getenv("DB_PASSWORD"),
      db= os.getenv("DB_NAME"),
      autocommit = True
    )
    return connection

def run_load(count, index):
    
    cursor = connections[index].cursor()

    for i in range(count):
        r = random.randint(0,100000)
        cursor.execute('SELECT alias FROM message WHERE id = %s;', (r,))
        cursor.fetchone()

    connections[index].close()
    print('Done')


THREADS = int(sys.argv[-2])
COUNT = int(sys.argv[-1])

if __name__ =="__main__":
    
    for i in range (0, THREADS):
        c = make_connection()
        connections.append(c)
    
    for i in range (0, THREADS):
        t = threading.Thread(target=run_load, args=(COUNT,i))
        threads.append(t)

    print('starting')
    for t in threads:
        t.start()

    for t in threads:
        t.join()

    print("Done with it all!")

