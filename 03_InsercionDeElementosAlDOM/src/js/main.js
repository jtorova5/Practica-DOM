
const btnExecute = document.getElementById('btn-execute')
const main = document.querySelector('main')

function createBtnSuccess() {
    // ###############################
    // button element construction
    // ###############################

    const btnExample = document.createElement('button')


    // clasic option
    btnExample.setAttribute('type', 'button')

    // normal option
    btnExample.type = 'button'

    // clasic option
    btnExample.classList.add('btn')
    btnExample.classList.add('btn-success')

    // normal option
    btnExample.classList.add('btn', 'btn-success')

    btnExample.textContent = 'Example'

    return btnExample
}

function callBtnInfo() {
    const btnExample = document.querySelector('.btn-info')
    return btnExample
}

// ###############################
// click on btn-execute
// ###############################
btnExecute.addEventListener('click', () => {
    // let btnExample = callBtnInfo()
    // main.removeChild(btnExample)

    const actualElement = callBtnInfo()
    const newElement = createBtnSuccess()

    main.replaceChild(newElement, actualElement)
})
