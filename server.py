from flask import Flask, render_template, request
from model import *


app = Flask(__name__)


"""
This file handles routes for the server. (The user sees just the index.)
Every route returns a peewee model's method with request.form, if its needed.
(More info about the model's methods, check the model.py)
"""


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def post_board_to_database():
    return Board.save_to_db(request.form['board'])


@app.route('/api/', methods=['GET'])
def get_board_from_database():
    return Board.load_from_db()


@app.route('/api/delete', methods=['POST'])
def delete_board_from_database():
    return Board.delete_from_db(request.form['board'])


@app.route('/board/<board_id>', methods=['POST'])
def post_card_to_database(board_id):
    return Card.save_to_db(request.form['card'])


@app.route('/board/<board_id>', methods=['GET'])
def get_card_from_database(board_id):
    return Card.load_from_db(board_id)


@app.route('/board/<board_id>/delete', methods=['POST'])
def delete_card_from_database(board_id):
    return Card.delete_from_db(request.form['card'])


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
