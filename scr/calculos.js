document.addEventListener("DOMContentLoaded", () => {
  // Event listeners
  document
    .querySelector("#seguro")
    .addEventListener("change", MensajeTipoSeguro);
  document
    .querySelector('input[value="Calcular"]')
    .addEventListener("click", calcularTotal);
  document
    .querySelector('input[value="Guardar"]')
    .addEventListener("click", guardarCotizacion);

  // Load last quotation on page load
  cargarUltimaCotizacion();
});

function MensajeTipoSeguro() {
  const seguro = document.getElementById("seguro");
  const selectedOption = seguro.options[seguro.selectedIndex];
  let mensaje = "";

  switch (selectedOption.id) {
    case "PBO":
      mensaje = "PBO: daños a vehículo y terceros — $5.45/día";
      break;
    case "PED":
      mensaje =
        "PED: PBO + daños a propiedades, incendio e inundaciones — $9.50/día";
      break;
    case "PGM":
      mensaje = "PGM: PED + gastos médicos — $11.25/día";
      break;
  }
  alert(mensaje);
}

async function calcularTotal() {
  const fechaRetiro = new Date(
    document.querySelector('[name="fechaRetiro"]').value
  );
  const fechaDevolucion = new Date(
    document.querySelector('[name="fechadevolucion"]').value
  );
  const dias = Math.ceil(
    (fechaDevolucion - fechaRetiro) / (1000 * 60 * 60 * 24)
  );

  if (dias < 3 || dias > 365) {
    alert("El número de días debe estar entre 3 y 365");
    return;
  }

  document.querySelector('[name="dias"]').value = dias;

  // Calculate daily rate
  const tarifaVehiculo = parseFloat(
    document.getElementById("tipoVehiculo").value
  );
  const tarifaSeguro = parseFloat(document.getElementById("seguro").value);
  let tarifaDiaria = tarifaVehiculo + tarifaSeguro;

  // Apply duration discount
  if (dias > 30 && dias < 120) {
    tarifaDiaria *= 0.85; // 15% discount
  } else if (dias >= 120 && dias <= 365) {
    tarifaDiaria *= 0.75; // 25% discount
  }

  document.querySelector('[name="td"]').value = `$${tarifaDiaria.toFixed(2)}`;

  // Get region discount
  const codigoPais = document.getElementById("nacionalidad").value;
  const descuentoRegion = await obtenerDescuentoRegion(codigoPais);

  // Calculate final total
  let total = tarifaDiaria * dias;
  total -= total * descuentoRegion;

  document.querySelector('[name="totalPagar"]').value = `$${total.toFixed(2)}`;
}

async function obtenerDescuentoRegion(codigoPais) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codigoPais}`
    );
    const [pais] = await response.json();

    switch (pais.region) {
      case "Americas":
      case "Europe":
        return 0.1;
      case "Africa":
        return 0.05;
      default:
        return 0;
    }
  } catch (error) {
    console.error("Error obteniendo región:", error);
    return 0;
  }
}

function guardarCotizacion() {
  const cotizacion = {
    fechaRetiro: document.querySelector('[name="fechaRetiro"]').value,
    fechaDevolucion: document.querySelector('[name="fechadevolucion"]').value,
    nacionalidad: document.getElementById("nacionalidad").value,
    tipoVehiculo: document.getElementById("tipoVehiculo").value,
    seguro: document.getElementById("seguro").value,
    dias: document.querySelector('[name="dias"]').value,
    tarifaDiaria: document.querySelector('[name="td"]').value,
    totalPagar: document.querySelector('[name="totalPagar"]').value,
  };
  localStorage.setItem("ultimaCotizacion", JSON.stringify(cotizacion));
  alert("Cotización guardada exitosamente");
}

function cargarUltimaCotizacion() {
  const cotizacionGuardada = localStorage.getItem("ultimaCotizacion");
  if (cotizacionGuardada) {
    const cotizacion = JSON.parse(cotizacionGuardada);
    document.querySelector('[name="fechaRetiro"]').value =
      cotizacion.fechaRetiro;
    document.querySelector('[name="fechadevolucion"]').value =
      cotizacion.fechaDevolucion;
    document.getElementById("nacionalidad").value = cotizacion.nacionalidad;
    document.getElementById("tipoVehiculo").value = cotizacion.tipoVehiculo;
    document.getElementById("seguro").value = cotizacion.seguro;
    document.querySelector('[name="dias"]').value = cotizacion.dias;
    document.querySelector('[name="td"]').value = cotizacion.tarifaDiaria;
    document.querySelector('[name="totalPagar"]').value = cotizacion.totalPagar;
  }
}
