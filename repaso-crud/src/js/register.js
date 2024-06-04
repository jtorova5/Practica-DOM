import { showSmallAlert } from './alerts.js'

// llamar al formulario
const form = document.getElementById('register-form')

// llamar los campos del formulario
const username = document.getElementById('username')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

form.addEventListener('submit', async (event) => {
    event.preventDefault()    // evitar que la página se recargue al enviar el formulario
    const revisionEmail = await checkEmail(email)
    const revisionPassword = checkPasswords(password, confirmPassword)

    if (revisionEmail === true && revisionPassword === true) {
        await registerUser(username, lastName, email, password)
        showSmallAlert('success', 'Usuario registrado correctamente')
        setTimeout(() => {
            window.location.href = "/"
        }, 2000);
    }
})

async function checkEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const datos = await response.json()

    if (datos.length === 0) {
        return true
    } else {
        return false
    }
}

function checkPasswords(password, confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true
    } else {
        return false
    }
}

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