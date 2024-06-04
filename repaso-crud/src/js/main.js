
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

// obtener la info del formulario
const tbody = document.querySelector('tbody')
const form = document.querySelector('form')
const title = document.querySelector('#title')
const comment = document.querySelector('#comment')
const status = document.querySelector('#status')

// crear la variable del endpoint
const URL = 'http://localhost:3000/notes'

// mostrar info
getData()

// capturar información del form
let id // undefined
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    if (id === undefined) {
        await createData(title, comment)
        form.reset()
    } else {
        await updateData(id, title, comment)
        id = undefined
        form.reset()
    }
})

// acciones con los botones
tbody.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-danger')) {
        const id = e.target.getAttribute("data-id")
        deleteData(id)
    }

    if (e.target.classList.contains('btn-info')) {
        const id = e.target.getAttribute("data-id")
        await changeStatus(id)
    }

    if (e.target.classList.contains('btn-warning')) {
        id = e.target.getAttribute("data-id")
        const response = await fetch(`${URL}/${id}`)
        const data = await response.json()
        title.value = data.title
        comment.value = data.comment
    }
})

// función mostrar (read)
async function getData() {
    const responseJson = await fetch(URL)  //data cruda
    const data = await responseJson.json()  // convertir la info en datos legibles por JS
    tbody.innerHTML = ''
    // mostrar información
    data.forEach(note => {
        tbody.innerHTML += `
        <tr>
            <th>${note.id}</th>
            <td>${note.title}</td>
            <td>${note.comment}</td>
            <td>${note.status}</td>
            <td>
                <button class="btn btn-warning" data-id=${note.id}>edit</button>
                <button class="btn btn-danger" data-id=${note.id}>delete</button>
                <button class="btn btn-info" data-id=${note.id}>status</button>
            </td>
        </tr>
        `
    })
}

// función crear
async function createData(title, comment) {
    const newData = {
        title: title.value,
        comment: comment.value,
        status: 'active'
    }

    await fetch(URL, {
        method: 'POST',  //agregar info
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
    })
    getData()
}

// función eliminar
async function deleteData(idDelete) {
    await fetch(`${URL}/${idDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await getData()
}

// actualizar con patch
async function changeStatus(id) { //PATCH
    const response = await fetch(`${URL}/${id}`) // data cruda
    const data = await response.json() // pasamos la info a datos js
    const newStatus = data.status === 'active' ? 'disabled' : 'active';

    const updateStatus = {
        status: newStatus // disabled
    }

    await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateStatus)
    })
    await getData()
}

async function updateData(id, title, comment) { // UPDATE

    const dataUpdate = {
        title: title.value,
        comment: comment.value,
        status: 'active'
    }

    await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataUpdate)
    })
    await getData()
}


