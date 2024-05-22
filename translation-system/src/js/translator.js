import i18next from 'i18next'
import Backend from 'i18next-http-backend'

let language 

if (localStorage.getItem('language')) {
    language = localStorage.getItem('language')
} else {
    language = 'en'
}

i18next.use(Backend).init({
    lng: language, // if you're using a language detector, do not define the lng option
    debug: true,
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    ns: ['translation'],
    defaultNS: 'translation'
}).then(() => updateContent())

function updateContent() {
    const elementsHTML = document.querySelectorAll('[data-i18n]')

    elementsHTML.forEach(element => {
        const key = element.getAttribute('data-i18n')
        element.innerHTML = i18next.t(key)
    })
}

window.changeLanguage = function(lng) {

    i18next.changeLanguage(lng).then(() => updateContent())
    // i18next.changeLanguage(lng, updateContent())
    localStorage.setItem('language', lng)
}