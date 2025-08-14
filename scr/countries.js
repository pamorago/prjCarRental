// scr/countries.js
async function cargarPaises() {
  const select = document.getElementById("nacionalidad");

  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    if (!res.ok) throw new Error("Error en la API");

    const data = await res.json();

    // Ordenar por nombre en español
    data.sort((a, b) => {
      const nombreA = a.translations?.spa?.common || a.name.common;
      const nombreB = b.translations?.spa?.common || b.name.common;
      return nombreA.localeCompare(nombreB);
    });

    // Obtener país guardado o usar Costa Rica por defecto
    let storedCountry = localStorage.getItem("pais") || "CRI";

    data.forEach((pais) => {
      const nombre = pais.translations?.spa?.common || pais.name.common;
      const option = document.createElement("option");
      option.value = pais.cca3;
      option.textContent = nombre;

      if (pais.cca3 === storedCountry) {
        option.selected = true;
      }

      select.appendChild(option);
    });
  } catch (error) {
    console.warn(
      "Error cargando países, usando Costa Rica por defecto:",
      error
    );

    // Si falla la API, agregar solo Costa Rica
    const option = document.createElement("option");
    option.value = "CRI";
    option.textContent = "Costa Rica";
    option.selected = true;
    select.appendChild(option);
  }
}

document.addEventListener("DOMContentLoaded", cargarPaises);
