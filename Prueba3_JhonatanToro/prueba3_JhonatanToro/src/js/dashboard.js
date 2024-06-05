// imports
import { showSmallAlert } from './alerts.js'

// check if user is logged in
(function () {
    const userOnline = localStorage.getItem('userOnline')
    if (userOnline == null) {
        window.location.href = "./login.html"
    }
})()

// get elements
const btnLogOut = document.getElementById('btn-log-out')
const tbody = document.querySelector('tbody')
const form = document.querySelector('form')
const roomNumber = document.querySelector('#room-number')
const roomType = document.querySelector('#room-type')
const price = document.querySelector('#price')
const beds = document.querySelector('#beds')
const bathrooms = document.querySelector('#bathrooms')
const breakfast = document.querySelector('#breakfast')
const wifi = document.querySelector('#wifi')
const airConditioning = document.querySelector('#air-conditioning')
const img = document.querySelector('#img')

// endpoint URL
const URL = 'http://localhost:3000/rooms'

// submit event
let id
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    if (id === undefined) {
        await createData(roomNumber, roomType, price, beds, bathrooms, breakfast, wifi, airConditioning, img)
        form.reset()
    } else {
        await updateData(id, roomNumber, roomType, price, beds, bathrooms, breakfast, wifi, airConditioning, img)
        id = undefined
        form.reset()
    }
})

// buttons events
tbody.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-danger')) {
        const id = e.target.getAttribute("data-id")
        deleteData(id)
    }

    if (e.target.classList.contains('btn-warning')) {
        id = e.target.getAttribute("data-id")
        const response = await fetch(`${URL}/${id}`)
        const data = await response.json()
        roomNumber.value = data.roomNumber
        roomType.value = data.roomType
        price.value = data.price
        beds.value = data.beds
        bathrooms.value = data.bathrooms
        breakfast.value = data.services.breakfast
        wifi.value = data.services.wifi
        airConditioning.value = data.services.airConditioning
        img.value = data.img
    }

    if (e.target.classList.contains('btn-secondary')) {
        const id = e.target.getAttribute("data-id")
        const service = e.target.getAttribute("data-service")

        await changeStatus(id, service)
    }
})

// log out event
btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('userOnline')
    showSmallAlert('success', 'User logged out')
    setTimeout(() => {
        window.location.href = "/"
    }, 2000)
})

// read
async function getData() {
    const response = await fetch(URL)
    const rooms = await response.json()
    tbody.innerHTML = ''
    rooms.forEach(room => {
        tbody.innerHTML += `
        <tr>
            <th>${room.roomNumber}</th>
            <td>${room.roomType}</td>
            <td>${room.price}</td>
            <td>${room.beds}</td>
            <td>${room.bathrooms}</td>
            <td>
                ${room.services.breakfast}
                <button class="btn btn-secondary" data-id=${room.id} data-service="breakfast">⊞</button>
            </td>
            <td>
                ${room.services.wifi}
                <button class="btn btn-secondary" data-id=${room.id} data-service="wifi">⊞</button>
            </td>
            <td>
                ${room.services.airConditioning}
                <button class="btn btn-secondary" data-id=${room.id} data-service="A/C">⊞</button>
            </td>
            <td>
                <button class="btn btn-warning" data-id=${room.id}>edit</button>
                <button class="btn btn-danger" data-id=${room.id}>delete</button>
                
            </td>
        </tr>
        `
    })
}
getData()

// create
async function createData(roomNumber, roomType, price, beds, bathrooms, breakfast, wifi, airConditioning, img) {
    const newRoom = {
        roomNumber: roomNumber.value,
        roomType: roomType.value,
        price: price.value,
        beds: beds.value,
        bathrooms: bathrooms.value,
        services: {
            breakfast: breakfast.value,
            wifi: wifi.value,
            airConditioning: airConditioning.value
        },
        img: img.value
    }

    await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom),
    })
    getData()
}

// delete
async function deleteData(idDelete) {
    await fetch(`${URL}/${idDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await getData()
}

// update
async function updateData(id, roomNumber, roomType, price, beds, bathrooms, breakfast, wifi, airConditioning, img) {
    const dataUpdate = {
        roomNumber: roomNumber.value,
        roomType: roomType.value,
        price: price.value,
        beds: beds.value,
        bathrooms: bathrooms.value,
        services: {
            breakfast: breakfast.value,
            wifi: wifi.value,
            airConditioning: airConditioning.value
        },
        img: img.value
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

// update services
async function changeStatus(id, service) {
    const response = await fetch(`${URL}/${id}`)
    const data = await response.json()

    if (service == "breakfast") {
        const breakfastUpdated = data.services.breakfast == 'Included' ? 'Not included' : 'Included'
        const wifi = data.services.wifi
        const airConditioning = data.services.airConditioning
        const updateService = {
            services: {
                breakfast: breakfastUpdated,
                wifi: wifi,
                airConditioning: airConditioning
            }
        }

        console.log(updateService)
        await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateService)
        })
        await getData()

    } else if (service == "wifi") {
        const breakfast = data.services.breakfast
        const wifiUpdated = data.services.wifi == 'Included' ? 'Not included' : 'Included'
        const airConditioning = data.services.airConditioning
        const updateService = {
            services: {
                breakfast: breakfast,
                wifi: wifiUpdated,
                airConditioning: airConditioning
            }
        }

        await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateService)
        })
        await getData()

    } else if (service == "A/C") {
        const breakfast = data.services.breakfast
        const wifi = data.services.wifi 
        const airConditioningUpdated = data.services.airConditioning == 'Included' ? 'Not included' : 'Included'
        const updateService = {
            services: {
                breakfast: breakfast,
                wifi: wifi,
                airConditioning: airConditioningUpdated
            }
        }

        await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateService)
        })
        await getData()
    }
}











