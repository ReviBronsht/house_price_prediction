#imports
import pymongo
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder

house1 = {
'bedrooms':3,
'bathrooms':1.5,
'sqft_living':1340,
'sqft_lot':7912,
'floors':1.5,
'waterfront':0,
'view':0,
'condition':3,
'sqft_above':1340,
'sqft_basement':0,
'yr_built':1955,
'yr_renovated':2005,
'street':"18810 Densmore Ave N",
'city':"Shoreline",
'statezip':"WA 98133",
'country': "USA"}

def predict_price(house_data):
    '''
    using regression algorithm, predicts house price
    '''
    
    #Using pymongo gets the db and the collection  from mongoDB
    client = pymongo.MongoClient()
    housesDB = client["housesDB"]
    houses = housesDB["houses"]
    
    #gets all houses
    df = pd.DataFrame(list(houses.find({})))
    print(df.head())
    
    #puts user's house into df
    house_data["date"] = ""
    house_data["price"] = 0
    house_data["_id"] = "0"
    user_house = pd.DataFrame(house_data, index=[0])
    print(user_house)
    
    #combining user_house and the main df for pre processing
    combined_df = pd.concat([df, pd.DataFrame(user_house, index=[0])])
    
    #Encoding Categorical Variables

    # using label encoder to encode street by encoding the categorical variables into integer labels
    categorical_variables = ["street","city","statezip","country"]
    
    label_encoder = LabelEncoder()

    for var in categorical_variables:
        combined_df[var] = label_encoder.fit_transform(combined_df[var])
     
    print(combined_df.head())
    
    #Feature Engineering
    #adding additional features to enhance model

    #total number of rooms
    combined_df["rooms"] = combined_df.apply(lambda x: x["bedrooms"] + x["bathrooms"], axis=1)

    #ratio of living area to lot
    combined_df["living_to_lot"] = combined_df.apply(lambda x: x["sqft_living"] / x["sqft_lot"], axis=1)

    #age of the house
    import datetime
    today = datetime.date.today()
    year = today.year
    combined_df["age"] = combined_df.apply(lambda x: year - x["yr_built"], axis=1)

    print(combined_df.head())
    
    
    #Feature Scaling
    #using min-max scaling to scale the highly varying features into 0-1 scale
    scale_features = ["bedrooms","bathrooms","sqft_living","sqft_lot","floors","waterfront","view","condition","sqft_above","sqft_basement","yr_built","yr_renovated","street","city","statezip","country", "rooms","living_to_lot","age"]

    scaler = MinMaxScaler()
    for var in scale_features:
        combined_df[var] =  scaler.fit_transform(combined_df[[var]])
        
    print(combined_df.head())
    
    #Feature Selection

    #removing highly correlated features (according to heatmap, sqft_living and sqft_above)
    combined_df = combined_df.drop(["sqft_above"],axis=1)
    print(combined_df.head())
    
    #splitting the dfs
    original_df_length = len(df)
    df = combined_df[:original_df_length]
    user_house = combined_df[original_df_length:]
    
    # seperating features from target
    features = df.drop(columns=["date","price","_id"])
    target = df["price"]
    user_house = user_house.drop(columns=["date","price","_id"])
    
    print(features.head())
    print(target.head())
    
    # splitting features to train and test
    X_train, X_test, y_train, y_test = train_test_split(features,target, train_size=0.8,random_state=0)
    print("Training size: ", len(X_train), " Test size: ", len(X_test))
    
    #dropping features with least importance
    less_important_features = ["country","yr_renovated","bedrooms","floors","condition","rooms","waterfront","bathrooms"]
    X_train = X_train.drop(less_important_features,axis=1)
    X_test = X_test.drop(less_important_features,axis=1)
    user_house = user_house.drop(less_important_features,axis=1)
    
    #best params from model evaluation
    best_params = {'learning_rate': 0.1, 'max_depth': 3, 'min_samples_leaf': 1, 'min_samples_split': 2, 'n_estimators': 1000}
    
    #fit predict
    reg_C_tuned = GradientBoostingRegressor(**best_params)
    learner = reg_C_tuned.fit(X_train, y_train)
    # predictions_test = learner.predict(X_test) 

    # res = X_test
    # res["price"] = y_test

    # res["predicted_price"] = predictions_test
    prediction = learner.predict(user_house)
    res = user_house
    res["predicted_price"] = prediction
    print(res)
    
    #r2 score
    #r2_score = metrics.r2_score(y_test,predictions_test)
    #print("r squared error:" ,r2_score)
    
    return prediction[0]
    

    

#print(predict_price(house1))