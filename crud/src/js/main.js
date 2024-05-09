
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { coders } from '../../public/data/database.js'
import { listWithInnerHTML, create } from './operations.js'

const tbody = document.querySelector('tbody')
const form = document.getElementById('form')
const name = document.getElementById('name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
// const btnSave = document.getElementById('btn-save') Se toma el form y no el botón

listWithInnerHTML(coders, tbody)

form.addEventListener('submit', (event) => {
    create(coders, name, lastName, email)
    form.reset()
    event.preventDefault()
    listWithInnerHTML(coders, tbody)
})

console.log(coders)

coders.forEach(coder => {

    if (coders.id == 2) {
        coders.splice(coders.indexOf(coder), 1)
    }

})

console.log(coders)