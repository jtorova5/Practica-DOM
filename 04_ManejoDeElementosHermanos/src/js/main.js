
const header = document.getElementById('header')
const main = document.getElementById('main')
const footer = document.getElementById('footer')
const btnPoint = document.getElementById('btn-point')


function createButton(color) {
    const btn = document.createElement('button')
    btn.classList.add('btn', color)
    btn.textContent = 'button'
    return btn
}

// // insert element before content
// main.before(createButton('bg-info'))

// // insert element after content
// main.after(createButton('bg-info'))

// // insert element at start of content - insert element before first child
// main.prepend(createButton('bg-warning'))

// // insert element at the end of content
// main.append(createButton('bg-success'))

// // replace children
// main.replaceChildren(createButton('bg-success'))

// // replace all content with - replace the complete section
// main.replaceWith(createButton('bg-primary'))

// // remove children
// main.remove()

console.log(main.children)
console.log(footer.children)
console.log(btnPoint.parentElement.parentElement.parentElement)
console.log(main.firstElementChild)
console.log(main.lastElementChild)
console.log(main.previousElementSibling)
console.log(main.nextElementSibling)