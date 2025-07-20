function checkPasswordStrength(password) {
    let strength = 0;
    let hasLetters = /[A-Za-z]/.test(password);
    let hasNumbers = /[0-9]/.test(password);
    let hasSymbols = /[^A-Za-z0-9]/.test(password);

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength++;   // Uppercase letters
    if (/[a-z]/.test(password)) strength++;   // Lowercase letters
    if (/[0-9]/.test(password)) strength++;   // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++;   // Special characters

    // Very strong condition: at least 12 characters and all three types
    if (password.length >= 12 && hasLetters && hasNumbers && hasSymbols) {
        return 4; // Indicate very strong
    }

    // Return strength: Weak (1), Moderate (2), Strong (3+)
    return strength;
}

function displayStrength(password) {
    const strength = checkPasswordStrength(password);
    let feedback = '';

    if (strength < 2) feedback = 'Weak';
    else if (strength === 2) feedback = 'Moderate';
    else if (strength > 2 && strength < 4) feedback = 'Strong';
    else feedback = 'Very Strong';

    // Update UI to show feedback
    const feedbackElement = document.getElementById('password-feedback');
    feedbackElement.textContent = ` ${feedback}`;

    // Apply color feedback
    feedbackElement.classList.remove('weak', 'moderate', 'strong', 'very-strong');
    if (strength < 2) feedbackElement.classList.add('weak');
    else if (strength === 2) feedbackElement.classList.add('moderate');
    else if (strength > 2 && strength < 4) feedbackElement.classList.add('strong');
    else feedbackElement.classList.add('very-strong');
}

function generatePassword(length = 12) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

function displayGeneratedPassword() {
    const lengthInput = document.getElementById('password-length');
    // Ensure the length is within the valid range
    const length = Math.min(Math.max(parseInt(lengthInput.value, 10) || 12, 12), 20);
    lengthInput.value = length; // Update the input field to the valid length
    const generatedPassword = generatePassword(length);
    document.getElementById('generated-password').textContent = generatedPassword;
    // Optionally, you could also display the strength of the generated password
    displayStrength(generatedPassword);
}