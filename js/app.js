
import key from './key.js'


const formClima =document.forms["formClima"]
const divDatos=document.getElementById("divDatos") 

const climaPordias = document.forms["climaPordias"]
const divDias = document.getElementById("divDias")

const sectionClimaDia = document.getElementById('sectionClimaDia')
let hoy = new Date()
hoy = hoy.toISOString().split('T')[0]


// Gestión de fechas
 // 2025-03-28

// let hora = hoy.getHours()

formClima.addEventListener("submit", (e) => {

   
    e.preventDefault() 

    let ciudad = formClima["ciudad"].value
    let idioma =  formClima["idioma"].value
    let rango = formClima['rango'].value 
    
    
    
    // alert(hoy)


    // let url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`
    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`


   
    
    if (rango == "1"){
        

        divDatos.innerHTML = ""
        fetch(url)
        .then(data => data.json())
        .then(data => {
        let mensajeClima =`<div>
        <p> <span id="parametros"> Ciudad </span>: ${data["city"]["name"]}</p>
        <p><span id="parametros"> Temperatura actual </span>: ${data["list"][0]['main']['temp']} ºC</p>
        <p><span id="parametros"> Sensación térmica </span>: ${data["list"][0]['main']["feels_like"]} ºC</p>
        <p><span id="parametros"> Máx. / Mín. </span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>
        <p><span id="parametros"> Humedad </span>: ${data["list"][0]['main']["humidity"]} %</p>
        <p><span id="parametros"> Nubosidad </span>: ${data["list"][0]['clouds']["all"]} %</p>
        <p><span id="parametros"> Visibilidad </span>: ${data["list"][0]['visibility']} km</p>
        <p><span id="parametros"> Viento </span>: ${data["list"][0]['wind']["speed"]} m/s</p>
        <p><span id="parametros"> Precipitación </span>: ${data["list"][0]['pop']} % </p>
        <p><span id="parametros"> Descripción </span> : ${data['list'][0]["weather"][0]['description']}</p>
        <div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][1]["weather"][0]['icon']}.svg"></div>
        </div>`
        divDatos.innerHTML += mensajeClima
        divDatos.style.display = "flex"
        

}
) 

    }
    else if (rango == "2") {

        let listaClima = []
        divDatos.innerHTML =""

        fetch(url)
        .then(data => data.json())
        .then(data => {
         
            data["list"].forEach(element => {
                let hora = element["dt_txt"].split(' ')[1].slice(0,5)
                if (element["dt_txt"].split(' ')[0] == hoy){

                    let mensajeClima =`<div class ="climaPorhoras">
                    
                    <div><p> <span id="parametros"> Hora</span>: ${hora}</p></div>
                    <div><p> <span id="parametros"> Ciudad </span>: ${data["city"]["name"]}</p></div>
                    <div><p><span id="parametros"> Temperatura actual </span>: ${element['main']['temp']} ºC</p></div>
                    <div><p><span id="parametros"> Descripción </span> : ${element["weather"][0]['description']}</p></div>
                    <div><p><span id="parametros"> Precipitación </span>: ${element['pop']} % </p></div>
                    <div><p><span id="parametros"> Viento </span>: ${data["list"][0]['wind']["speed"]} m/s</p></div>
                    </div>`
                    //<p><span id="parametros"> Sensación térmica </span>: ${data["list"][0]['main']["feels_like"]} ºC</p>
                    // <p><span id="parametros"> Máx. / Mín. </span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>`
                    // <p><span id="parametros"> Humedad </span>: ${data["list"][0]['main']["humidity"]} %</p>`
                    // <p><span id="parametros"> Nubosidad </span>: ${data["list"][0]['clouds']["all"]} %</p>`
                    // <p><span id="parametros"> Visibilidad </span>: ${data["list"][0]['visibility']} km</p>`        
                    // divDatos.innerHTML += `<div><img src= "https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][1]["weather"][0]['icon']}.svg"></div>`
                    listaClima.push(mensajeClima)
                }     
            });  
            
            listaClima.forEach(mensajes => {
                divDatos.innerHTML += mensajes
            })
            
            divDatos.style.display = "flex";

            
        })
    }

    else {
        let listaDias = []
        divDatos.innerHTML =""
        divDias.innerHTML ='<p>Introducir ciudad y escoger idioma </p>'
        divDias.innerHTML = '<select name="diaClima" >'
        

        fetch(url)
        .then(data => data.json())
        .then(data => {
        data["list"].forEach(element => {
            let dia = element["dt_txt"].split(' ')[0]
            if (!listaDias.includes(dia)) listaDias.push(dia) })

        listaDias.forEach(dias => {
            divDias.innerHTML += `<option value="${dias}" >${dias} </option>`
        })
        
        divDias.innerHTML +=  '</select><input type="submit" value="Elegir día">'
        sectionClimaDia.style.display = "flex"      
        

 
            });     
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



