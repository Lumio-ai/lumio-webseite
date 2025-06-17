// Avatar-Auswahl und Bereich-Umschaltung
document.querySelectorAll('.avatar').forEach(avatar => {
  avatar.addEventListener('click', function() {
    document.querySelectorAll('.avatar').forEach(a => a.classList.remove('selected'));
    this.classList.add('selected');
    const name = this.dataset.name;
    document.getElementById('avatar-message').innerHTML =
      `Hallo, ich bin <strong>${name}</strong>! Lass uns gemeinsam ${name === 'Niko' ? 'lernen' : 'eine Geschichte erleben'}.`;
    // Bereich umschalten
    document.getElementById('niko-spiel').style.display = name === 'Niko' ? 'block' : 'none';
    document.getElementById('lumo-story').style.display = name === 'Lumo' ? 'block' : 'none';
  });
});

// --- Lernspiel mit Niko (Demo, kann per KI erweitert werden) ---
const fragen = [
  { frage: "Was kommt nach 2, 4, 6, 8?", loesung: "10" },
  { frage: "Was ist 3 + 5?", loesung: "8" },
  { frage: "Wie viel ist 7 - 2?", loesung: "5" },
  { frage: "Was ist die nächste Zahl: 5, 10, 15, ...?", loesung: "20" }
];
function neueFrage() {
  const aktuelleFrage = fragen[Math.floor(Math.random() * fragen.length)];
  document.getElementById('frage').textContent = aktuelleFrage.frage;
  document.getElementById('antwort').value = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('absenden').onclick = function() {
    const eingabe = document.getElementById('antwort').value.trim();
    if (eingabe === aktuelleFrage.loesung) {
      document.getElementById('feedback').textContent = "Niko sagt: Super! Das war richtig! 🎉";
      setTimeout(neueFrage, 1500);
    } else {
      document.getElementById('feedback').textContent = "Niko sagt: Versuch's nochmal!";
    }
  };
}
neueFrage();

// --- Geschichten mit Lumo (Demo, vorbereitet für KI) ---
document.getElementById('story-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const wunsch = document.getElementById('story-wunsch').value.trim();
  const ausgabe = document.getElementById('story-ausgabe');
  if (!wunsch) {
    ausgabe.textContent = "Bitte gib ein Thema für die Geschichte ein!";
    return;
  }
  ausgabe.textContent = "Lumo zaubert deine Geschichte...";
  // --- DEMO: Hier würde die KI-Antwort kommen ---
  // Für echte KI: Siehe unten
  setTimeout(() => {
    ausgabe.textContent = `Es war einmal... ${wunsch}. (Hier kann Lumo mit KI eine echte Geschichte erzählen!)`;
  }, 1200);
});

// --- Für echte KI (OpenAI) so einbauen: ---
// async function getStoryFromAI(prompt) {
//   const apiKey = "DEIN_OPENAI_API_KEY";
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + apiKey
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [{role: 'user', content: prompt}],
//       max_tokens: 400
//     })
//   });
//   const data = await response.json();
//   return data.choices && data.choices[0] ? data.choices[0].message.content : 'Fehler bei der KI-Antwort.';
// }
// // Dann im submit-Handler von story-form:
// // ausgabe.textContent = await getStoryFromAI(wunsch);

