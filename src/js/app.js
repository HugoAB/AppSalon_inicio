let pagina = 1;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    // resalta el div actual segun el tab al que se presiona
    mostrarSeccion();

    // oculta o muestra una seccion segun el tab al que se presiona
    cambiarSeccion();

    // paginacion siguiente
    paginaSiguiente();

    // paginacion anterior
    paginaAnterior();


    // comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginador();
}


function mostrarSeccion() {
    // eliminar mostrar-seccion de la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if(seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // eliminar clase actual que resalta el tab
    const tabAnterior = document.querySelector('.tabs .actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    // resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}


function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            // llamar la funcion de mostrarSeccion
            mostrarSeccion();
            botonesPaginador();
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


function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', e => {
        pagina++;

        botonesPaginador();
    });
}


function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', e => {
        pagina--;

        botonesPaginador();
    });
}


function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(pagina === 1) {
        paginaAnterior.classList.add('ocultar');
    } else if(pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    } else {
        paginaSiguiente.classList.remove('ocultar');
        paginaAnterior.classList.remove('ocultar');
    }

    // llamar la funcion de mostrar seccion
    mostrarSeccion();
}