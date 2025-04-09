import key from './key.js'

const formClima = document.forms["formClima"];
const divDatos = document.getElementById("divDatos");

const climaPordias = document.forms["climaPordias"];
const divDias = document.getElementById("divDias");

const sectionClimaDia = document.getElementById('sectionClimaDia');
let hoy = new Date();
hoy = hoy.toISOString().split('T')[0];

// Gestión de fechas

formClima.addEventListener("submit", (e) => {
    // prevenimos que se la página se recargue por defecto
    e.preventDefault(); 

    // Extraemos los valores del formulario
    let ciudad = formClima["ciudad"].value;
    let idioma = formClima["idioma"].value;
    let rango = formClima['rango'].value;
    
    // URL de la API
    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&lang=${idioma}&q=${ciudad}`;

    alert (url)
    // Limpiamos las previsiones anteriores
    divDatos.innerHTML = "";
    sectionClimaDia.style.display = "none";  

    // Muestra las previsiones según el rango seleccionado
    if (rango == "1") {
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let mensajeClima = `
                <div class="clima-container">
                    <h2 class="tituloClima">El tiempo en ${ciudad}, hoy</h2>
                    <div class="clima-flex">
                        <!-- Columna Izquierda -->
                        <div class="columna-izquierda">
                            <div id="sensacionTermica">
                                <p><i class="fa-solid fa-temperature-half"></i> <span id="parametros">Sensación térmica</span></p>
                                <p class="valor-destacado">${data["list"][0]['main']["feels_like"]} ºC</p>
                            </div>
                            <div class="param-col">
                                <p><i class="fa-solid fa-arrow-up"></i> <span id="parametros">Máx.</span> / <i class="fa-solid fa-arrow-down"></i> <span id="parametros"> Mín.</span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>
                                <p><i class="fa-solid fa-droplet"></i> <span id="parametros">Humedad</span>: ${data["list"][0]['main']["humidity"]} %</p>
                                <p><i class="fa-solid fa-eye"></i> <span id="parametros">Visibilidad</span>: ${data["list"][0]['visibility']} km</p>
                            </div>
                        </div>

                        <!-- Columna Derecha -->
                        <div class="columna-derecha">
                            <div id="descripcion">
                                <p> <span id="parametros">Descripción</span>: ${data['list'][0]["weather"][0]['description']}</p>
                                <img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][0]["weather"][0]['icon']}.svg" alt="Icono clima">
                            </div>
                            <div class="param-col">
                                <p><i class="fa-solid fa-wind"></i> <span id="parametros">Viento</span>: ${data["list"][0]['wind']["speed"]} m/s</p>
                                <p> <i class="fa-solid fa-cloud"></i> <span id="parametros">Nubosidad</span>: ${data["list"][0]['clouds']["all"]} %</p>
                                <p><i class="fa-solid fa-cloud-rain"></i> <span id="parametros">Precipitación</span>: ${data["list"][0]['pop']} %</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            divDatos.innerHTML += mensajeClima;
            divDatos.style.display = "flex";

        });
    }
    // Rango por horas
    else if (rango == "2") {
        let listaClima = [];
        fetch(url)
        .then(data => data.json())
        .then(data => {
            data["list"].forEach(element => {
                let hora = element["dt_txt"].split(' ')[1].slice(0,5);
                if (element["dt_txt"].split(' ')[0] == hoy) {
                    let mensajeClima = `
                        <div class ="climaPorhoras">
                            <div><p><span id="parametros">Hora</span>: ${hora}</p></div>
                            <div><p><span id="parametros">Ciudad</span>: ${data["city"]["name"]}</p></div>
                            <div><p><span id="parametros">Temperatura</span>: ${element['main']['temp']} ºC</p></div>
                            <div><p><span id="parametros">Descripción</span>: ${element["weather"][0]['description']}</p></div>
                            <div><p><span id="parametros">Precipitación</span>: ${element['pop']} %</p></div>
                            <div><p><span id="parametros">Viento</span>: ${data["list"][0]['wind']["speed"]} m/s</p></div>
                        </div>
                    `;
                    listaClima.push(mensajeClima);
                }
            });

            listaClima.forEach(mensajes => {
                divDatos.innerHTML += mensajes;
            });

            divDatos.style.display = "flex";
        });
    }
    // Rango por días
    else {
        let listaDias = [];
        divDias.innerHTML = "";
        fetch(url)
        .then(data => data.json())
        .then(data => {
            data["list"].forEach(element => {
                let dia = element["dt_txt"].split(' ')[0];
                if (!listaDias.includes(dia)) listaDias.push(dia);
            });

            let mensajeClimadia = '<p>Escoge un día</p><select name="diaClima">';
            listaDias.forEach(dias => {
                mensajeClimadia += `<option value="${dias}">${dias}</option>`;
            });
            mensajeClimadia += '</select><input type="submit" value="Elegir día">';
            divDias.innerHTML += mensajeClimadia;
            sectionClimaDia.style.display = "flex";

            climaPordias.addEventListener('submit', (e) => {
                e.preventDefault();
                divDatos.innerHTML = "";
                let listaClimadia = [];
                data["list"].forEach(element => {
                    let diaElegido = climaPordias["diaClima"].value;
                    let hora = element["dt_txt"].split(' ')[1].slice(0, 5);
                    if (element["dt_txt"].split(' ')[0] == diaElegido) {
                        let mensajeClima = `
                            <div class ="climaPorhoras">
                                <div><p><span id="parametros">Día</span>: ${diaElegido}</p></div>
                                <div><p><span id="parametros">Hora</span>: ${hora}</p></div>
                                <div><p><span id="parametros">Ciudad</span>: ${data["city"]["name"]}</p></div>
                                <div><p><span id="parametros">Temperatura</span>: ${element['main']['temp']} ºC</p></div>
                                <div><p><span id="parametros">Descripción</span>: ${element["weather"][0]['description']}</p></div>
                                <div><p><span id="parametros">Precipitación</span>: ${element['pop']} %</p></div>
                                <div><p><span id="parametros">Viento</span>: ${data["list"][0]['wind']["speed"]} m/s</p></div>
                            </div>
                        `;
                        listaClimadia.push(mensajeClima);
                    }
                });

                listaClimadia.forEach(mensajes => {
                    divDatos.innerHTML += mensajes;
                });

                divDatos.style.display = "flex";
            });
        });
    }
});

let rangoOpcion = document.getElementById("rangoOpcion");
let opcion = document.querySelector('#opcion');

rangoOpcion.addEventListener("change", (e) => {
    e.preventDefault();
    let rango = formClima['rango'].value;
    if (rango == "1") opcion.textContent = "Ahora";
    else if (rango == "2") opcion.textContent = "Por horas";
    else opcion.textContent = "Por día";
});
