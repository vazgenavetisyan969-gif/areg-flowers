import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.log("❌ GEMINI_API_KEY չկա");
  console.log('Terminal-ում գրիր՝ export GEMINI_API_KEY="քո_api_key"');
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Tonacar AI server աշխատում է ✅",
  });
});

app.post("/api/assistant", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    if (!userMessage.trim()) {
      return res.json({
        answer: "Գրիր հարցդ, և ես կօգնեմ 😊",
      });
    }

    const prompt = `
Դու Tonacar.am կայքի AI օգնականն ես։
Պատասխանիր հայերեն, կարճ, պարզ և օգտակար։

Դու օգնում ես հաճախորդին տոնածառների թեմայով՝
- ինչ տոնածառ ընտրել տան համար
- դասական, լյուքս կամ փոքր տոնածառների տարբերությունը
- ինչպես խնամել տոնածառը
- ինչպես հավաքել կամ տեղադրել տոնածառը
- ինչպես ընտրել չափը
- ինչպես պահպանել տոնածառը հաջորդ տարվա համար
- ինչ զարդարանքներ ընտրել
- առաքման և պատվերի պարզ հարցեր

Կանոններ՝
- Մի ասա, որ դու Gemini ես։
- Պատասխանիր 2-5 նախադասությամբ։
- Պահիր բնական, վաճառքային և օգտակար տոն։

Հաճախորդի հարցը՝ ${userMessage}
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const answer = result.response.text();

    res.json({
      answer: answer || "Չկարողացա պատասխան կազմել։ Փորձիր նորից։",
    });
  } catch (error) {
    console.log("AI ERROR FULL:", error);

    res.json({
      answer: "AI կապի սխալ եղավ։ Terminal-ի error-ը նայիր։",
    });
  }
});

app.listen(5002, () => {
  console.log("✅ Tonacar AI server աշխատում է http://localhost:5002");
});

