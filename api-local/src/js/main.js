import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const URL = 'http://localhost:3000/categories'
const tbody = document.querySelector('tbody')
const form = document.querySelector("form")
const name = document.querySelector("#name")
const image = document.querySelector("#url-image")
let idCache

index()

form.addEventListener('submit', async (event) => {

    event.preventDefault()
    if (idCache === undefined) {
        await create(name, image)
    } else {
        await update(idCache, name, image)
        idCache = undefined
    }
    await index()
    form.reset()
})

tbody.addEventListener('click', async function (event) {

    if (event.target.classList.contains('btn-danger')) {
        const id = event.target.getAttribute('data-id')
        await deleteItem(id)
        await index()
    }

    if (event.target.classList.contains('btn-warning')) {
        idCache = event.target.getAttribute('data-id')
        const categoryFound = await find(idCache)

        name.value = categoryFound.name
        image.value = categoryFound.image
    }
})

async function index() {
    const response = await fetch(URL)
    const data = await response.json()

    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
            <td>${element.id}</td>
            <td class="text-capitalize">${element.name}</td>
            <td>
                <img width="100px" src=${element.image} alt=${element.name}>
            </td>
            <td>${element.creationAt}</td>
            <td>${element.updatedAt}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

async function find(id) {
    const response = await fetch(`${URL}/${id}`)
    const data = await response.json()
    return data
}

async function create(name, image) {

    const newCategory = {
        name: name.value,
        image: image.value
    }

    await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
        
    })
}

async function update(idCache, name, image) {
    const updateCategory = {
        name: name.value,
        image: image.value
    }

    await fetch(`${URL}/${idCache}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateCategory)
    })
}

async function deleteItem(id) {
    await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}