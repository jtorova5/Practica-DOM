
export function listWithInnerHTML(coders, tbody) {
    coders.forEach(coder => {
        tbody.innerHTML += `
    <tr>
        <th scope="row">${coder.id}</th>
        <td>${coder.name}</td>
        <td>${coder.lastName}</td>
        <td>${coder.email}</td>
    </tr>
    `
    })
}

function listWithBasicElements(coders, tbody) {
    coders.forEach(coder => {
        const tr = document.createElement('tr')
        const th = document.createElement('th')
        tr.appendChild(th)
        for (let i = 0; i < 3; i++) {
            const td = document.createElement('td')
            tr.appendChild(td)
        }
        // tr.firstElementChild.textContent = coder.id
        // tr.firstElementChild.nextElementSibling.textContent = coder.name
        // tr.firstElementChild.nextElementSibling.nextElementSibling.textContent = coder.lastName
        // tr.lastElementChild.textContent = coder.email

        tr.children[0].textContent = coder.id
        tr.children[1].textContent = coder.name
        tr.children[2].textContent = coder.lastName
        tr.children[3].textContent = coder.email
        
        tbody.appendChild(tr)
    })
}