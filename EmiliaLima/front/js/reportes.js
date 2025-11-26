const botones = document.querySelectorAll("button[data-reporte]");
const contenido = document.getElementById("contenidoReporte");
const btnReporteTop = document.getElementById("btnReporteTop");

const encabezados = {
    id: "ID",
    nombre: "Nombre completo",
    fecha: "Fecha Nacimiento",
    telefono: "Teléfono",
    correo: "Correo electróncio",
    creacion: "Fecha de creación",
    estado: "Estado del usuario"
};

function formatearFecha(fecha) {
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const anio = d.getFullYear();
    return `${dia}-${mes}-${anio}`;
}

botones.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const codigo = btn.getAttribute("data-reporte");

        contenido.textContent = "Cargando reporte...";

        try {
            const resp = await fetch(`http://localhost:3000/ejecutar_reporte/${codigo}`);
            const data = await resp.json();

            if (!resp.ok) {
                contenido.textContent = data.mensaje || "Error al ejecutar el reporte";
                contenido.style.color = "red";
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                contenido.textContent = "Sin datos para este reporte";
                contenido.style.color = "black";
                return;
            }

            const table = document.createElement("table");
            table.border = "1";
            table.cellPadding = "5";
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            const keys = Object.keys(data[0]);

            keys.forEach(k => {
                const th = document.createElement("th");
                th.textContent = encabezados[k] || k;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");

            data.forEach(row => {
                const tr = document.createElement("tr");

                keys.forEach(k => {
                    const td = document.createElement("td");

                    if (k === "creacion") {
                        td.textContent = formatearFecha(row[k]);
                    }
                    else if (k === "fecha") {
                        td.textContent = formatearFecha(row[k]);
                    }
                    else {
                        td.textContent = row[k];
                    }

                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);

            contenido.innerHTML = "";
            contenido.appendChild(table);

        } catch (err) {
            console.error(err);
            contenido.textContent = "Error al comunicarse con el servidor.";
        }
    });
});

btnReporteTop.addEventListener("click", async () => {
    try {

        const resp = await fetch(`http://localhost:3000/reportes/top`);
        const data = await resp.json();

        if (!resp.ok) {
            contenido.textContent = data.mensaje || "Error al ejecutar el reporte";
            contenido.style.color = "red";
            return;
        }

        if (!Array.isArray(data) || data.length === 0) {
            contenido.textContent = "Sin datos para este reporte";
            contenido.style.color = "black";
            return;
        }

        const table = document.createElement("table");
        table.border = "1";
        table.cellPadding = "5";
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = "ID";

        const tdNombre = document.createElement("td");
        tdNombre.textContent = "Nombre";

        const tdFechaNacimiento = document.createElement("td");
        tdFechaNacimiento.textContent = "Fecha Nacimiento";

        const tdTelefono = document.createElement("td");
        tdTelefono.textContent = "Teléfono";

        const tdCorreo = document.createElement("td");
        tdCorreo.textContent = "Correo Eléctronico";

        const tdCreacion = document.createElement("td");
        tdCreacion.textContent = "Fecha Creación";

        const tdEstado = document.createElement("td");
        tdEstado.textContent = "Estado";

        const tdPunteo = document.createElement("td");
        tdPunteo.textContent = "Punteo";

        headerRow.appendChild(tdId);
        headerRow.appendChild(tdNombre);
        headerRow.appendChild(tdFechaNacimiento);
        headerRow.appendChild(tdTelefono);
        headerRow.appendChild(tdCorreo);
        headerRow.appendChild(tdCreacion);
        headerRow.appendChild(tdEstado);
        headerRow.appendChild(tdPunteo);

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        data.forEach(row => {
            const tr = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = row.id;

            const tdNombre = document.createElement("td");
            tdNombre.textContent = row.nombre;

            const tdFechaNacimiento = document.createElement("td");
            tdFechaNacimiento.textContent = formatearFecha(row.fecha);

            const tdTelefono = document.createElement("td");
            tdTelefono.textContent = row.telefono;

            const tdCorreo = document.createElement("td");
            tdCorreo.textContent = row.correo;

            const tdCreacion = document.createElement("td");
            tdCreacion.textContent = formatearFecha(row.creacion);

            const tdEstado = document.createElement("td");
            tdEstado.textContent = row.estado;

            const tdPunteo = document.createElement("td");
            tdPunteo.textContent = row.punteo;

            tr.appendChild(tdId);
            tr.appendChild(tdNombre);
            tr.appendChild(tdFechaNacimiento);
            tr.appendChild(tdTelefono);
            tr.appendChild(tdCorreo);
            tr.appendChild(tdCreacion);
            tr.appendChild(tdEstado);
            tr.appendChild(tdPunteo);

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        contenido.innerHTML = "";
        contenido.appendChild(table);

    } catch (error) {
        console.error(error);
        console.log(error);
        contenido.textContent = "Error al comunicarse con el servidor.";
    }
});