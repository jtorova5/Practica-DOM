
(function () {
    const userOnline = localStorage.getItem('userOnline')
    if (userOnline != null) {
        window.location.href = "./src/pages/dashboard.html"    
    }
})()

const form = document.querySelector('form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const user = await checkEmail(email)

    if (user === false) {
        alert('usuario no registrado')
    } else {
        if (user.password === password.value) {
            alert('Bienvenido')
            localStorage.setItem("userOnline", JSON.stringify(user))
            window.location.href = "./src/pages/dashboard.html"
        } else {
            alert('contraseña incorrecta')
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