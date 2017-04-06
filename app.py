import os
import json
from flask import Flask, render_template, request
from utils import parser

app = Flask(__name__)
app.secret_key = "key"


@app.route("/")
def root():
    return render_template("home.html")
    
@app.route("/getData")
def retrieve():
    return json.dumps(parser.to_json())

if __name__ == '__main__':
    app.debug = True
    app.run()
