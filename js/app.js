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

    // alert (url)
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
                    <h2 class="tituloClima">EL TIEMPO EN <span class="parametros">${ciudad.toUpperCase()}</span>, HOY : </h2>
                    <div class="clima-flex">
                        <!-- Columna Izquierda -->
                        <div class="columna-izquierda">
                            <div id="sensacionTermica">
                                <p><i class="fa-solid fa-temperature-half" ></i> <span class="parametros">Sensación térmica</span></p>
                                <p class="valor-destacado">${data["list"][0]['main']["feels_like"]} ºC</p>
                            </div>
                            <div class="param-col">
                                <p><i class="fa-solid fa-arrow-up" ></i> <span class="parametros">Máx.</span> / <i class="fa-solid fa-arrow-down" ></i> <span class="parametros"> Mín.</span>: ${data["list"][0]['main']["temp_max"]}º / ${data["list"][0]['main']['temp_min']}º</p>
                                <p><i class="fa-solid fa-droplet" ></i> <span class="parametros">Humedad</span>: ${data["list"][0]['main']["humidity"]} %</p>
                                <p><i class="fa-solid fa-eye" ></i> <span class="parametros">Visibilidad</span>: ${data["list"][0]['visibility']} m</p>
                            </div>
                        </div>

                        <!-- Columna Derecha -->
                        <div class="columna-derecha">
                            <div id="descripcion">
                                <p> <span class="parametros">Descripción</span>: ${data['list'][0]["weather"][0]['description']}</p>
                                <img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${data['list'][0]["weather"][0]['icon']}.svg" alt="Icono clima">
                            </div>
                            <div class="param-col">
                                <p><i class="fa-solid fa-wind" ></i> <span class="parametros">Viento</span>: ${data["list"][0]['wind']["speed"]} m/s</p>
                                <p> <i class="fa-solid fa-cloud" ></i> <span class="parametros">Nubosidad</span>: ${data["list"][0]['clouds']["all"]} %</p>
                                <p><i class="fa-solid fa-cloud-rain" ></i> <span class="parametros">Precipitación</span>: ${data["list"][0]['pop']} %</p>
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
        let listaClima = []
        divDatos.style.display = "none";

        
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let mensajeClima1 =   ` 
                                    <h2 class="tituloClima">EL TIEMPO EN <span class="parametros">${ciudad.toUpperCase()}</span>: </h2>
                                    `
  
            data["list"].forEach(element => {
                let hora = element["dt_txt"].split(' ')[1].slice(0,5);
                if (element["dt_txt"].split(' ')[0] == hoy) {
                let   mensajeClima2 = `

                        <div class ="climaPorhoras">
                            <div>
                                <p class = "hora">${hora}</p>
                                <p><i class="fa-solid fa-temperature-half"></i><span>${element['main']["feels_like"]} ºC </span></p>
                            </div>
                            <div id = "descripcion_horas">
                                <img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${element["weather"][0]['icon']}.svg" alt="Icono clima">
                                <p> ${element["weather"][0]['description']}</p>
                            </div>
                            <div>
                            <p><i class="fa-solid fa-cloud-rain"></i> ${element['pop']} %</p>
                            <p><i class="fa-solid fa-wind"></i> ${element['wind']["speed"]} m/s</p>
                            </div>
                            <button class="btn-toggle">+</button>
                        </div>

                        <div class="climaDetalle" style="display: none;">
                            <div class="divDetalle" >
                                <div>
                                <p><i class="fa-solid fa-arrow-up" ></i> <span class="parametros">Máx.</span> / <i class="fa-solid fa-arrow-down" ></i> <span class="parametros"> Mín.</span>: ${element.main.temp_max}º / ${element.main.temp_min}º</p>
                                </div>
                                <div>
                                <p><i class="fa-solid fa-droplet"></i> Humedad: ${element.main.humidity}%</p>
                                </div>
                            </div>
                            <div class="divDetalle" >
                                <div>
                                <p> <i class="fa-solid fa-cloud" ></i> <span class="parametros">Nubosidad</span>: ${element['clouds']["all"]} %</p>
                                </div>
                                <div>
                                <p><i class="fa-solid fa-eye"></i> Visibilidad: ${element.visibility} m</p>
                                </div>
                        
                            </div>
                        </div>
                        
                    `
                    ;
                    listaClima.push(mensajeClima2);
                }
            });

            listaClima.unshift(mensajeClima1)

            listaClima.forEach(mensajes => {
                
                divDatos.innerHTML += mensajes;
                
            });
            divDatos.style.display = "block";

            // Activar botones +/-

    let botones = document.querySelectorAll(".btn-toggle");
