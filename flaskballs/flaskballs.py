# demonstration code 
from flask import Flask, render_template

app = Flask(__name__)

# app route for root URL #
@app.route('/')

# basic function to serve up flask HTML page #
def index():

    # render homepage for flaskballs #
    return render_template('index.html')

if __name__ == "__main__":
	app.run()

