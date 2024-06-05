// imports
import { showSmallAlert } from './alerts.js'

// check if user is logged in
(function () {
    const userOnline = localStorage.getItem('userOnline')
    if (userOnline != null) {
        window.location.href = "./dashboard.html"
    }
})()

// get elements
const form = document.querySelector('form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

// submit event
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const user = await checkEmail(email)

    if (user === false) {
        showSmallAlert('error', 'User not registered')
    } else {
        if (user.password === password.value) {
            showSmallAlert('success', `Welcome ${user.username}!`)
            setTimeout(() => {
                localStorage.setItem("userOnline", JSON.stringify(user))
                window.location.href = "./dashboard.html"
            }, 2000)
        } else {
            showSmallAlert('error', 'Wrong password')
        }
    }
})

// check user email
async function checkEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const datos = await response.json()

    if (datos.length === 1) {
        return datos[0]
    } else {
        return false
    }
}