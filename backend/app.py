from flask import Flask, request, jsonify
import flask
from flask_cors import CORS
from regression import predict_price
import pymongo

#create app referencing this file
app = Flask(__name__)
cors = CORS(app)

#Using pymongo gets the db and the collection  from mongoDB
client = pymongo.MongoClient()
housesDB = client["housesDB"]
housesCol = housesDB["houses"]
#set up routes & functions that execute on routes

#on homepage on post, gets the user's house info and runs the regression algorithm to estimate its price
#on homepage on get, sends to the user the possible values for adresses
@app.route('/homepage', methods=['GET','POST'])
def index():
    print(request)
    if request.method == "POST":
        print(request)
        house_data = request.json
        res = predict_price(house_data)
        res = flask.jsonify(res)
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res
    else:
        possible_values =  {
        "streets": list(housesCol.distinct("street")),
        "cities": list(housesCol.distinct("city")),
        "statezips": list(housesCol.distinct("statezip")),
        "countries": list(housesCol.distinct("country"))
        }
        print(possible_values)
        res = flask.jsonify(possible_values)
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res
    
    
#if the name is main runs app w/ debugging
if __name__ == "__main__":
    app.run(debug=True)