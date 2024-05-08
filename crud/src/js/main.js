
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { coders } from '../../public/data/database.js'
import { listWithInnerHTML } from './operations.js'

const tbody = document.querySelector('tbody')
listWithInnerHTML(coders, tbody)