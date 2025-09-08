import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY not found in .env file")

# Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.4,
    google_api_key=api_key
)

# Define prompt template
prompt = PromptTemplate(
    input_variables=["message", "label"],
    template="""
The following SMS/email message has been classified as {label}.

Message: "{message}"

Give one short recommendation (max 2 sentences) to the user about how to handle it.
"""
)

chain = LLMChain(llm=llm, prompt=prompt)

def get_recommendation(message: str, label: str) -> str:
    try:
        return chain.run(message=message, label=label).strip()
    except Exception as e:
        return f"(Recommendation unavailable: {e})"
