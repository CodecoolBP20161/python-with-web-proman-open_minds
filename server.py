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
def post_data_to_database():
    board_dict = json.loads(request.form['board'])
    board_model = dict_to_model(Board, board_dict)
    Board.create(title=board_model.title, body=board_model.body)
    return 'model created'


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
