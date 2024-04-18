import threading
import datetime
import time
import random
import sys
import MySQLdb
from faker import Faker
fake = Faker()

connections = []
threads = []

SCALE = int(sys.argv[-3])
QUERIES = int(sys.argv[-2])
THREADS = int(sys.argv[-1])
    
def make_connection():
    connection = MySQLdb.connect(
        host='127.0.0.1',
        user='root',
        passwd='password',
        db='chat')
    return connection

def run_load(index):
    cursor = connections[index].cursor()
   
    for i in range(QUERIES):
        t = fake.date_time_between(start_date='-1y', end_date='now').strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute('SELECT text FROM message WHERE created_at = %s;', (t,))
        cursor.fetchone()

if __name__ =="__main__":
    
    for i in range (0, THREADS):
        c = make_connection()
        connections.append(c)

    print("current time:", datetime.datetime.now())
    
    for i in range (0, THREADS):
        t = threading.Thread(target=run_load, args=(i,))
        threads.append(t)

    print('---')
    print('starting')
    start = time.time()
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    elapsed = time.time() - start
    print('completed in', round(elapsed,2), 'seconds')
    print('QPS =', round((QUERIES*THREADS)/elapsed,2))

