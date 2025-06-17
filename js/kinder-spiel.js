const fragen = [
  { frage: "Was kommt nach 2, 4, 6, 8?", loesung: 10 },
  { frage: "Was ist 3 + 5?", loesung: 8 },
  { frage: "Wie viel ist 7 - 2?", loesung: 5 },
  { frage: "Was ist die nächste Zahl: 5, 10, 15, ...?", loesung: 20 }
];
let aktuelleFrage = 0;
function neueFrage() {
  aktuelleFrage = Math.floor(Math.random() * fragen.length);
  document.getElementById('frage').textContent = fragen[aktuelleFrage].frage;
  document.getElementById('antwort').value = '';
  document.getElementById('feedback').textContent = '';
}
document.getElementById('absenden').onclick = function() {
  const eingabe = parseInt(document.getElementById('antwort').value, 10);
  const avatar = document.querySelector('.avatar.selected span')?.textContent || "Niko";
  if (eingabe === fragen[aktuelleFrage].loesung) {
    document.getElementById('feedback').textContent = `${avatar} sagt: Super! Das war richtig! 🎉`;
    setTimeout(neueFrage, 1500);
  } else {
    document.getElementById('feedback').textContent = `${avatar} sagt: Versuch's nochmal!`;
  }
};
window.onload = neueFrage;
