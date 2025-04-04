import key from './key.js';

const formClima = document.forms["formClima"];
const divDatos = document.getElementById("divDatos");
const climaPordias = document.forms["climaPordias"];
const divDias = document.getElementById("divDias");
const sectionClimaDia = document.getElementById('sectionClimaDia');
let hoy = new Date().toISOString().split('T')[0];

formClima.addEventListener("submit", (e) => {
    e.preventDefault();
    let ciudad = formClima["ciudad"].value;
    let idioma = formClima["idioma"].value;
    let rango = formClima['rango'].value;
    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`;

    divDatos.innerHTML = "";
    sectionClimaDia.style.display = "none";
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (rango == "1") {
            mostrarClimaActual(data);
        } else if (rango == "2") {
            mostrarClimaPorHoras(data);
        } else {
            mostrarSelectorDias(data);
        }
    });
});

function mostrarClimaActual(data) {
    let clima = data.list[0];
    let mensajeClima = `
        <div id="sensacionTermica">${clima.main.feels_like} ºC</div>
        <div id="otrosParametros">
            <p><span id="parametros">Ciudad:</span> ${data.city.name}</p>
            <p><span id="parametros">Temperatura:</span> ${clima.main.temp} ºC</p>
            <p><span id="parametros">Máx. / Mín.:</span> ${clima.main.temp_max}º / ${clima.main.temp_min}º</p>
            <p><span id="parametros">Humedad:</span> ${clima.main.humidity} %</p>
            <p><span id="parametros">Viento:</span> ${clima.wind.speed} m/s</p>
            <div><img src="https://openweathermap.org/img/wn/${clima.weather[0].icon}.png"></div>
        </div>`;
    divDatos.innerHTML = mensajeClima;
    divDatos.style.display = "flex";
}

function mostrarClimaPorHoras(data) {
    divDatos.innerHTML = data.list.filter(element => element.dt_txt.startsWith(hoy))
        .map(element => `
            <div class="climaPorhoras">
                <p><span id="parametros">Hora:</span> ${element.dt_txt.split(' ')[1].slice(0,5)}</p>
                <p><span id="parametros">Temp:</span> ${element.main.temp} ºC</p>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}.png">
            </div>`)
        .join('');
    divDatos.style.display = "flex";
}

function mostrarSelectorDias(data) {
    let listaDias = [...new Set(data.list.map(item => item.dt_txt.split(' ')[0]))];
    let opciones = listaDias.map(dia => `<option value="${dia}">${dia}</option>`).join('');
    divDias.innerHTML = `<p>Escoge un día:</p><select name="diaClima">${opciones}</select><input type="submit" value="Ver">`;
    sectionClimaDia.style.display = "flex";

    climaPordias.addEventListener("submit", (e) => {
        e.preventDefault();
        let diaSeleccionado = climaPordias["diaClima"].value;
        divDatos.innerHTML = data.list.filter(element => element.dt_txt.startsWith(diaSeleccionado))
            .map(element => `
                <div class="climaPorhoras">
                    <p><span id="parametros">Hora:</span> ${element.dt_txt.split(' ')[1].slice(0,5)}</p>
                    <p><span id="parametros">Temp:</span> ${element.main.temp} ºC</p>
                    <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}.png">
                </div>`)
            .join('');
        divDatos.style.display = "flex";
    });
}
