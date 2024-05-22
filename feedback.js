const feedbackItems = document.querySelectorAll('.feedback-item');

feedbackItems.forEach(item => {
    const greenCheckbox = item.querySelector('.green-checkbox');
    const redCheckbox = item.querySelector('.red-checkbox');

    redCheckbox.addEventListener('change', function() {
        if (redCheckbox.checked) {
            item.querySelector('.comment').style.display = 'block';
            greenCheckbox.checked = false; // Désactive la case verte si la rouge est cochée
        } else {
            item.querySelector('.comment').style.display = 'none';
        }
    });

    greenCheckbox.addEventListener('change', function() {
        if (greenCheckbox.checked) {
            redCheckbox.checked = false; // Désactive la case rouge si la verte est cochée
        }
    });
});

const validateButton = document.getElementById('validate-button');

validateButton.addEventListener('click', function() {
    let allChecked = true;
    feedbackItems.forEach(item => {
        const greenCheckbox = item.querySelector('.green-checkbox');
        const redCheckbox = item.querySelector('.red-checkbox');
        if (!greenCheckbox.checked && !redCheckbox.checked) {
            allChecked = false;
        }
    });
    if (!allChecked) {
        alert("Veuillez cocher toutes les cases avant de valider.");
    } else {
        const confirmation = confirm("Êtes-vous sûr de vouloir valider ?");
        if (confirmation) {
            generateSummaryPage();
        }
    }
});

function generateSummaryPage() {
    const summary = document.createElement('div');
    summary.innerHTML = '<h1>Récapitulatif du feedback</h1>';
    feedbackItems.forEach((item, index) => {
        const greenCheckbox = item.querySelector('.green-checkbox');
        const redCheckbox = item.querySelector('.red-checkbox');
        const comment = item.querySelector('.comment-text').value;
        const date = document.getElementById(`date${index + 1}`).value;
        const time = document.getElementById(`time${index + 1}`).value;
        summary.innerHTML += `
            <div>
                <p><strong>Feedback ${index + 1}:</strong></p>
                <p>Texte: ${item.querySelector('.text').textContent}</p>
                <p>Coché vert: ${greenCheckbox.checked}</p>
                <p>Coché rouge: ${redCheckbox.checked}</p>
                <p>Commentaire: ${comment}</p>
                <p>Date: ${date}</p>
                <p>Heure: ${time}</p>
            </div>
        `;
    });
    const printButton = document.createElement('button');
    printButton.textContent = 'Imprimer';
    printButton.addEventListener('click', function() {
        window.print();
    });
    summary.appendChild(printButton);
    
    // Affiche le récapitulatif dans une boîte de dialogue modale
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = '<div class="modal-content"></div>';
    modal.querySelector('.modal-content').appendChild(summary);
    document.body.appendChild(modal);

    // Affiche la boîte de dialogue modale
    modal.style.display = 'block';

    // Ferme la boîte de dialogue modale lorsque l'utilisateur clique en dehors de celle-ci
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
