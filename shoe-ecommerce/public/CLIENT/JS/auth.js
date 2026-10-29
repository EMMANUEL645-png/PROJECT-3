const getUsers = () => JSON.parse(localStorage.getItem('userInfo')) || [];

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem('currentUser')) ||
  JSON.parse(sessionStorage.getItem('currentUser'));

const logOut = () => {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
};

const namePattern = /^[A-Za-z ]{3,40}$/;           // letters and spaces, 3 to 40 characters
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // something@something.something
const hasLetter = /[A-Za-z]/;                      // at least one letter
const hasNumber = /[0-9]/;                         // at least one number
const longEnough = /^.{8,}$/;                      // at least 8 characters

const checkPassword = (pass) => {
  if (!longEnough.test(pass)) return 'Password must be at least 8 characters long.';
  if (!hasLetter.test(pass) || !hasNumber.test(pass)) {
    return 'Password must contain at least one letter and one number.';
  }
  return '';
};

const showFieldError = (input, message) => {
  const error = input.closest('.form-group').querySelector('.form-error');
  input.classList.add('is-invalid');
  if (error) {
    error.textContent = message;
    error.hidden = false;
  }
};

const clearFieldError = (input) => {
  const group = input.closest('.form-group');
  const error = group ? group.querySelector('.form-error') : null;
  input.classList.remove('is-invalid');
  if (error) error.hidden = true;
};

const clearAllErrors = (form) => {
  form.querySelectorAll('.form-input').forEach(clearFieldError);
  const box = document.getElementById('auth-message');
  if (box) box.hidden = true;
};

const showMessage = (text, type) => {
  const box = document.getElementById('auth-message');
  if (!box) return;
  box.textContent = text;
  box.className = 'auth-message auth-message--' + type;
  box.hidden = false;
};

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

if ((signupForm || loginForm) && getCurrentUser()) {
  window.location.href = 'index.html';
}

document.querySelectorAll('.form-input').forEach((input) => {
  input.addEventListener('input', () => clearFieldError(input));
});

document.querySelectorAll('.js-toggle-password').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.closest('.password-input-wrapper').querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(signupForm);

    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passInput = document.getElementById('signup-password');
    const confirmInput = document.getElementById('signup-confirm-password');

    const name = nameInput.value.trim();
    const mail = emailInput.value.trim().toLowerCase();
    const pass = passInput.value;
    const confirm = confirmInput.value;
    let valid = true;

    if (!namePattern.test(name)) {
      showFieldError(nameInput, 'Enter your full name (letters only, at least 3 characters).');
      valid = false;
    }
    if (!emailPattern.test(mail)) {
      showFieldError(emailInput, 'Please provide a valid email address.');
      valid = false;
    }
    const passError = checkPassword(pass);
    if (passError) {
      showFieldError(passInput, passError);
      valid = false;
    }
    if (confirm !== pass) {
      showFieldError(confirmInput, 'Passwords must match.');
      valid = false;
    }
    if (!document.getElementById('terms-agree').checked) {
      showMessage('Please agree to the Terms & Conditions to continue.', 'error');
      valid = false;
    }
    if (!valid) return;

    const users = getUsers();
    if (users.some((user) => user.mail === mail)) {
      showFieldError(emailInput, 'An account with this email already exists.');
      return;
    }

    users.push({ id: Date.now(), name, mail, pass, createdAt: new Date().toISOString() });
    localStorage.setItem('userInfo', JSON.stringify(users));

    const btn = signupForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Creating account...';
    showMessage('Account created! Taking you to the login page...', 'success');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(loginForm);

    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    const mail = emailInput.value.trim().toLowerCase();
    const pass = passInput.value;
    let valid = true;

    if (!emailPattern.test(mail)) {
      showFieldError(emailInput, 'Please provide a valid email address.');
      valid = false;
    }
    if (pass === '') {
      showFieldError(passInput, 'Please enter your password.');
      valid = false;
    }
    if (!valid) return;

    const foundUser = getUsers().find((user) => user.mail === mail && user.pass === pass);
    if (!foundUser) {
      showMessage('Invalid email or password.', 'error');
      return;
    }

    const currentUser = { id: foundUser.id, name: foundUser.name, mail: foundUser.mail };
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    const remember = document.getElementById('remember-me').checked;
    (remember ? localStorage : sessionStorage).setItem('currentUser', JSON.stringify(currentUser));

    showMessage('Welcome back, ' + foundUser.name.split(' ')[0] + '!', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  const forgotLink = document.querySelector('.auth-meta-row .auth-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showMessage('Password reset is coming soon.', 'info');
    });
  }
}

const googleBtn = document.getElementById('google-signin-btn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    showMessage('Google sign-in is coming soon.', 'info');
  });
}

const accountLink = document.querySelector('a[aria-label="User Account"]');
const loggedInUser = getCurrentUser();
if (accountLink && loggedInUser) {
  accountLink.title = 'Hi, ' + loggedInUser.name.split(' ')[0] + ' (click to log out)';
  accountLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Log out of StrideStyle?')) logOut();
  });
}

