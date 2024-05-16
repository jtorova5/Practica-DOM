
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const tbody = document.querySelector('tbody')
const btnNew = document.querySelector('#nueva-categoria')

btnNew.addEventListener('click', () => {
    create()
})

function create() {

    const newCategory = {
        name: 'gaming jh',
        image: 'https://dezlwerqy1h00.cloudfront.net/images/gaming/810x610-ps5.png'
    }

    fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
    })
}

consultarDatosDeAPI()

function index(datos) {
    datos.forEach(dato => {
        tbody.innerHTML += 
        `
        <tr>
            <th scope="row">${dato.id}</th>
            <td>${dato.name}</td>
            <td>${dato.creationAt}</td>
            <td>${dato.updatedAt}</td>
            <td><img class="w-25" src=${dato.image}></td>
        </tr>
        `
    })
}

async function consultarDatosDeAPI() {
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/categories')
    const datos = await respuesta.json()
    index(datos)
}

