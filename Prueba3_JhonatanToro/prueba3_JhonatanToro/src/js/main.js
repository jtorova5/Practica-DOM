// imports
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

// get elements
const main = document.querySelector('main')

// endpoint URL
const URL = 'http://localhost:3000/rooms'

// read
async function getData() {
    const responseJson = await fetch(URL)  
    const rooms = await responseJson.json()
    main.innerHTML = ''

    rooms.forEach(room => {
        main.innerHTML += `
        <div class="card text-light col-4 card-custom">
            <img src="${room.img}"
                class="card-img h-100 object-fit-cover" alt="example">
            <div class="card-body bg-light text-dark">
                <h5 class="card-title text-center">Room ${room.roomNumber}</h5>
                <p class="card-text"><strong>Room type:</strong> ${room.roomType}</p>
                <p class="card-text"><strong>Price per night:</strong> $${room.price} USD</p>
                <p class="card-text"><strong>Beds:</strong> ${room.beds}</p>
                <p class="card-text"><strong>Bathrooms:</strong> ${room.bathrooms}</p>
                <p class="card-text"><strong>Services:</strong></p>
                <ul>
                    <li><p class="card-text"><strong>Breakfast:</strong> ${room.services.breakfast}</p></li>
                    <li><p class="card-text"><strong>Wifi:</strong> ${room.services.wifi}</p></li>
                    <li><p class="card-text"><strong>Air conditioning (A/C):</strong> ${room.services.airConditioning}</p></li>
                </ul>
            </div>
        </div>
        `
    })
}

getData()