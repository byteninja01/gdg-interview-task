
from flask import Flask, render_template, request, jsonify
import pickle
from agent import get_recommendation 

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("🔥 Request received:", data, flush=True)

        message = data.get("message", "")
        if not message.strip():
            return jsonify({"error": "Message is empty"}), 400

        # ML Prediction
        X = vectorizer.transform([message]).toarray()
        pred = model.predict(X)[0]
        proba = model.predict_proba(X)[0].max()

        # Default label
        label = "Spam" if pred == 1 else "Ham"

        if label == "Ham" and proba < 0.70:
            label = "Spam (low-confidence Ham)"
            print("⚠️ Overridden to Spam because prob < 0.70", flush=True)

        # Agentic AI Recommendation
        recommendation = get_recommendation(message, label)

        print("✅ Final Prediction:", label, "Prob:", proba, "Rec:", recommendation, flush=True)

        return jsonify({
            "prediction": label,
            "probability": round(float(proba), 3),
            "recommendation": recommendation
        })

    except Exception as e:
        print("❌ Error in /predict:", e, flush=True)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
