const arrowIcon = document.getElementById('arrowIcon');
const sidePanel = document.getElementById('sidePanel');

arrowIcon.addEventListener('click', () => {
    if (sidePanel.style.right === '0px') {
        sidePanel.style.right = '-250px'; // Hide the panel
        arrowIcon.innerHTML = '&gt;'; // Pointing right
    } else {
        sidePanel.style.right = '0px'; // Show the panel
        arrowIcon.innerHTML = '&lt;'; // Pointing left
    }
});

// Overlay

// Get references to the overlay and the create button
const overlay = document.getElementById('overlay');
const createButton = document.getElementById('createButton');

// Function to close the overlay and enable the main page
function closeOverlay() {
    overlay.style.display = 'none'; // Hide the overlay
    input.disabled = false; // Enable the input field
}

// Check if an image is stored in localStorage
window.onload = () => {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const imgElement = document.getElementById('uploaded-image');
        imgElement.src = uploadedImage;
        imgElement.style.display = 'block'; // Show the image
    }
};

// Add a click event listener to the create button
createButton.addEventListener('click', closeOverlay);


// Function to redirect to the upload page
function redirectToUploadPage() {
    window.location.href = '/pages/uploadImg.html';
}

// Check if an image is stored in localStorage
const storedImage = localStorage.getItem('selectedImage');
const displayImage = document.getElementById('display-image');

if (storedImage) {
    // Display the stored image
    displayImage.src = storedImage;
    displayImage.style.cursor = 'default'; // Change cursor to default (non-clickable)
} else {
    // Revert to the default logo
    displayImage.src = '/Assests/Frame 184.png';
    displayImage.style.cursor = 'pointer'; // Change cursor to pointer (clickable)
}

// Clear the stored image on page refresh
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('selectedImage');
});

console.log('Stored Image:', localStorage.getItem('selectedImage'));

// inputs for check boxes
// function enableEdit() {
//     const inputField = document.getElementById('userInput');
//     if (inputField.disabled) {
//       inputField.disabled = false;
//       inputField.focus();
  
//       inputField.addEventListener('blur', () => {
//         localStorage.setItem('savedText', inputField.value);
//         inputField.disabled = true;
//       });
//     }
//   }
//   // Load saved state on page load
//   window.onload = () => {
//     const savedText = localStorage.getItem('savedText');
  
//     if (savedText) {
//       document.getElementById('userInput').value = savedText;
//     }
//   };
  
function enableEdit(inputId) {
    const inputField = document.getElementById(inputId);
    if (inputField.disabled) {
        inputField.disabled = false;
        inputField.focus();

        inputField.addEventListener('blur', () => {
            localStorage.setItem(inputId, inputField.value); // Save the value to localStorage
            inputField.disabled = true; // Disable the input field after editing
        });
    }
}

// Load saved state on page load
window.onload = () => {
    const inputIds = ['userInput1', 'userInput2', 'userInput3', 'userInput4'];
    inputIds.forEach((id) => {
        const savedText = localStorage.getItem(id);
        if (savedText) {
            document.getElementById(id).value = savedText;
        }
    });
};


// panel dropdown

 // Function to toggle dropdown open/close
        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            dropdown.classList.toggle('open');
        }

        // Function to select an option
        // function selectOption(option, dropdownId) {
        //     const selectedOption = document.getElementById(`selected-option${dropdownId.slice(-1)}`);
        //     selectedOption.textContent = option;

        //     // Hide all ticks
        //     document.querySelectorAll(`#${dropdownId} .tick`).forEach(tick => {
        //         tick.style.display = 'none';
        //     });

        //     // Show tick for the selected option
        //     const selectedTick = document.getElementById(`tick-${option.split(' ')[1]}-${dropdownId}`);
        //     selectedTick.style.display = 'inline';

        //     // Close the dropdown
        //     toggleDropdown(dropdownId);
        // }

        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            dropdown.classList.toggle('open');
        }
        
        // Function to select an option
        function selectOption(optionText, dropdownId) {
            const selectedOption = document.querySelector(`#${dropdownId} .dropdown-button span:first-child`);
            selectedOption.textContent = optionText;
        
            // Hide all ticks in the current dropdown
            document.querySelectorAll(`#${dropdownId} .tick`).forEach(tick => {
                tick.style.display = 'none';
            });
        
            // Find the selected option and show its tick
            const options = document.querySelectorAll(`#${dropdownId} .dropdown-options div`);
            options.forEach((option, index) => {
                if (option.textContent.trim().startsWith(optionText)) {
                    const tick = option.querySelector('.tick');
                    if (tick) {
                        tick.style.display = 'inline';
                    }
                }
            });
        
            // Close the dropdown after selecting
            toggleDropdown(dropdownId);
        }
           