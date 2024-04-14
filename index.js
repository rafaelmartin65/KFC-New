// Define variables & constantes
screen = {
    2: 0,
    6: 500,
    10: 900 
}
let datos;
let idiomaActual;
let productosFiltrados;
let datosFamilia;
let totalPaginas;
let elementosPorPagina = 10;

// --------------------------------------------
// Carga datos archivo JSON familias
// --------------------------------------------
fetch('familias.json')
.then(response => response.json())
.then(familias => {
    idiomaActual = "español";
    datosFamilia = familias;
    
    cargaFiltroFamilias(familias[idiomaActual]);

    // --------------------------------------------
    // Carga datos archivo JSON productos
    // --------------------------------------------
    fetch("KFC.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("listado").innerHTML = "";
        datos = data;
        productosFiltrados = data.productos;
        elementosPorPagina = calculoElementosPorPagina();
    })
})

// --------------------------------------------
// Carga filtros de familas disponibles
// --------------------------------------------

function cargaFiltroFamilias() {
    let seleccionada = Math.max(document.getElementById("familias").selectedIndex, 0);
    console.log('Muestra los datos que contiene seleccionada ',seleccionada);
    document.getElementById("familias").innerHTML = "";
    for (elemento in familias) {
        let nomFamilia = document.createElement("option");
        nomFamilia.value = elemento;
        nomFamilia.innerHTML = familias[elemento];
        document.getElementById("familias").appendChild(nomFamilia);
    };
    document.getElementById("familias").selectedIndex = seleccionada;
}

// --------------------------------------------
// Calcular los elementos por página
// --------------------------------------------

function calculoElementosPorPagina(){
    //Obtenemos tamaño de pantalla
    const iw = window.innerWidth;

    //Determinamos tipo de pantalla
    let size = null;
    for (let s in screen) {
        if (iw >= screen[s]) size = s;
    }
    paginador(productosFiltrados, actual());
    cargarPaginas(datos.productos, actual());
    return parseInt(size);
}

// --------------------------------------------
// Paginador
// --------------------------------------------

function paginador(productos, actual) {
    let paginas = productos.length / elementosPorPagina;
    if (paginas > Math.trunc(paginas)) {
        totalPaginas = Math.trunc(paginas) + 1; // si paginas sin decimales es menor se suma 1
    }else{
        totalPaginas = paginas; 
    }

    // controlamos activación de botones anteerior y siguiente
    if (actual == 1) {
        document.getElementById("liAnterior").classList.add("disabled");
    }else{
        document.getElementById("liAnterior").classList.remove("disabled");
    }

    // controlamos si estamos en la última página
    if (actual == totalPaginas) {
        document.getElementById("liSiguiente").classList.add("disabled");
    }else{
        docuemnt.getElementById("liSiguiente").classList.remove("disabled");
    }

    let fragmento = new DocumentFragment();
    

}


// --------------------------------------------
// Función actual
// --------------------------------------------
function actual() {
    const paginas = document.getElementById("paginas");
    for (const child of paginas.childNodes) {
        if (Array.from(child.classList).includes("active")) {
            return parseInt(child.firstChild.innerText);
        }
    }
}