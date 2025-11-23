const form = document.getElementById("formUsuario");

const nombreInput = document.getElementById("nombre");
const fechaInput = document.getElementById("fechaNacimiento");
const telefonoInput = document.getElementById("telefono");
const correoInput = document.getElementById("correo");
const edadSpan = document.getElementById("edad");

const errorNombre = document.getElementById("errorNombre");
const errorFecha = document.getElementById("errorFecha");
const errorTelefono = document.getElementById("errorTelefono");
const errorCorreo = document.getElementById("errorCorreo");

const resultadoDiv = document.getElementById("resultado");

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
const regexTelefono = /^[0-9]+$/;
const regexFecha = /^\d{2}-\d{2}-\d{4}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limpiarErrores() {
    errorNombre.textContent = "";
    errorFecha.textContent = "";
    errorTelefono.textContent = "";
    errorCorreo.textContent = "";
    resultadoDiv.textContent = "";
}

function limpiarInputs(){
    nombreInput.value = "";
    fechaInput.value = "";
    correoInput.value = "";
    telefonoInput.value = "";
    edadSpan.textContent = 0;
}

function calcularEdad(fechaTexto) {
    if (!regexFecha.test(fechaTexto)) {
        return null;
    }

    const [dd, mm, yyyy] = fechaTexto.split("-").map(Number);
    const fechaNac = new Date(yyyy, mm - 1, dd);

    if (isNaN(fechaNac.getTime())) {
        return null;
    }

    const hoy = new Date();
    let edad = hoy.getFullYear() - yyyy;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    if (mesActual < mm || (mesActual === mm & diaActual < dd)) {
        edad--;
    }

    return edad;
}

fechaInput.addEventListener("input", () => {
    const edad = calcularEdad(fechaInput.value.trim());
    edadSpan.textContent = edad !== null ? edad : 0;
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErrores();

    let valido = true;

    const nombre = nombreInput.value.trim();
    const fecha = fechaInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const correo = correoInput.value.trim();

    if (!regexNombre.test(nombre)) {
        errorNombre.textContent = "El nombre solo debe contener letras y espacios";
        valido = false;
    }

    if (!regexFecha.test(fecha)) {
        errorFecha.textContent = "La fecha debe tener el formato dd-mm-YYYY";
        valido = false;
    }

    if (!regexTelefono.test(telefono)) {
        errorTelefono.textContent = "El teléfono solo debe contener número [0-9]";
        valido = false;
    }

    if (!regexCorreo.test(correo)) {
        errorCorreo.textContent = "El correo debe ser del tipo ejemplo@dominio.com";
        valido = false;
    }

    if (!valido) {
        return;
    }

    const edad = calcularEdad(fecha);
    edadSpan.textContent = edad ?? 0;

    try {

        const resp = await fetch("http://localhost:3000/guardar_usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre,
                fechaNacimiento: fecha,
                telefono,
                correo
            }),
        });

        const data = await resp.json();

        if (!resp.ok) {
            resultadoDiv.textContent = data.mensaje || "Ocurrió un error.";
            resultadoDiv.style.color = "red";
        }
        else {
            resultadoDiv.textContent = data.mensaje + " ID: " + data.id;
            resultadoDiv.style.color = "green";

            limpiarInputs();
        }        

    } catch (error) {
        resultadoDiv.textContent = "Error al comunicarse con el servidor";
        resultadoDiv.style.color = "red";
    }
});
