let pagina = 1;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    // resalta el div actual segun el tab al que se presiona


    // oculta o muestra una seccion segun el tab al que se presiona
    cambiarSeccion();
}


function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');
        });
    });
}


async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();
        const servicios = db.servicios;

        // Generar HTML
        servicios.forEach(servicio => {
            const { id, nombre, precio } = servicio;

            // Generar nombre servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            // Generar precio servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = '$ ' + precio;
            precioServicio.classList.add('precio-servicio');

            // Generar div contenedor de nombre y precio del servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            // Seleccionar un servicio
            servicioDiv.onclick = seleccionarServicio;


            // Inyectar nombre y precio al DIV
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            const servicios = document.querySelector('#servicios');

            servicios.appendChild(servicioDiv);
        });

    } catch (error) {
        console.log(error);
    }
}


function seleccionarServicio(e) {
    let elemento;

    // forzar que el elemento al cual damos click sea el DIV
    if(e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        elemento = e.target;
    }


    if(elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    } else {
        elemento.classList.add('seleccionado');
    }
}