let climaDetalle = document.querySelectorAll(".climaDetalle");

botones.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const detalle = climaDetalle[index];
        const isVisible = detalle.style.display === "block";

        // Ocultar todos los detalles y resetear botones
        climaDetalle.forEach((d, i) => {
            d.style.display = "none";
            botones[i].textContent = "+";
        });

        // Si el que clickeaste no estaba visible, mostrarlo
        if (!isVisible) {
            detalle.style.display = "block";
            btn.textContent = "-";
        }
    });
});




        });
    }
    // Rango por días
    else {
        let listaDias = [];
        divDatos.style.display = "none"
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
                let listaClimaDia = []
                let mensajeClima1 =   ` 
                                    <h2 class="tituloClima">EL TIEMPO EN <span class="parametros">${ciudad.toUpperCase()}</span>: </h2>
                                    `
                data["list"].forEach(element => {
                    let diaElegido = climaPordias["diaClima"].value;
                    let hora = element["dt_txt"].split(' ')[1].slice(0, 5);
                    if (element["dt_txt"].split(' ')[0] == diaElegido) {

                        let   mensajeClima2 = `

                        <div class ="climaPorhoras">
                            <div>
                                <p>${hora}</p>
                                <p><i class="fa-solid fa-temperature-half"></i><span>${element['main']["feels_like"]} ºC </span></p>
                            </div>
                            <div id = "descripcion_horas">
                                <img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${element["weather"][0]['icon']}.svg" alt="Icono clima">
                                <p> ${element["weather"][0]['description']}</p>
                            </div>
                            <div>
                            <p><i class="fa-solid fa-cloud-rain"></i> ${element['pop']} %</p>
                            <p><i class="fa-solid fa-wind"></i> ${element['wind']["speed"]} m/s</p>
                            </div>
                            <button class="btn-toggle">+</button>
                        </div>
                        <div class="climaDetalle" style="display: none;">
                            <div class="divDetalle" >
                                <div>
                                <p><i class="fa-solid fa-arrow-up" ></i> <span class="parametros">Máx.</span> / <i class="fa-solid fa-arrow-down" ></i> <span class="parametros"> Mín.</span>: ${element.main.temp_max}º / ${element.main.temp_min}º</p>
                                </div>
                                <div>
                                <p><i class="fa-solid fa-droplet"></i> Humedad: ${element.main.humidity}%</p>
                                </div>
                            </div>
                            <div class="divDetalle" >
                                <div>
                                <p> <i class="fa-solid fa-cloud" ></i> <span class="parametros">Nubosidad</span>: ${element['clouds']["all"]} %</p>
                                </div>
                                <div>
                                <p><i class="fa-solid fa-eye"></i> Visibilidad: ${element.visibility} m</p>
                                </div>
                        
                            </div>
                        </div>
                        
                    `
                    ;
                    listaClimaDia.push(mensajeClima2);
                    }
                });

                listaClimaDia.unshift(mensajeClima1)

                listaClimaDia.forEach(mensajes => {
                
                divDatos.innerHTML += mensajes;
                
            });
            divDatos.style.display = "block";

            let botones = document.querySelectorAll(".btn-toggle");
            let climaDetalle = document.querySelectorAll(".climaDetalle");
            
            botones.forEach((btn, index) => {
                btn.addEventListener("click", () => {
                    const detalle = climaDetalle[index];
                    const isVisible = detalle.style.display === "block";
            
                    // Ocultar todos los detalles y resetear botones
                    climaDetalle.forEach((d, i) => {
                        d.style.display = "none";
                        botones[i].textContent = "+";
                    });
            
                    // Si el que clickeaste no estaba visible, mostrarlo
                    if (!isVisible) {
                        detalle.style.display = "block";
                        btn.textContent = "-";
                    }
                });
            });
           
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
