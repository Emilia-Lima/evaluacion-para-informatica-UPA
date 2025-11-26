const formPunteo = document.getElementById("formPunteoUsuario");

const correoInput = document.getElementById("correo");
const punteoInput = document.getElementById("punteo");

const errorCorreo = document.getElementById("errorCorreo");
const errorPunteo = document.getElementById("errorPunteo");

const resultadoDiv = document.getElementById("resultado");

const regexPunteo = /^[1-9]?[0-9]{1}$|^100$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limpiarErrores() {
    errorCorreo.textContent = "";
    errorPunteo.textContent = "";
}

function limpiarInputs() {
    correoInput.value = "";
    punteoInput.value = "";
}

formPunteo.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErrores();

    let valido = true;

    const correo = correoInput.value.trim();
    const punteo = punteoInput.value.trim();

    if (!correo || !punteo) {
        resultadoDiv.textContent = "Todos los campos son requeridos";
        resultadoDiv.style.color = "red";
        valido = false;
    }

    if (!regexCorreo.test(correo)) {
        valido = false;
        errorCorreo.textContent = "El correo debe ser del tipo ejemplo@dominio.com";
    }

    if (!regexPunteo.test(punteo)) {
        valido = false;
        errorPunteo.textContent = "El punteo tiene que ser un número entre [1-100]"
    }

    if (!valido) {
        return;
    }

    try {

        const resp = await fetch("http://localhost:3000/ingresar_punteo", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                correo,
                punteo
            }),
        })

        const data = await resp.json();

        if (!resp.ok) {
            resultadoDiv.textContent = data.mensaje || "Ocurrió un error.";
            resultadoDiv.style.color = "red";
        }
        else {
            resultadoDiv.textContent = data.mensaje;
            resultadoDiv.style.color = "green";

            limpiarInputs();
        }

    } catch (error) {
        resultadoDiv.textContent = "Error al comunicarse con el servidor";
        resultadoDiv.style.color = "red";
    }

})

