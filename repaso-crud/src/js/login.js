import { showSmallAlert } from './alerts.js'

// guardián
(function () {
    const userOnline = localStorage.getItem('userOnline')
    if (userOnline != null) {
        window.location.href = "./src/pages/dashboard.html"
    }
})()

// capturando información de login
const form = document.querySelector('form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

// evento submit del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const user = await checkEmail(email)

    if (user === false) {
        showSmallAlert('error', 'Usuario no registrado')
    } else {
        if (user.password === password.value) {
            showSmallAlert('success', 'Bienvenido')
            setTimeout(() => {
                localStorage.setItem("userOnline", JSON.stringify(user))
                window.location.href = "./src/pages/dashboard.html"
            }, 2000);
        } else {
            showSmallAlert('error', 'Contraseña incorrecta')
        }
    }
})

async function checkEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const datos = await response.json()

    if (datos.length === 1) {
        return datos[0]
    } else {
        return false
    }
}