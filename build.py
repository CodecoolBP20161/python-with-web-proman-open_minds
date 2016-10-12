from model import *

# Configure your database connection here
# database name = should be your username on your laptop
# database user = should be your username on your laptop
# db = PostgresqlDatabase('', user='')

db.connect()

db.drop_tables([Board], safe=True, cascade=True)
db.create_tables([Board], safe=True)
