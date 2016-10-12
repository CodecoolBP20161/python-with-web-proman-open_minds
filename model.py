from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model

db = PostgresqlDatabase('', user='')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Board(BaseModel):
    id = IntegerField(unique=True)
    title = CharField()
    body = CharField()

    @staticmethod
    def next_id_manage(data=None):
        if data:
            with open('nextId.ini', 'w') as f:
                f.write(str(data))
        else:
            with open('nextId.ini', 'r') as f:
                data = f.read()
        return data

    @staticmethod
    def model_convert_dict():
        result = {'nextId': Board.next_id_manage()}
        board_list = []
        for element in Board.select():
            board_list.append(model_to_dict(element))
        result['boards'] = board_list
        return result

    @staticmethod
    def dict_convert_model(target_dict):
        Board.next_id_manage(target_dict['nextId'])
        data_list = []
        for item in target_dict['boards']:
            data_list.append(dict_to_model(Board, item))
        for item in data_list:
            Board.create(id=item.id, title=item.title, body=item.body)
