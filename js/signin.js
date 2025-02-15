document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signInButton = document.querySelector(".btn-primary");
  const errorMessageDiv = document.getElementById("errorMessage");

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateEmail(email)) {
      errorMessageDiv.textContent = "Invalid email address.";
      errorMessageDiv.style.display = "block";
      return false;
    }

    if (password.length < 8) {
      errorMessageDiv.textContent = "Password must be at least 8 characters.";
      errorMessageDiv.style.display = "block";
      return false;
    }

    errorMessageDiv.style.display = "none";
    return true;
  }

  // 🔹 Create a "Processing..." message when the user clicks the sign in button
  const loadingMessage = document.createElement("p");
  loadingMessage.innerText = "Processing... Please wait.";
  loadingMessage.style.color = "blue";
  loadingMessage.style.display = "none"; // Initially hidden
  signInButton.parentNode.insertBefore(
    loadingMessage,
    signInButton.nextSibling
  );

  // Function to handle sign-in request
  function signIn() {
    if (!validateForm()) return;

    const signInData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    // 🔹 Show loading message & disable button
    loadingMessage.style.display = "block";
    signInButton.disabled = true;

    fetch("https://quiz-app-pg8t.onrender.com/users/signin", {
      // Replace with actual API
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signInData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          // 🔹 Store token & user data in sessionStorage
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user));

          alert("Sign-in successful! Redirecting...");
          window.location.href = "dashboard.html"; // Redirect to main page
        } else {
          errorMessageDiv.textContent =
            data.message || "Invalid credentials. Please try again.";
          errorMessageDiv.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Sign-in Error:", error);
        errorMessageDiv.textContent = "An error occurred. Please try again.";
        errorMessageDiv.style.display = "block";
      })
      .finally(() => {
        // 🔹 Hide loading message & re-enable button
        loadingMessage.style.display = "none";
        signInButton.disabled = false;
      });
  }

  signInButton.addEventListener("click", function (event) {
    event.preventDefault();
    signIn();
  });
});
