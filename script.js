document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button and its corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Handle form submission
    const predictionForm = document.getElementById('prediction-form');
    const predictButton = document.getElementById('predict-button');
    const predictionValueDisplay = document.querySelector('.prediction-value');

    predictionForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        predictButton.disabled = true;
        predictButton.textContent = 'Predicting...';

        // Get form data
        const formData = new FormData(predictionForm);
        const inputs = Object.fromEntries(formData.entries());

        // Log inputs for debugging purposes
        console.log('User Inputs:', inputs);

        // ---
        // Placeholder for your AI/ML model integration
        // Here, you would send the 'inputs' data to your ML backend
        // For now, we'll simulate a prediction with a timeout
        // ---

        try {
            // Simulate API call delay
            const prediction = await new Promise(resolve => {
                setTimeout(() => {
                    // This is where you would get the actual prediction from your backend
                    // For this example, we'll generate a dummy value
                    const tempFactor = parseFloat(inputs.air_temperature) > 20 ? 1.2 : 0.8;
                    const sunshineFactor = parseFloat(inputs.sunshine) * 50;
                    const radiationFactor = parseFloat(inputs.radiation) * 0.5;
                    const dummyPrediction = (sunshineFactor + radiationFactor) * tempFactor;
                    
                    resolve(dummyPrediction.toFixed(2));
                }, 2000); // 2 seconds delay
            });

            // Display the result
            predictionValueDisplay.textContent = `${prediction} kW`;

            // Switch to the result tab
            document.querySelector('.tab-button[data-tab="result"]').click();

        } catch (error) {
            console.error('Prediction failed:', error);
            predictionValueDisplay.textContent = 'Error';
            alert('Prediction failed. Please try again.');
        } finally {
            // Re-enable the button
            predictButton.disabled = false;
            predictButton.textContent = 'Predict Generation';
        }
    });

    // Dropdown functionality for team members
    const teamNameBtn = document.getElementById('team-name-btn');
    const dropdownMenu = document.getElementById('team-dropdown');

    teamNameBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the document click event from firing
        dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target) && !teamNameBtn.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});