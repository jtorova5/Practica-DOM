// imports
import { showSmallAlert } from './alerts.js'

// check if user is logged in
(function () {
    const userOnline = localStorage.getItem('userOnline')
    if (userOnline != null) {
        window.location.href = "./../pages/dashboard.html"
    }
})()

// get elements
const form = document.getElementById('register-form')
const username = document.getElementById('username')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

// submit event
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const checkedEmail = await checkEmail(email)
    const checkedPassword = checkPasswords(password, confirmPassword)

    if (checkedEmail === true && checkedPassword === true) {
        await registerUser(username, lastName, email, password)
        showSmallAlert('success', 'User successfully registered')
        setTimeout(() => {
            window.location.href = "/"
        }, 2000)
    } else if (checkedEmail === true && checkedPassword === false) {
        showSmallAlert('error', 'Passwords do not match')
    } else if (checkedEmail === false) {
        showSmallAlert('error', 'Email address is taken')
    }
})

// check if email is already registered
async function checkEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const users = await response.json()

    if (users.length === 0) {
        return true
    } else {
        return false
    }
}

// compare passwords
function checkPasswords(password, confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true
    } else {
        return false
    }
}

// register new user
async function registerUser(username, lastName, email, password) {
    const newUser = {
        username: username.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }

    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
}