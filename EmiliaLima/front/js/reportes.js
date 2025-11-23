const botones = document.querySelectorAll("button[data-reporte]");
const contenido = document.getElementById("contenidoReporte");

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
                    else if (k === "fecha"){
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