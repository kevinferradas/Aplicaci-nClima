
import key from './key.js'


const formClima =document.forms["formClima"]
// Gestión de fechas
let hoy = new Date()
hoy = hoy.toISOString().split('T')[0] // 2025-03-28
formClima.addEventListener("submit", (e) => {

    e.preventDefault() 

    let ciudad = formClima["ciudad"].value
    let idioma =  formClima["idioma"].value
    let rango = formClima['rango'].value 
    
    
    
    // alert(hoy)


    // let url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`
    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`


    const divDatos=document.getElementById("divDatos")
    // alert(rango)
    if (rango == "1"){
        divDatos.innerHTML =""

        fetch(url)
        .then(data => data.json())
        .then(data => {
        // divDatos.innerHTML +=`<p> <span id="parametros"> Ciudad </span>: ${data.name}</p>`
        divDatos.innerHTML +=`<p> <span id="parametros"> Ciudad </span>: ${data["city"]["name"]}</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Temperatura actual </span>: ${data["list"][0]['main']['temp']} ºC</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Sensación térmica </span>: ${data["list"][0]['main']["feels_like"]} ºC</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Máx. / Mín. </span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Humedad </span>: ${data["list"][0]['main']["humidity"]} %</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Nubosidad </span>: ${data["list"][0]['clouds']["all"]} %</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Visibilidad </span>: ${data["list"][0]['visibility']} km</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Viento </span>: ${data["list"][0]['wind']["speed"]} m/s</p>`
        divDatos.innerHTML +=`<p><span id="parametros"> Precipitación </span>: ${data["list"][0]['pop']} % </p>`
        divDatos.innerHTML += `<p><span id="parametros"> Descripción </span> : ${data['list'][0]["weather"][0]['description']}</p>`
        divDatos.innerHTML += `<div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][1]["weather"][0]['icon']}.svg"></div>`
    

}) 
    }
    else if (rango == "2") {

        divDatos.innerHTML =""

        fetch(url)
        .then(data => data.json())
        .then(data => {
            // console.log(data["list"]);
            // divDatos.innerHTML +=`<p>${data["list"][0]["dt_txt"].split(' ')[0]} </p>`
            data["list"].forEach(element => {
                if (element["dt_txt"].split(' ')[0] == hoy){
                
                    divDatos.innerHTML +=`<p> <span id="parametros"> Ciudad </span>: ${data["city"]["name"]}</p>`
                    divDatos.innerHTML +=`<p><span id="parametros"> Temperatura actual </span>: ${element['main']['temp']} ºC</p>`
                    divDatos.innerHTML += `<p><span id="parametros"> Descripción </span> : ${element["weather"][0]['description']}</p>`
                    divDatos.innerHTML +=`<p><span id="parametros"> Precipitación </span>: ${element['pop']} % </p>`
                    divDatos.innerHTML +=`<p><span id="parametros"> Viento </span>: ${data["list"][0]['wind']["speed"]} m/s</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Sensación térmica </span>: ${data["list"][0]['main']["feels_like"]} ºC</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Máx. / Mín. </span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Humedad </span>: ${data["list"][0]['main']["humidity"]} %</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Nubosidad </span>: ${data["list"][0]['clouds']["all"]} %</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Visibilidad </span>: ${data["list"][0]['visibility']} km</p>`        
                    // divDatos.innerHTML += `<div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][1]["weather"][0]['icon']}.svg"></div>`
                }     
            });     
        })
    }

    else {

        divDatos.innerHTML =""

        fetch(url)
        .then(data => data.json())
        .then(data => {
            // console.log(data["list"]);
            // divDatos.innerHTML +=`<p>${data["list"][0]["dt_txt"].split(' ')[0]} </p>`
            data["list"].forEach(element => {
                if (element["dt_txt"].split(' ')[0] == hoy){
                
                    divDatos.innerHTML +=`<p> <span id="parametros"> Ciudad </span>: ${data["city"]["name"]}</p>`
                    divDatos.innerHTML +=`<p><span id="parametros"> Temperatura actual </span>: ${element['main']['temp']} ºC</p>`
                    divDatos.innerHTML += `<p><span id="parametros"> Descripción </span> : ${element["weather"][0]['description']}</p>`
                    divDatos.innerHTML +=`<p><span id="parametros"> Precipitación </span>: ${element['pop']} % </p>`
                    divDatos.innerHTML +=`<p><span id="parametros"> Viento </span>: ${data["list"][0]['wind']["speed"]} m/s</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Sensación térmica </span>: ${data["list"][0]['main']["feels_like"]} ºC</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Máx. / Mín. </span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Humedad </span>: ${data["list"][0]['main']["humidity"]} %</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Nubosidad </span>: ${data["list"][0]['clouds']["all"]} %</p>`
                    // divDatos.innerHTML +=`<p><span id="parametros"> Visibilidad </span>: ${data["list"][0]['visibility']} km</p>`        
                    // divDatos.innerHTML += `<div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][1]["weather"][0]['icon']}.svg"></div>`
                }     
            });     
        })

    }

       
    
})

let rangoOpcion = document.getElementById("rangoOpcion")
let opcion = document.querySelector('#opcion')

rangoOpcion.addEventListener("change", (e) => {

    e.preventDefault() 

    let rango = formClima['rango'].value 

    if (rango =="1") opcion.textContent = "Ahora"
    else if (rango=="2") opcion.textContent = "Por horas"
    else opcion.textContent = "Por día"



})



