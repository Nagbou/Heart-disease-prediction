from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd
import os

app = Flask(__name__, static_folder='static')

# Load the saved model and feature list
with open(os.path.join('model', 'ensemble_model.pkl'), 'rb') as f:
    model = pickle.load(f)

with open(os.path.join('model', 'reduced_features.pkl'), 'rb') as f:
    reduced_features = pickle.load(f)

@app.route('/')
def index():
    # Use render_template to serve HTML files
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.json

    # Create a DataFrame from the input data
    input_df = pd.DataFrame([data])

    # Ensure the input data contains only the required features
    input_reduced = input_df[reduced_features]

    # Make predictions
    prediction = model.predict(input_reduced)
    probability = model.predict_proba(input_reduced)

    # Return the prediction and probability as JSON
    return jsonify({
        'prediction': int(prediction[0]),
        'probability': probability[0].tolist()
    })

if __name__ == '__main__':
    app.run(debug=True)
