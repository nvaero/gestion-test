document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');

    // Remplacez les valeurs suivantes par vos propres identifiants pour la validation
    var correctUsername = 'admin';
    var correctPassword = 'password123';

    if (username === correctUsername && password === correctPassword) {
        // Redirigez vers la page principale
        window.location.href = 'main.html';
    } else {
        errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
});
