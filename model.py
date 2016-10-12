from peewee import *

db = PostgresqlDatabase('', user='')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()
    body = CharField()


class Card(BaseModel):
    title = CharField()
    body = CharField()
    boardId = ForeignKeyField(Board, related_name='board')
