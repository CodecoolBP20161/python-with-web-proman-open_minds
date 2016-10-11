from model import *

db.connect()

db.drop_tables([Person], safe=True, cascade=True)
db.create_tables([Person], safe=True)

# Person.create(name="A", age=2)
