document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInButton = document.querySelector(".btn-primary");
    const errorMessageDiv = document.getElementById("errorMessage");

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check password strength (same as signup page)
    function checkPasswordStrength(password) {
        const hasMinLength = password.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return hasMinLength && hasLetter && hasNumber;
    }

    // Function to validate the form
    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate email
        if (!validateEmail(email)) {
            errorMessageDiv.textContent = "Invalid email address.";
            errorMessageDiv.style.display = "block";
            return false;
        }

        // Validate password
        if (!checkPasswordStrength(password)) {
            errorMessageDiv.textContent = "Invalid password.";
            errorMessageDiv.style.display = "block";
            return false;
        }

        // Clear error message if everything is valid
        errorMessageDiv.style.display = "none";
        return true;
    }

    // Sign-in button click event
    signInButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        if (validateForm()) {
            // Simulate successful login (replace with actual login logic)
            alert("Sign-in successful!");
            // Redirect to another page or perform other actions
        }
    });
});