let activeOption = null;

// Function to set the active option
function setActiveOption(option) {
    // Remove active class from all options
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('active');
    });

    // Add active class to the clicked option
    activeOption = option;
    const activeElement = document.getElementById(`${option}-option`);
    if (activeElement) {
        activeElement.classList.add('active');
    }

    // Show the button container
    const buttonContainer = document.getElementById('button-container');
    if (buttonContainer) {
        buttonContainer.style.display = 'flex';
    }
}

// Handle Button Click
document.getElementById('action-button').addEventListener('click', () => {
    switch (activeOption) {
        case 'upload':
            document.getElementById('upload-input').click(); // Open file dialog
            break;
        case 'camera':
            accessCamera(); // Access camera
            break;
        case 'use-photo':
            document.getElementById('upload-input').click(); // Open file dialog
            break;
        case 'google-search':
            searchGoogleImages(); // Search Google Images
            break;
        default:
            alert('Please select an option first.');
    }
});

// Access Camera
async function accessCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        // Capture image from camera
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        localStorage.setItem('selectedImage', imageDataUrl); // Store image in localStorage
        window.location.href = '/pages/pageOne.html'; // Redirect back to the initial page
    } catch (error) {
        alert('Error accessing camera: ' + error.message);
    }
}

// Handle File Upload
document.getElementById('upload-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            localStorage.setItem('selectedImage', imageDataUrl); // Store image in localStorage
            window.location.href = '/pages/pageOne.html'; // Redirect back to the initial page
        };
        reader.readAsDataURL(file);
    }
});

// Search Google Images
function searchGoogleImages() {
    window.open('https://images.google.com', '_blank');
}