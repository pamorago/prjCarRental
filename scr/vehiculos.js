// scr/vehiculos.js

// Datos de imágenes y descripciones por tipo de vehículo
const vehiculosData = {
  COM: [
    { img: "Compacto1.png", desc: "KIA PICANTO, Año 2016" },
    { img: "Compacto2.png", desc: "FORD FIESTA ST, Año 2015" },
    { img: "Compacto3.png", desc: "PEUGEOT 308, Año 2018" },
  ],
  MED: [
    { img: "Mediano1.png", desc: "HONDA CITY CAR, Año 2017" },
    { img: "Mediano2.png", desc: "MERCEDES SLS, Año 2015" },
    { img: "Mediano3.png", desc: "FORD FIESTA ST, Año 2016" },
  ],
  "4WD": [
    { img: "TodoTerreno1.png", desc: "TOYOTA FJ CRUISER, Año 2016" },
    { img: "TodoTerreno2.png", desc: "TOYOTA Prado, Año 2018" },
    { img: "TodoTerreno3.png", desc: "NISSAN JUKE, Año 2017" },
  ],
  FAM: [
    { img: "Familiar1.png", desc: "TOYOTA SIENNA, Año 2018" },
    { img: "Familiar2.png", desc: "DODGE GRAND CARAVANE, Año 2015" },
    { img: "Familiar3.png", desc: "HYUNDAI ELANTRA, Año 2016" },
  ],
};

let tipoSeleccionado = "COM"; // Por defecto Compacto

// Carga inicial o cambio de tipo de vehículo
function mostrarTodo() {
  const select = document.getElementById("tipoVehiculo");
  tipoSeleccionado = select.options[select.selectedIndex].id;

  const lista = vehiculosData[tipoSeleccionado];

  // Cargar imágenes pequeñas
  for (let i = 0; i < lista.length; i++) {
    document.getElementById(`img${i + 1}`).src = `images/${lista[i].img}`;
  }

  // Mostrar la primera imagen en grande
  mostrarImagen(1);
}

// Cambiar imagen principal y descripción
function mostrarImagen(num) {
  const lista = vehiculosData[tipoSeleccionado];
  const imagen = lista[num - 1];

  document.getElementById("imgVista").src = `images/${imagen.img}`;
  document.getElementById("infTCar").textContent = imagen.desc;
}
