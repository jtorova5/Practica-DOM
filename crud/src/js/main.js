// importaciones
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { coders } from '../../public/data/database.js'
import { listWithInnerHTML, create } from './operations.js'
import { showSmallAlertSuccess } from './alerts.js'

// capturando elementos
const tbody = document.querySelector('tbody')
const form = document.getElementById('form')
const table = document.querySelector('table')
const name = document.getElementById('name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
// const btnSave = document.getElementById('btn-save') Se toma el form y no el botón

// mostrando coders de la base de datos
listWithInnerHTML(coders, tbody)

// agregando coder
form.addEventListener('submit', (event) => {
    if (form.checkValidity()) {
        create(coders, name, lastName, email)
        showSmallAlertSuccess('saved')
    }

    form.reset()
    event.preventDefault()
    listWithInnerHTML(coders, tbody)
})

// eliminando coder
table.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
        const idDelete = event.target.getAttribute('data-id')

        coders.forEach((coder, index) => {
            if (coder.id == idDelete) {
                coders.splice(index, 1)
            }
        })
        listWithInnerHTML(coders, tbody)
        showSmallAlertSuccess('deleted')
    } else {
        showSmallAlertSuccess('diste fuera del blanco')
    }
})
