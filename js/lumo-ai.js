// /js/lumo-ai.js

async function askOpenAI(question, avatarName) {
  // ACHTUNG: API-Key niemals öffentlich im Frontend verwenden!
  // Für echten Betrieb: API-Key und Anfrage über ein eigenes Backend leiten!
  const apiKey = "DEIN_OPENAI_API_KEY";
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: question}],
      max_tokens: 300
    })
  });
  const data = await response.json();
  if (data.choices && data.choices[0]) {
    return `${avatarName} sagt: ${data.choices[0].message.content}`;
  } else {
    return `${avatarName} sagt: Es gab ein Problem mit der Antwort.`;
  }
}

// Event-Handler für das Formular
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('lumo-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const question = document.getElementById('lumo-question').value.trim();
      const selectedAvatar = document.querySelector('.avatar.selected span').textContent;
      const answerDiv = document.getElementById('lumo-answer');
      if (!question) {
        answerDiv.innerHTML = 'Bitte stelle eine Frage!';
        return;
      }
      answerDiv.innerHTML = 'Lade Antwort...';
      const answer = await askOpenAI(question, selectedAvatar);
      answerDiv.innerHTML = answer;
    });
  }
});
