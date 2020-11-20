// localStorage keys
const USERNAME_STORAGE_KEY = 'spendify_username';
const PASSWORD_STORAGE_KEY = 'spendify_password';
const REMEMBER_STORAGE_KEY = 'spendify_remember';

async function login(username, password) {
    const response = await fetch('/loginUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username, password })
    });
    return await response.json();
}

window.addEventListener('load', async () => {
    const storage = window.localStorage;

    const loginFormEl = document.getElementById('login-form');
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const rememberEl = document.getElementById('remember');

    // Restore saved username, password, and remember me checkmark
    const savedUsername = storage.getItem(USERNAME_STORAGE_KEY);
    const savedPassword = storage.getItem(PASSWORD_STORAGE_KEY);
    const savedRemember = storage.getItem(REMEMBER_STORAGE_KEY);
    if (savedUsername !== null) {
        usernameEl.value = savedUsername;
    }
    if (savedPassword !== null) {
        passwordEl.value = savedPassword;
    }
    if (savedRemember !== null) {
        rememberEl.checked = Boolean(savedRemember);
    }

    function rememberMe() {
        storage.setItem(REMEMBER_STORAGE_KEY, rememberEl.checked);
        if (rememberEl.checked) {
            storage.setItem(USERNAME_STORAGE_KEY, usernameEl.value);
            storage.setItem(PASSWORD_STORAGE_KEY, passwordEl.value);
        } else {
            storage.removeItem(PASSWORD_STORAGE_KEY);
        }
    }

    document.getElementById('login').addEventListener('click', async () => {
        loginFormEl.classList.add('was-validated');
        if (loginFormEl.checkValidity()) {
            const feedback = await login(usernameEl.value, passwordEl.value);
            if (feedback.error) {
                alert(feedback.message);
            } else {
                console.log(feedback);
                rememberMe();
                window.location.href = 'dashboard.html';
            }
        }
    });

    document.getElementById('register').addEventListener('click', () => {
        loginFormEl.classList.add('was-validated');
        if (loginFormEl.checkValidity()) {
            rememberMe();
            storage.setItem('register_spendify_username', usernameEl.value);
            window.location.href = 'register.html';
        }
    });
});