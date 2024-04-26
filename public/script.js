document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.clickable-image');
    const submitButton = document.getElementById('submit-button');
    const sliders = document.querySelectorAll('.slider');
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const sdgButton = document.getElementById('sdgButton');
    const sdgSection = document.getElementById('SDG-pagina');
    const customAlert = document.getElementById('customAlert');

    // Hide the second part of the page initially
    sdgSection.style.display = 'none';

    // Voeg event listeners toe aan de radio buttons
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('click', function() {
        });
    });

    // Voeg event listener toe aan de afbeeldingen
    images.forEach(image => {
        image.addEventListener('click', function() {
            // Toggle de 'selected' klasse
            this.classList.toggle('selected');
        });
    });

    // Voeg event listener toe aan de submit button
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
                else {
                    console.error('Er is een fout opgetreden bij het verwerken van de POST-request');
                }
            });
    });

    // Voeg event listener toe aan de SDG button
    sdgButton.addEventListener('click', function(event) {
        // Prevent default behavior (scrolling to anchor)
        event.preventDefault();
    
        // Check if a radio button is selected
        const selectedRadioButton = document.querySelector('input[type="radio"]:checked');
        if (selectedRadioButton) {
            // Display the second part of the page
            sdgSection.style.display = 'block';
    
            // Scroll to the SDG's section
            sdgSection.scrollIntoView({ behavior: 'smooth' });
    
            // Hide the custom alert after a delay
            setTimeout(function() {
                customAlert.style.display = 'none';
            }, 3000); // Adjust the delay (in milliseconds) as needed
        } else {
            // Show the custom alert
            customAlert.style.display = 'block';
    
            // Scroll to the top of the page to make the alert visible
            window.scrollTo(0, 0);
    
            // Hide the custom alert after a delay
            setTimeout(function() {
                customAlert.style.display = 'none';
            }, 3000); // Adjust the delay (in milliseconds) as needed
        }
    });
});
