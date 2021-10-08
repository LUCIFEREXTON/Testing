import { getAll } from './cookiesParser.js'
let draggedele;

console.log(getAll())


window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('visibilitychange', () => {
        document.title = document.visibilityState;
    })
});