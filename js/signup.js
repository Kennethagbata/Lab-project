document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("signUpEmail");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("signUpPassword");
  const signUpButton = document.querySelector(".btn-primary");
  const passwordSuggestions = document.querySelectorAll(
    ".password-suggestions li"
  );

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
    const { hasMinLength, hasLetter, hasNumber } =
      checkPasswordStrength(password);

    passwordSuggestions[0]
      .querySelector("svg")
      .setAttribute("stroke", hasMinLength ? "green" : "red");
    passwordSuggestions[1]
      .querySelector("svg")
      .setAttribute("stroke", hasLetter ? "green" : "red");
    passwordSuggestions[2]
      .querySelector("svg")
      .setAttribute("stroke", hasNumber ? "green" : "red");

    return hasMinLength && hasLetter && hasNumber;
  }

  // Function to validate the form
  function validateForm() {
    const isEmailValid = validateEmail(emailInput.value.trim());
    const isUsernameValid = usernameInput.value.trim() !== "";
    const isPasswordValid = updatePasswordStrengthUI(
      passwordInput.value.trim()
    );

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
    const isPasswordValid = updatePasswordStrengthUI(
      passwordInput.value.trim()
    );

    signUpButton.disabled = !(
      isEmailValid &&
      isUsernameValid &&
      isPasswordValid
    );
  }

  // Event listeners for input fields
  emailInput.addEventListener("input", toggleSignUpButton);
  usernameInput.addEventListener("input", toggleSignUpButton);
  passwordInput.addEventListener("input", toggleSignUpButton);

  //Integrating sign up functionality
  const loadingMessage = document.createElement("p"); // Create loading message element

  loadingMessage.innerText = "Processing... Please wait.";
  loadingMessage.style.color = "blue";
  loadingMessage.style.display = "none"; // Initially hidden
  signUpButton.parentNode.insertBefore(
    loadingMessage,
    signUpButton.nextSibling
  );

  // Function to handle sign-up request
  function signUp() {
    if (!validateForm()) return;

    const signUpData = {
      email: emailInput.value.trim(),
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    // 🔹 Show loading message and disable button
    loadingMessage.style.display = "block";
    signUpButton.disabled = true;

    fetch("https://quiz-app-pg8t.onrender.com/users/signup", {
      // Replace with actual backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Store token & user data in sessionStorage
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user info

          alert("Signup successful! Redirecting to main page...");
          window.location.href = "dashboard.html"; // Redirect after signup
        } else {
          alert(data.message || "Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        // 🔹 Hide loading message and re-enable button
        loadingMessage.style.display = "none";
        signUpButton.disabled = false;
      });
  }

  // Signup button click event
  signUpButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    signUp();
  });
});
