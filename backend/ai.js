const express = require('express');
const router = express.Router();
const axios = require('axios');

// Usa a variável de ambiente para a chave OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Mensagem obrigatória.' });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar IA.' });
  }
});

module.exports = router;
