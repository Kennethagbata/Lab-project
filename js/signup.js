document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("signUpEmail");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("signUpPassword");
    const signUpButton = document.querySelector(".btn-primary");
    const passwordSuggestions = document.querySelectorAll(".password-suggestions li");

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check password strength
    function checkPasswordStrength(password) {
        const hasMinLength = password.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return { hasMinLength, hasLetter, hasNumber };
    }

    // Function to update password strength UI
    function updatePasswordStrengthUI(password) {
        const { hasMinLength, hasLetter, hasNumber } = checkPasswordStrength(password);

        passwordSuggestions[0].querySelector("svg").setAttribute("stroke", hasMinLength ? "green" : "red");
        passwordSuggestions[1].querySelector("svg").setAttribute("stroke", hasLetter ? "green" : "red");
        passwordSuggestions[2].querySelector("svg").setAttribute("stroke", hasNumber ? "green" : "red");

        return hasMinLength && hasLetter && hasNumber;
    }

    // Function to validate the form
    function validateForm() {
        const isEmailValid = validateEmail(emailInput.value.trim());
        const isUsernameValid = usernameInput.value.trim() !== "";
        const isPasswordValid = updatePasswordStrengthUI(passwordInput.value.trim());

        if (!isEmailValid) {
            alert("Invalid email address. Please enter a valid email.");
            return false;
        }

        if (!isUsernameValid) {
            alert("Username is required.");
            return false;
        }

        if (!isPasswordValid) {
            alert("Password does not meet the requirements.");
            return false;
        }

        return true;
    }

    // Enable/disable signup button based on form validity
    function toggleSignUpButton() {
        const isEmailValid = validateEmail(emailInput.value.trim());
        const isUsernameValid = usernameInput.value.trim() !== "";
        const isPasswordValid = updatePasswordStrengthUI(passwordInput.value.trim());

        signUpButton.disabled = !(isEmailValid && isUsernameValid && isPasswordValid);
    }

    // Event listeners for input fields
    emailInput.addEventListener("input", toggleSignUpButton);
    usernameInput.addEventListener("input", toggleSignUpButton);
    passwordInput.addEventListener("input", toggleSignUpButton);

    // Signup button click event
    signUpButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        if (validateForm()) {
            alert("Signup successful!");
            // Here you can add code to submit the form data to a server
        }
    });
});