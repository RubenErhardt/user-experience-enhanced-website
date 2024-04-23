document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.clickable-image');
    const submitButton = document.getElementById('submit-button');
    
    images.forEach(image => {
        image.addEventListener('click', function() {
            console.log('Afbeelding geklikt');
            // Toggle de 'selected' klasse
            this.classList.toggle('selected');
        });
    });
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Voorkom dat het formulier standaardgedrag uitvoert
        const selectedImages = [];
        
        // Loop door alle afbeeldingen en controleer welke zijn geselecteerd
        images.forEach(image => {
            if (image.classList.contains('selected')) {
                // Voeg de URL van de geselecteerde afbeelding toe aan de lijst
                selectedImages.push(image.getAttribute('src'));
            }
        });
        
        console.log('Geselecteerde afbeeldingen:', selectedImages);
        fetch('/Vragenlijst', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedImages: selectedImages })
        })
        .then(response => {
            if (response.ok) {
                // Redirect de gebruiker naar de vragenlijstpagina
                window.location.href = '/Vragenlijst';
            } else {
                console.error('Er is een probleem opgetreden bij het verzenden van de gegevens');
            }
        })
        .catch(error => {
            console.error('Er is een fout opgetreden:', error);
        });
    });
});
