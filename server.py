from flask import Flask, render_template, request
import json
from model import *
from playhouse.shortcuts import model_to_dict, dict_to_model


app = Flask(__name__)


# server
@app.route("/")
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def post_board_to_database():
    board_dict = json.loads(request.form['board'])
    board_model = dict_to_model(Board, board_dict)
    Board.create(title=board_model.title, body=board_model.body)
    return 'model created'


@app.route('/api/', methods=['GET'])
def get_board_from_database():
    board_list = []
    for board in Board.select():
        board_dict = model_to_dict(board)
        board_list.append(board_dict)
    return json.dumps(board_list)


@app.route('/api/delete', methods=['POST'])
def delete_board_from_database():
    deleted_id_json = request.form['board']
    deleted_id_int = int(json.loads(deleted_id_json))
    print(type(deleted_id_int))
    element = Board.delete().where(deleted_id_int == Board.id)
    element.execute()
    return "deleted board??!! :)"


@app.route('/board/<board_id>', methods=['GET'])
def get_card_from_database(board_id):
    card_list = []
    for card in Card.select().join(Board).where(Board.id == board_id):
        card_dict = model_to_dict(card)
        card_list.append(card_dict)
    return json.dumps(card_list)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
