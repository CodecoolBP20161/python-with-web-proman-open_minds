from model import *


# Configure your database connection here
# database name = should be your username on your laptop
def init_db():
    try:
        with open('db.ini') as f:
            db_name = f.read()
    except FileNotFoundError:
        with open('db.ini', 'w') as f:
            db_name = f.write(input("What's name your database?\n"))
    return db_name

db = PostgresqlDatabase(init_db())

if __name__ == '__main__':
    db.connect()
    db.drop_tables([Board, Card], safe=True, cascade=True)
    db.create_tables([Board, Card], safe=True)
