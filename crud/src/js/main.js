// importaciones
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { coders } from '../../public/data/database.js'
import { listWithInnerHTML, create, deleteCoder } from './operations.js'
import { showSmallAlertSuccess } from './alerts.js'

// capturando elementos
const tbody = document.querySelector('tbody')
const form = document.getElementById('form')
const table = document.querySelector('table')
const name = document.getElementById('name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
let idUpdate

// mostrando coders de la base de datos
listWithInnerHTML(coders, tbody)

// agregando coder
form.addEventListener('submit', (event) => {
    if (idUpdate === undefined) {
        create(coders, name, lastName, email)
        showSmallAlertSuccess('saved')
    } else {
        for (const coder of coders) {
            if (coder.id == idUpdate) {
                coder.name = name.value
                coder.lastName = lastName.value
                coder.email = email.value
            }
        }
        showSmallAlertSuccess('updated')
        idUpdate = undefined
    }

    form.reset()
    event.preventDefault()
    listWithInnerHTML(coders, tbody)
})


table.addEventListener('click', (event) => {

    // eliminar coder
    if (event.target.classList.contains('btn-danger')) {
        const idDelete = event.target.getAttribute('data-id')
        deleteCoder(coders, idDelete)
        listWithInnerHTML(coders, tbody)
        showSmallAlertSuccess('deleted')
    }

    // actualizar coder
    if (event.target.classList.contains('btn-warning')) {
        idUpdate = event.target.getAttribute('data-id')
        const userFound = coders.find(coder => coder.id == idUpdate)
        name.value = userFound.name
        lastName.value = userFound.lastName
        email.value = userFound.email
    }
})


