import pickle
from flask import Flask, request, jsonify

# Load the saved model
with open('finalized_model.sav', 'rb') as f:
    model = pickle.load(f)

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/home", methods=['GET'])
def home():
    return "Hello World"
@app.route('/predict', methods=['POST'])
@cross_origin(supports_credentials=True)
def predict():
    # Get the input data from the request
    data = request.get_json()
    distance = data['distance']
    volume = data['volume']
    quantity = data['quantity']
    
    # Make the prediction
    input_data = [[distance, volume, quantity]]
    prediction = model.predict(input_data).tolist()
    
    # Return the prediction
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(debug=True)
