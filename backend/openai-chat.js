
// Backend Gemini (Google GenAI)
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require("express");
const cors = require("cors");
let GoogleGenAI;
try {
  GoogleGenAI = require("@google/genai").GoogleGenAI;
} catch (err) {
  console.error("Pacote @google/genai não instalado. Execute: npm install @google/genai");
  process.exit(1);
}

const app = express();
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  console.error('Erro: GOOGLE_GENAI_API_KEY não definida no .env');
  process.exit(1);
}
const genai = new GoogleGenAI({ apiKey });

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Mensagem obrigatória." });

  try {
    const response = await genai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: message,
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error("Erro ao consultar Gemini:", err);
    res.status(500).json({ error: err.message || "Erro ao consultar Gemini." });
  }
});

app.listen(3001, () => console.log("Gemini chat server running on 3001"));
