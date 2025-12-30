from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# load trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/")
def home():
    return "Customer Behaviour Prediction API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        features = [
            data["Administrative"],
            data["Administrative_Duration"],
            data["Informational"],
            data["Informational_Duration"],
            data["ProductRelated"],
            data["ProductRelated_Duration"],
            data["BounceRates"],
            data["ExitRates"],
            data["PageValues"],
            data["SpecialDay"],
            data["Month"],
            data["OperatingSystems"],
            data["Browser"],
            data["Region"],
            data["TrafficType"],
            data["VisitorType"],
            data["Weekend"],
        ]
        features = np.array(features).reshape(1, -1)

        prediction = model.predict(features)[0]
        return jsonify({"prediction": int(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
