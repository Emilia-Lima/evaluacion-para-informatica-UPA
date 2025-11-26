
//EXPRESIONES REGULARES PARA VALIDACIONES
export const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
export const regexTelefono = /^[1-9]?[0-9]{1}$|^100$/;
export const regexPunteo = /^[1-100]+$/;
export const regexFecha = /^\d{2}-\d{2}-\d{4}$/;
export const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function calcularEdad(fechaTexto){
    if(!regexFecha.test(fechaTexto)){
        return null;
    }

    const [dd, mm, yyyy] = fechaTexto.split("-").map(Number);
    const fechaNac = new Date(yyyy, mm-1, dd);
    if (isNaN(fechaNac.getTime())){
        return null;
    }

    const hoy = new Date();
    let edad = hoy.getFullYear() - yyyy;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    if (mesActual < mm || (mesActual === mm && diaActual < dd)){
        edad--;
    }

    return edad;
}

export function convertirFechaDdMmYyyyAIso(fechaTexto) {
  const [dd, mm, yyyy] = fechaTexto.split("-").map(Number);
  return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
}

export function fechaHoyIso() {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

