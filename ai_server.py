from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# API key-ը վերցնում ենք Terminal-ից
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("❌ GEMINI_API_KEY չկա։ Terminal-ում գրիր՝")
    print('export GEMINI_API_KEY="քո_Gemini_API_key_ը"')
else:
    genai.configure(api_key=API_KEY)


def get_working_model():
    try:
        available_models = [
            m.name
            for m in genai.list_models()
            if "generateContent" in m.supported_generation_methods
        ]

        preferred_models = [
            "models/gemini-1.5-flash",
            "models/gemini-flash-latest",
            "models/gemini-1.5-flash-8b",
        ]

        for name in preferred_models:
            if name in available_models:
                return name

        return available_models[0] if available_models else None

    except Exception as e:
        print("Model error:", e)
        return None


WORKING_MODEL_NAME = get_working_model()

if WORKING_MODEL_NAME:
    model = genai.GenerativeModel(WORKING_MODEL_NAME)
    print(f"✅ AI model-ը միացավ՝ {WORKING_MODEL_NAME}")
else:
    model = None
    print("❌ Model չի գտնվել")


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "ok",
        "message": "Tonacar AI server աշխատում է ✅"
    })


@app.route("/api/assistant", methods=["POST"])
def assistant():
    data = request.json or {}
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"answer": "Գրիր հարցդ, և ես կօգնեմ 😊"})

    if not model:
        return jsonify({
            "answer": "AI մոդելը դեռ միացված չէ։ Ստուգիր GEMINI_API_KEY-ը։"
        })

    try:
        prompt = f"""
Դու Tonacar.am կայքի AI օգնականն ես։
Դու խոսում ես հայերեն, կարճ, պարզ և օգտակար։

Դու օգնում ես հաճախորդին տոնածառների թեմայով՝
- ինչ տոնածառ ընտրել տան համար
- դասական, լյուքս կամ փոքր տոնածառների տարբերությունը
- ինչպես խնամել տոնածառը
- ինչպես հավաքել կամ տեղադրել տոնածառը
- ինչպես ընտրել չափը
- ինչպես պահպանել տոնածառը հաջորդ տարվա համար
- ինչ զարդարանքներ ընտրել
- առաքման և պատվերի պարզ հարցեր

Կարևոր կանոններ՝
- Մի ասա, որ դու Gemini ես։
- Եթե հարցը տոնածառների մասին չէ, փորձիր կապել տոնական կամ տոնածառների թեմայի հետ։
- Պատասխանիր 2-5 նախադասությամբ։
- Պահիր վաճառքային, բայց բնական տոն։

Հաճախորդի հարցը՝ {user_message}
"""

        response = model.generate_content(prompt)

        if response.text:
            return jsonify({"answer": response.text})

        return jsonify({"answer": "Չկարողացա պատասխան կազմել, փորձիր նորից։"})

    except Exception as e:
        print("AI ERROR:", e)

        if "429" in str(e):
            return jsonify({
                "answer": "AI-ի հարցումների լիմիտը սպառվել է։ Փորձիր մի քիչ հետո։"
            })

        return jsonify({
            "answer": "Կապի սխալ եղավ։ Ստուգիր server-ը կամ API key-ը։"
        })


if __name__ == "__main__":
    app.run(port=5000, debug=True)