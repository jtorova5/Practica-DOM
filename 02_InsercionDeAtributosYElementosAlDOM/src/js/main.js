// Creación de elementos desde JS

// console.groupCollapsed('Creación de elementos desde JS')

// const main = document.querySelector('main')
// const dog = document.createElement('img')

// dog.id = 'perro-1'
// dog.src = './public/img/dog-2.webp'
// dog.alt = 'Perros-2'
// dog.width = 200
// dog.removeAttribute('id')

// // dog.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm-lKzokjSIZ36mWgO0t0sJzcfGWIDFKa5oksolM7vEQ&s'
// dog.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm-lKzokjSIZ36mWgO0t0sJzcfGWIDFKa5oksolM7vEQ&s')

// main.appendChild(dog)

// console.groupEnd()

const main = document.querySelector('main')

for (let i = 0; i < 70; i++) {
    main.innerHTML += `
    <div class="card border border-3 border-secondary text-center" style="width: 18rem;">
    <img src="./public/img/dog-1.webp" class="card-img-top" alt="perrito" title="Perro-1">
    <div class="card-body">
        <h2>perritos</h2>
        <p>
            <strong>edad:</strong> <span>3 años</span> <br>
            <strong>raza:</strong> <span>golden</span>
        </p>
        <button class="btn btn-secondary" type="button">Ver detalles</button>
    </div>
  </div>
    `
}