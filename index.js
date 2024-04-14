// Define variables
let datos;
let idiomaActual;

fetch('familias.json')
.then(response => response.json())
.then(familias => {
    idiomaActual = "español";
    datosFamilia = familias;
    
    cargaFiltroFamilias(familias[idiomaActual]);
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


