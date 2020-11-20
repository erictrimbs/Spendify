
const REGISTER_USERNAME_STORAGE_KEY = 'register_spendify_username';
const REGISTER_PASSWORD_STORAGE_KEY = 'register_spendify_password';

window.addEventListener('load', async () => {
    const storage = window.localStorage;
    const savedUsername = storage.getItem(REGISTER_USERNAME_STORAGE_KEY);
    const savedPassword = storage.getItem(REGISTER_PASSWORD_STORAGE_KEY);
    storage.removeItem(REGISTER_USERNAME_STORAGE_KEY);
    storage.removeItem(REGISTER_PASSWORD_STORAGE_KEY);

    const registrationFormEl = document.getElementById('registration-form');
    const realnameEl = document.getElementById('realname');
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const bankUsernameEl = document.getElementById('bank-username');
    const bankPasswordEl = document.getElementById('bank-password');
    const accountNumberEl = document.getElementById('account-number');
    const routingNumberEl = document.getElementById('routing-number');
    const addressEl = document.getElementById('address');
    const cityEl = document.getElementById('city');
    const stateEl = document.getElementById('state');
    const zipEl = document.getElementById('zip');

    if (savedUsername !== null) {
        usernameEl.value = savedUsername;
    }
    if (savedPassword !== null) {
        passwordEl.value = savedPassword;
    }

    document.getElementById('register').addEventListener('click', async () => {
        registrationFormEl.classList.add('was-validated');
        const isValid = registrationFormEl.checkValidity();
        console.log(`Registration form validity: ${isValid}`);
        if (isValid) {
            console.log('Sending request...');
            const response = await fetch('/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    realname: realnameEl.value,
                    username: usernameEl.value,
                    password: passwordEl.value,
                    bankUsername: bankUsernameEl.value,
                    bankPassword: bankPasswordEl.value,
                    accountNumber: accountNumberEl.value,
                    routingNumberEl: routingNumberEl.value,
                    address: addressEl.value,
                    city: cityEl.value,
                    state: stateEl.value,
                    zip: zipEl.value
                })
            });
            const feedback = await response.json();
            console.log(`Received response ${JSON.stringify(feedback)}`);
            if (feedback.error) {
                alert(feedback.message);
            } else {
                window.location.href = 'dashboard.html';
            }
        }
    });
});