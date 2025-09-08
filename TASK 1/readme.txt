
# 📌 SMS Spam Classifier — Project Summary

This project is a **Machine Learning + Agentic AI powered SMS/Email Spam Classifier** built with:

* 🐍 **Python** (scikit-learn, Flask, NLTK)
* 🌐 **Flask Web App** (HTML, CSS, JS frontend)
* 🤖 **Gemini (via LangChain)** for smart recommendations

---

## 🔨 What we built

1. **Trained the Model in Colab**

   * Used TF-IDF for feature extraction.
   * Combined multiple algorithms (SVM, MultinomialNB, ExtraTrees) with **Voting Classifier** for robust prediction.
   * Saved trained `model.pkl` and `vectorizer.pkl`.

2. **Flask Backend (`app.py`)**

   * Loads the ML model + vectorizer.
   * Provides `/predict` API endpoint → takes a message → returns **Spam/Ham + probability**.
   * Added a **custom threshold rule**:

     * If predicted as **Ham** but confidence < 70%, override to **Spam**.

3. **Frontend (HTML + CSS + JS)**

   * Clean interface with textarea input.
   * Buttons for **Sample / Clear / Copy**.
   * Shows **Prediction, Confidence, and AI Recommendation**.
   * “Spam” appears 🔴 red, “Ham” appears 🟢 green.

4. **Agentic AI Integration (`agent.py`)**

   * Uses **LangChain + Gemini API**.
   * After classification, the LLM generates a **short human-friendly recommendation** (e.g., “Don’t click suspicious links” or “This looks safe”).
   * API key stored securely via `.env` and `python-dotenv`.

---

## ⚠️ Data Error Faced & How It Was Solved

During deployment, the model kept throwing:

```
❌ cannot use sparse input in 'SVC' trained on dense data
```

* Root cause: In training, I had converted TF-IDF features to **dense arrays** using `.toarray()`.
* But at prediction time, Flask was passing **sparse matrices** (default from `vectorizer.transform`).
* Solution:

  * Quick fix → added `.toarray()` inside Flask before prediction.
  * Lesson learned → always keep training and inference data formats consistent.

---

## 🎓 What I Learned

* How to build a **full ML pipeline**: training → saving → deploying with Flask.
* The importance of **data representation (sparse vs dense)**. Even a small mismatch can break predictions.
* How to integrate **Agentic AI (Gemini via LangChain)** with traditional ML to provide not just predictions, but also **actionable insights**.
* How to design a simple but elegant frontend for ML apps.
* Using **dotenv** for safe API key management.

---

