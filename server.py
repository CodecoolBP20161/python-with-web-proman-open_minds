from flask import Flask, render_template, request
from json import *
from model import *

app = Flask(__name__)


# server
@app.route("/")
def index():
    return render_template('index.html')



if __name__ == "__main__":
    app.run(host='0.0.0.0')
