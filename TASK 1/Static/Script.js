
document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("message");
  const predictBtn = document.getElementById("predictBtn");
  const clearBtn = document.getElementById("clearBtn");
  const sampleBtn = document.getElementById("sampleBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resultCard = document.getElementById("resultCard");
  const resultText = document.getElementById("resultText");
  const probText = document.getElementById("probText");
  const spinner = document.getElementById("spinner");
  const charCount = document.getElementById("charCount");
  const recText = document.getElementById("recText");


  // --- Show character count ---
  textarea.addEventListener("input", () => {
    charCount.textContent = `${textarea.value.length} chars`;
  });

  // --- Predict button click ---
  predictBtn.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) {
      alert("Please enter a message");
      return;
    }

    console.log("📤 Sending:", text);

    spinner.hidden = false;
    resultCard.hidden = true;

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      console.log("✅ Parsed:", data);

      resultCard.hidden = false;

      if (data.error) {
        resultText.textContent = `❌ ${data.error}`;
        resultText.className = "result-text";
        probText.textContent = "";
        recText.textContent = "";
      } else {
        resultCard.hidden = false;
        resultText.textContent = data.prediction;
        resultText.className = "result-text " + 
            (data.prediction === "Spam" ? "spam" : "ham");
        probText.textContent = `Confidence: ${(data.probability * 100).toFixed(2)}%`;

        recText.textContent = `Recommendation: ${data.recommendation}`;
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      resultCard.hidden = false;
      resultText.textContent = "Server error";
      resultText.className = "result-text";
      probText.textContent = "";
    } finally {
      spinner.hidden = true;
    }
  });

  // --- Clear ---
  clearBtn.addEventListener("click", () => {
    textarea.value = "";
    charCount.textContent = "0 chars";
    resultCard.hidden = true;
  });

  // --- Use Sample ---
  sampleBtn.addEventListener("click", () => {
    textarea.value = "Limited time offer! Buy 1 get 1 free. Visit site now.";
    charCount.textContent = `${textarea.value.length} chars`;
  });

  // --- Copy ---
  copyBtn.addEventListener("click", () => {
    if (!textarea.value) return;
    navigator.clipboard.writeText(textarea.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
  });
});
