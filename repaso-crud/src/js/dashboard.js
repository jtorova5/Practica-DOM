import { showSmallAlert } from './alerts.js'

(function () {
    const userOnline = localStorage.getItem('userOnline')
    if (userOnline == null) {
        window.location.href = "/"    
    }
})()

const btnLogOut = document.getElementById('btn-log-out')

btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('userOnline')
    showSmallAlert('success', 'logged out')
    setTimeout(() => {
        window.location.href = "/"
    }, 2000);
})