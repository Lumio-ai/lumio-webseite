document.querySelectorAll('.avatar').forEach(avatar => {
  avatar.addEventListener('click', function() {
    document.querySelectorAll('.avatar').forEach(a => a.classList.remove('selected'));
    this.classList.add('selected');
    document.getElementById('selected-avatar').innerHTML =
      `<p>Du hast <strong>${this.dataset.name}</strong> als Avatar gewählt!</p>`;
  });
});
