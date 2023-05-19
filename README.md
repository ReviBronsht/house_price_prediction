# house_price_prediction

GitHub link: https://github.com/ReviBronsht/recipe-builder

#### House prices web app allows the user to enter a house's details and address and estimates its price

#### Machine Learning in Python, backend in Flask, frontend in React, MongoDB database 
<hr>

### Machine Learning Algorithms

Regression:

The Regression algorithm is used to estimate the user's house price by investigating the relationship between features (house details and address) and target (house price).

It does so by first pre-processing the data:
-encoding categorical values into numerical values
-feature engineering additional features
-feature scaling highly varying features
-feature selection

It then splits data to train and test, trains a GradientBoostingRegressor (tested to give most accurate results) with fine tuned best params.

More info in machine-learning-model

<hr>

### The Server (backend)

Initialization: install dependencies from requirements.txt and run app.py file

The server uses Flask to create a server with a route that gets house details and address, and runs the algorithm. (description of each route in app.js file). 
It connects to local mongodb client with pymongo.

<hr>

### The Client (frontend)

Initialization: npm i && npm start

The homepage lets users enter their house details and gets their address, and shows the result of the algorithm.

<hr>


### DB

Original houses dataset downloaded from: [https://www.kaggle.com/datasets/shivamb/netflix-shows?resource=download](https://www.kaggle.com/datasets/shree1992/housedata)
and saved in mongodb compass as "housesDB"