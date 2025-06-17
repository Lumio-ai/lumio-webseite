const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400
      })
    });
    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Fehler bei der KI-Anfrage." });
  }
});

app.listen(3001, () => console.log('Backend läuft auf http://localhost:3001'));
