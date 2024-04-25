document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.clickable-image');
    const submitButton = document.getElementById('submit-button');
    let selectedImages = []; // Declaring selectedImages here
    
    images.forEach(image => {
        image.addEventListener('click', function() {
            // Toggle de 'selected' klasse
            this.classList.toggle('selected');
        });
    });
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Voorkom dat het formulier standaardgedrag uitvoert
        
        // Reset selectedImages before processing
        selectedImages = [];
        
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
                // Redirect de gebruiker naar de vragenlijstpagina met de geselecteerde afbeeldingen als queryparameters
                window.location.href = '/Vragenlijst?selectedImages=' + encodeURIComponent(JSON.stringify(selectedImages));
            }
            // Voeg eventueel anders logica toe voor het geval de POST-request niet succesvol is
            // bijvoorbeeld: toon een foutmelding aan de gebruiker
            else {
                console.error('Er is een fout opgetreden bij het verwerken van de POST-request');
            }
        });
        
    });
});


