// Right side bar
const arrowIcon = document.getElementById('arrowIcon');
const sidePanel = document.getElementById('sidePanel');
const themesButtonNavbar = document.querySelector('.navbar .themes'); // Themes button in the navbar
const themesButtonSidebar = document.querySelector('.side-panel .themes'); // Themes button in the sidebar

function toggleSidebar() {
    if (sidePanel.style.right === '0px') {
        sidePanel.style.right = '-250px'; // Hide the panel
        arrowIcon.innerHTML = '&gt;'; // Pointing right
    } else {
        sidePanel.style.right = '0px'; // Show the panel
        arrowIcon.innerHTML = '&lt;'; // Pointing left
    }
}
arrowIcon.addEventListener('click', toggleSidebar);
themesButtonNavbar.addEventListener('click', toggleSidebar);
themesButtonSidebar.addEventListener('click', toggleSidebar);

// Check-box to pick the correct answer
document.addEventListener('DOMContentLoaded', function () {
    // Get all the checkboxes
    const checkboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');

    // Add event listeners to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            // If the current checkbox is checked, uncheck all other checkboxes
            if (this.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});


// Overlay
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
        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            dropdown.classList.toggle('open');
        }

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
    

        // pop work


        // script.js




document.addEventListener('DOMContentLoaded', function () {
    const leftPanel = document.getElementById('leftPanel');
    const mainContent = document.getElementById('mainContent');
    const popup = document.getElementById('popup');
    const confirmationPopup = document.getElementById('confirmationPopup');
    const addBtn = document.getElementById('addBtn');
    const findBtn = document.getElementById('findBtn');
    const searchBox = document.getElementById('searchBox');
    const addQuizBtn = document.getElementById('addQuizBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const arrowIcon = document.getElementById('arrowIcon');
    const sidePanel = document.getElementById('sidePanel');

    let currentQuizIndex = 0;
    let quizzes = [];

    // Function to add a new quiz section
    function addQuizSection() {
        currentQuizIndex++;
        const quizSection = document.createElement('div');
        quizSection.className = 'quiz-section';
        quizSection.innerHTML = `
            <div style="padding-top: 13px; padding-left: 40px; padding-bottom: 5px; background-color: #EAF4FD; width: 100%">
                <h3 style="font-size: x-small; margin-bottom: 1px; font-weight: bold;">Quiz ${currentQuizIndex}</h3>
                <img style="width: 75%;" src="/Assests/Frame 199.png" alt="quiznum"> <br>
            </div>
            ${currentQuizIndex > 0 ? `<button class="delete-quiz-btn"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg></button>` : ''}
            <button class="add-question-btn" style="font-size: x-small; background-color: #5a0b4d; color: white; margin-top: 5px; border-radius: 3px;">Add question</button>
        `;
        leftPanel.appendChild(quizSection);

        // Add event listeners to the new buttons
        quizSection.querySelector('.add-question-btn').addEventListener('click', showPopup);
        if (currentQuizIndex > 0) {
            quizSection.querySelector('.delete-quiz-btn').addEventListener('click', showConfirmationPopup);
        }
    }

    // Function to show the popup
    function showPopup() {
        popup.style.display = 'block';
    }

    // Function to hide the popup
    function hidePopup() {
        popup.style.display = 'none';
    }

    // Function to show the confirmation popup
    function showConfirmationPopup() {
        confirmationPopup.style.display = 'block';
    }

    // Function to hide the confirmation popup
    function hideConfirmationPopup() {
        confirmationPopup.style.display = 'none';
    }

    // Event listeners for the popup buttons
    addBtn.addEventListener('click', function () {
        searchBox.style.display = 'none';
        addQuizBtn.style.display = 'block';
    });

    findBtn.addEventListener('click', function () {
        searchBox.style.display = 'block';
        addQuizBtn.style.display = 'none';
    });

    addQuizBtn.addEventListener('click', function () {
        hidePopup();
        addQuizSection();
        // Redirect to the main quiz creation page
        mainContent.innerHTML = `
            <div style="justify-content: center; align-items: center; display: flex; margin-top: 10px;">
                <input type="title" style="font-size: smaller; height: 35px; width: 800px; text-align: center; outline: 5px;" id="type2" placeholder="Start typing your question">
            </div>
            <div>
                <a id="herf" href="./uploadImg.html" alt="logo">
                    <img id="display-image" src="/Assests/Frame 184.png" alt="logo" class="logo" onclick="redirectToUploadPage()">
                </a>
            </div>
            <div>
                <!-- Answer 1 -->
                <div style="display: flex; gap: 20px; justify-content: center;">
                    <div class="input-container" style="background-color: #6AA6D1; display: flex; align-items: center; width: 400px; height: 44px; margin-top: 20px;">
                        <div style="background-color: #0A4975; width: 10px; height: 44px; margin-left: 10px"></div>
                        <input type="text" class="input2" id="userInput1" placeholder="Add answer 1" enabled>
                        <label class="custom-checkbox">
                            <input type="checkbox" class="answer-checkbox">
                            <span class="checkmark">✔</span>
                        </label>
                    </div>
                    <div class="input-container" style="background-color: #EBC3C3; display: flex; align-items: center; width: 400px; height: 44px; margin-top: 20px;">
                        <div style="background-color: #B71010; width: 10px; height: 44px; margin-left: 10px"></div>
                        <input type="text" class="input3" id="userInput2" placeholder="Add answer 2" enabled>
                        <label class="custom-checkbox">
                            <input type="checkbox" class="answer-checkbox">
                            <span class="checkmark">✔</span>
                        </label>
                    </div>
                </div>
                <!-- Answer 3 -->
                <div style="display: flex; gap: 20px; justify-content: center;">
                    <div class="input-container" style="background-color: #F0C1E8; display: flex; align-items: center; width: 400px; height: 44px; margin-top: 20px;">
                        <div style="background-color: #752C69; width: 10px; height: 44px; margin-left: 10px"></div>
                        <input type="text" class="input4" id="userInput3" placeholder="Add answer 3 (optional)" enabled>
                        <label class="custom-checkbox">
                            <input type="checkbox" class="answer-checkbox">
                            <span class="checkmark">✔</span>
                        </label>
                    </div>
                    <div class="input-container" style="background-color: #E4FDEC; display: flex; align-items: center; width: 400px; height: 44px; margin-top: 20px;">
                        <div style="background-color: green; width: 10px; height: 44px; margin-left: 10px"></div>
                        <input type="text" class="inputi" id="userInput4" placeholder="Add answer 4 (optional)" enabled>
                        <label class="custom-checkbox">
                            <input type="checkbox" class="answer-checkbox">
                            <span class="checkmark">✔</span>
                        </label>
                    </div>
                </div>
            </div>
            <!-- Side panel Right -->
            <div class="side-panel" id="sidePanel">
                <nav class="nav2">
                    <div>
                        <button class="themes" id="themes" style="height: 32px; font-size: small; border-radius: 3px; margin-right: 16px; background-color: #5a0b4d; width: 75px; border-width: 1px;">
                            <a href="#" style="color: white; text-decoration: none;">Themes</a>
                        </button>
                        <button class="save" style="height: 32px; font-size: small; border-radius: 3px; background-color: white; color: #5a0b4d; border-color: rgb(172, 171, 171); width: 75px; border-width: 1px;">
                            <a href="#" style="color: #5a0b4d; text-decoration: none;">Save</a>
                        </button>
                    </div>
                </nav>
                <div>
                    <h1 style="font-size: smaller; margin-top: 20px; margin-left: 20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg> Time
                    </h1>
                    <div class="dropdown" id="dropdown">
                        <div class="dropdown-button" onclick="toggleDropdown('dropdown')">
                            <span id="selected-option">Select an option</span>
                            <span class="dropdown-arrow">V</span>
                        </div>
                        <div class="dropdown-options">
                            <div onclick="selectOption('5 seconds', 'dropdown')">5 seconds<span class="tick" id="tick-1">✔</span></div>
                            <div onclick="selectOption('10 seconds', 'dropdown')">10 seconds<span class="tick" id="tick-2">✔</span></div>
                            <div onclick="selectOption('20 seconds', 'dropdown')">20 seconds<span class="tick" id="tick-3">✔</span></div>
                            <div onclick="selectOption('30 seconds', 'dropdown')">30 seconds<span class="tick" id="tick-4">✔</span></div>
                            <div onclick="selectOption('45 seconds', 'dropdown')">45 seconds<span class="tick" id="tick-5">✔</span></div>
                            <div onclick="selectOption('1 minute', 'dropdown')">1 minute<span class="tick" id="tick-6">✔</span></div>
                            <div onclick="selectOption('1 minute 30 seconds', 'dropdown')">1 minute 30 seconds<span class="tick" id="tick-7">✔</span></div>
                            <div onclick="selectOption('2 minutes', 'dropdown')">2 minutes<span class="tick" id="tick-8">✔</span></div>
                            <div onclick="selectOption('3 minutes', 'dropdown')">3 minutes<span class="tick" id="tick-9">✔</span></div>
                            <div onclick="selectOption('5 minutes', 'dropdown')">5 minutes<span class="tick" id="tick-10">✔</span></div>
                        </div>
                    </div>
                    <h1 style="font-size: smaller; margin-top: 20px; margin-left: 20px;">
                        <img style="width: 13px; height: 13px;" src="/Assests/tabler_pentagon-number-0.png"> Points
                    </h1>
                    <div class="dropdown" id="dropdown2">
                        <div class="dropdown-button" onclick="toggleDropdown('dropdown2')">
                            <span id="selected-option2">Select an option</span>
                            <span class="dropdown-arrow">V</span>
                        </div>
                        <div class="dropdown-options">
                            <div onclick="selectOption('Standard', 'dropdown2')">Standard<br>Award correct answers with the normal<br>amount of points<span class="tick" id="tick-1">✔</span></div>
                            <div onclick="selectOption('Double points', 'dropdown2')">Double point<br>Give twice as many points for correct<br>answers<span class="tick" id="tick-2">✔</span></div>
                            <div onclick="selectOption('No points', 'dropdown2')">No points<br>Lower the stakes of the questions<br>and remove the points<span class="tick" id="tick-3">✔</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Side expand arrow -->
            <div class="arrow-icon" id="arrowIcon">&gt;</div>
        `;

        // Reattach event listeners for the side panel toggle
        const newArrowIcon = mainContent.querySelector('#arrowIcon');
        const newSidePanel = mainContent.querySelector('#sidePanel');
        const themesButton = mainContent.querySelector('#themes');

        const toggleSidePanel = () => {
            if (newSidePanel.style.right === '0px') {
                newSidePanel.style.right = '-250px'; // Hide the panel
                newArrowIcon.innerHTML = '&gt;'; // Pointing right
            } else {
                newSidePanel.style.right = '0px'; // Show the panel
                newArrowIcon.innerHTML = '&lt;'; // Pointing left
            }
        };

        // Add event listener to the arrow icon
        newArrowIcon.addEventListener('click', toggleSidePanel);

        // Add event listener to the Themes button
        themesButton.addEventListener('click', toggleSidePanel);

        // Add event listeners to the checkboxes for hover and click effects
        const checkboxes = mainContent.querySelectorAll('.custom-checkbox', '.checkmark');
        checkboxes.forEach(checkbox => {
            const checkmark = checkbox.nextElementSibling;

            // Add hover effect to display tooltip
                checkbox.addEventListener('mouseover', function () {
                checkmark.setAttribute('title', 'Mark correct answer');
            });

            // Change color to green when clicked
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    checkmark.style.color = 'green'; // Change tick color to green
                    checkbox.style.accentColor = 'green'; // Change checkbox color to green
                } else {
                    checkmark.style.color = ''; // Reset tick color
                    checkbox.style.accentColor = ''; // Reset checkbox color
                }
            });
        });
    });

    confirmDeleteBtn.addEventListener('click', function () {
        hideConfirmationPopup();
        // Remove the quiz section
        const quizSection = document.querySelector('.quiz-section:last-child');
        if (quizSection) {
            quizSection.remove();
        }
    });

    cancelDeleteBtn.addEventListener('click', hideConfirmationPopup);

    // Initial event listeners
    document.querySelector('.add-question-btn').addEventListener('click', showPopup);
    document.querySelector('.delete-quiz-btn').addEventListener('click', showConfirmationPopup);
});

// Btn Coloration for popup
const addBtn = document.getElementById('addBtn');
const findBtn = document.getElementById('findBtn');

function toggleButton(activeButton, otherButton) {
  activeButton.style.backgroundColor = 'grey';
  activeButton.style.color = 'white';
  otherButton.style.backgroundColor = 'white';
  otherButton.style.color = 'black';
}

addBtn.addEventListener('click', () => toggleButton(addBtn, findBtn));
findBtn.addEventListener('click', () => toggleButton(findBtn, addBtn));