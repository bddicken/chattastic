'''
WIP Code!
This will be used for loading a bunch of sample data into the DB for the course.
Stay tuned for more!
'''

import sys
import random
import string
#import names
#import wonderwords
#import english_words 
from random_username.generate import generate_username
from datetime import datetime
from faker import Faker
fake = Faker()

COUNT = int(sys.argv[-1])

class InsertBuilder:

    def __init__(self, table_name, columns):
        self.table_name = table_name
        self.columns = columns
        self.rows = []
        self.batch = 1000

    def add_row(self, row):
        self.rows.append(row)

    def dump(self):
        result = ''
        for i in range (0, len(self.rows), self.batch): # 1k row inserts at a time
            result += "INSERT INTO " + self.table_name + " (" + ', '.join(self.columns) + ") VALUES ";
            j = i
            while j < i+self.batch and j < len(self.rows):
                result += valueify(self.rows[j])
                j+=1
                if j != i+self.batch and j != len(self.rows):
                    result += ',\n'
            result += ';\n'
        print(result)
        self.rows = []

def valueify(values):
    result = "("
    for i in range(len(values)):
        element = values[i]
        if type(element) == type(0) or type(element) == type(1.0):
            result += str(element)
        else:
            result += "'" + element + "'"
        if i < len(values)-1:
           result += ", " 
    return result + ")"

messages = []
for i in range(2000):
    messages.append(fake.sentence(nb_words=10, variable_nb_words=True))

usernames = []
for i in range(2000):
    usernames.append(generate_username(1)[0])

chatrooms = ['mysql', 'planetscale', 'javascript', 'laravel']
while len(chatrooms) < COUNT / 1000:
    chatrooms.append(fake.word())

def message_inserts():
    ib = InsertBuilder('message', ['room', 'alias', 'text', 'created_at'])
    cid = 0
    for room in chatrooms:
        for i in range(1000):
            cid += 1
            t = fake.date_time_between(start_date='-1y', end_date='now')
            time = t.strftime('%Y-%m-%d %H:%M:%S')
            alias = random.choice(usernames)
            message = random.choice(messages)
            while "'" in message:
                message = s.sentence()
            ib.add_row([room, alias, message, time])
        if cid % 1000 == 0:
            ib.dump()

message_inserts()
print('done with messages', file=sys.stderr)

