from playhouse.shortcuts import model_to_dict, dict_to_model
from peewee import *
from build import db
import json


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class ModelTemplate(BaseModel):
    # Get a request.form[something] from the server as an argument.
    # Convert the JSON to dict, then to a model.
    # After that save it to the database.
    @staticmethod
    def save_to_db(model, request_form):
        data_dict = json.loads(request_form)
        data_model = dict_to_model(model, data_dict)
        if model == Board:
            data = Board.create(title=data_model.title, body=data_model.body)
        elif model == Card:
            data = Card.create(title=data_model.title, body=data_model.body, boardId=data_model.boardId)
        else:
            raise ValueError
        return str(data.id)

    # Get all entries from the database, then convert models to dict and append to list, finally returns as a JSON.
    @staticmethod
    def load_from_db(model, board_id=None):
        data_list = []
        if model == Board:
            data_container = Board.select()
        elif model == Card:
            data_container = Card.select().join(Board).where(Board.id == board_id)
        else:
            raise ValueError
        for item in data_container:
            data_dict = model_to_dict(item)
            data_list.append(data_dict)
        return json.dumps(data_list)

    # Get a request.form[something] from the server as an argument.
    # Convert the JSON to int.
    # After that delete it to the database.
    @staticmethod
    def delete_from_db(model, request_form):
        deleted_id_json = request_form
        deleted_id_int = int(json.loads(deleted_id_json))
        print(deleted_id_int)
        print(model.id)
        element = model.delete().where(deleted_id_int == model.id)
        element.execute()
        return model.__name__ + " deleted"


class Board(ModelTemplate):
    title = CharField()
    body = CharField()

    @staticmethod
    def save_model(request_form):
        return ModelTemplate.save_to_db(Board, request_form)

    @staticmethod
    def load_model():
        return ModelTemplate.load_from_db(Board)

    @staticmethod
    def delete_model(request_form):
        return ModelTemplate.delete_from_db(Board, request_form)


class Card(ModelTemplate):
    title = CharField()
    body = CharField()
    boardId = ForeignKeyField(Board, related_name='board')

    @staticmethod
    def save_model(request_form):
        return ModelTemplate.save_to_db(Card, request_form)

    @staticmethod
    def load_model(board_id):
        return ModelTemplate.load_from_db(Card, board_id)

    @staticmethod
    def delete_model(request_form):
        return ModelTemplate.delete_from_db(Card, request_form)
