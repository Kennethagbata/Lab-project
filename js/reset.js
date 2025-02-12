document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const resetButton = document.querySelector(".btn-primary");
    const errorMessageDiv = document.createElement("div"); // Create a new div for error messages

    // Add styles to the error message div
    errorMessageDiv.style.backgroundColor = "#ffebee"; // Light red background
    errorMessageDiv.style.color = "#c62828"; // Dark red text
    errorMessageDiv.style.padding = "10px";
    errorMessageDiv.style.borderRadius = "4px";
    errorMessageDiv.style.marginBottom = "15px";
    errorMessageDiv.style.textAlign = "center";
    errorMessageDiv.style.display = "none"; // Hidden by default
    errorMessageDiv.style.width = "400px";

    // Insert the error message div above the form
    const formContainer = document.querySelector(".form-container");
    formContainer.insertBefore(errorMessageDiv, formContainer.firstChild);

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Reset button click event
    resetButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            errorMessageDiv.textContent = "Invalid email address. Please enter a valid email.";
            errorMessageDiv.style.display = "block"; // Show error message
        } else {
            errorMessageDiv.style.display = "none"; // Hide error message
            alert("Password reset instructions have been sent to your email.");
            // Here you can add code to send a password reset email
        }
    });
});