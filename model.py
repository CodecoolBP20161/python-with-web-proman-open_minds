from playhouse.shortcuts import model_to_dict, dict_to_model
from peewee import *
from build import db
import json


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()
    body = CharField()

    # Get a request.form[something] from the server as an argument.
    # Convert the JSON to dict, then to a model.
    # After that save it to the database.
    @staticmethod
    def save_to_db(request_form):
        board_dict = json.loads(request_form)
        board_model = dict_to_model(Board, board_dict)
        board = Board.create(title=board_model.title, body=board_model.body)
        return str(board.id)

    # Get all entries from the database, then convert models to dict and append to list, finally returns as a JSON.
    @staticmethod
    def load_from_db():
        board_list = []
        for board in Board.select():
            board_dict = model_to_dict(board)
            board_list.append(board_dict)
        return json.dumps(board_list)

    # Get a request.form[something] from the server as an argument.
    # Convert the JSON to int.
    # After that delete it to the database.
    @staticmethod
    def delete_from_db(request_form):
        deleted_id_json = request_form
        deleted_id_int = int(json.loads(deleted_id_json))
        element = Board.delete().where(deleted_id_int == Board.id)
        element.execute()
        return "board deleted"


class Card(BaseModel):
    title = CharField()
    body = CharField()
    boardId = ForeignKeyField(Board, related_name='board')

    # Get a request.form[something] from the server as an argument.
    # Convert the JSON to dict, then to a model.
    # After that save it to the database.
    @staticmethod
    def save_to_db(request_form):
        card_dict = json.loads(request_form)
        card_model = dict_to_model(Card, card_dict)
        card = Card.create(title=card_model.title, body=card_model.body, boardId=card_model.boardId)
        return str(card.id)

    # Get all entries from the database, then convert models to dict and append to list, finally returns as a JSON.
    @staticmethod
    def load_from_db(board_id):
        card_list = []
        for card in Card.select().join(Board).where(Board.id == board_id):
            card_dict = model_to_dict(card)
            card_list.append(card_dict)
        return json.dumps(card_list)

    # Get a request.form[something] from the server as an argument.
    # Convert the JSON to int.
    # After that delete it to the database.
    @staticmethod
    def delete_from_db(request_form):
        deleted_id_json = request_form
        deleted_id_int = int(json.loads(deleted_id_json))
        element = Card.delete().where(deleted_id_int == Card.id)
        element.execute()
        return "card deleted"
