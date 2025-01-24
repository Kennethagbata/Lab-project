
// login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

// validate email and password.
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

// Check for empty fields
    if (!email || !password) {
        showAlert('Please fill in all fields.');
        return;
        }

 // Check for weak password
        if (!isStrongPassword(password)) {
            showAlert(
                'Your password must include at least 8 characters, a number, and a symbol.'
            );
            return;
        }

        // Simulate login validation
        if (email !== 'test@example.com' || password !== 'Password123!') {
            showAlert('Incorrect email or password.');
        } else {
            alert('Login successful!');
        }
    });
});

// Show Alert
function showAlert(message, type="error") {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger text-center';
    alert.textContent = message;
    document.body.prepend(alert);

    // Remove the alert after 3 seconds
    setTimeout(() => alert.remove(), 3000);
}

// Password Strength Checker
function isStrongPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}