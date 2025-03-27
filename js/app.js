
import key from './key.js'

const ciudad ="Barcelona"
const idioma="es"
let url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`


const divDatos=document.getElementById("divDatos")

fetch(url)
.then(data => data.json())
.then(data => {
    divDatos.innerHTML +=`<p>Ciudad: ${data.name}</p>`
    divDatos.innerHTML +=`<p>Temperatura actual: ${data['main']['temp']}ºC</p>`
    divDatos.innerHTML += `<p>Descripción: ${data['weather'][0]['description']}</p>`
    divDatos.innerHTML += `<div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['weather'][0]['icon']}.svg"></div>`
})