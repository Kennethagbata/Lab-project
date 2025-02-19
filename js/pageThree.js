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