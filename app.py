from flask import Flask, session, request, url_for, redirect, render_template
#from utils import [...]

app = Flask(__name__)
app.sekret_key = "key"


@app.route("/")
def root():
    return render_template("home.html")

if __name__ == '__main__':
    app.run()
