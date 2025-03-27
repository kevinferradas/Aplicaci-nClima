
import key from './key.js'





const formClima =document.forms["formClima"]

formClima.addEventListener("submit", (e) => {

    e.preventDefault() 

    let ciudad = formClima["ciudad"].value
    let idioma =  formClima["idioma"].value
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`


    const divDatos=document.getElementById("divDatos")

    divDatos.innerHTML =""

    fetch(url)
    .then(data => data.json())
    .then(data => {
    divDatos.innerHTML +=`<p> <span id="parametros"> Ciudad </span>: ${data.name}</p>`
    divDatos.innerHTML +=`<p><span id="parametros"> Temperatura actual </span>: ${data['main']['temp']}ºC</p>`
    divDatos.innerHTML += `<p><span id="parametros"> Descripción </span> : ${data['weather'][0]['description']}</p>`
    divDatos.innerHTML += `<div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['weather'][0]['icon']}.svg"></div>`
})
       
    
})


