// imports
import Swal from 'sweetalert2'

// alert
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
})

// alert export
export function showSmallAlert(icon, message) {
    Toast.fire({
        icon: icon,
        title: message
    })
}