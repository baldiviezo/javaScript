class Tabla {
    // Cuado llame a la clase tengo que pasarle la cantidad de parametros que establesi en el constructor
    // El constructor es un método especial en JavaScript
    /*
    constructor(columnas, filas, titulo) {
        this.columnas = columnas;
        this.filas = filas;
        this.titulo = titulo;
    }*/
    constructor(data) {
        this.data = data;
    }

    crearTabla() {
        const tabla = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Crear encabezados de la tabla
        const encabezados = this.data.columnas.map((columna) => {
            const th = document.createElement('th');
            th.textContent = columna;
            return th;
        });
        thead.append(...encabezados);

        // Crear filas de la tabla
        const filas = this.data.filas.map((fila) => {
            const tr = document.createElement('tr');
            Object.keys(fila).forEach((key) => {
                const td = document.createElement('td');
                td.textContent = fila[key];
                tr.append(td);
            });
            return tr;
        });
        tbody.append(...filas);

        tabla.append(thead, tbody);
        return tabla;
    }
}




const tablaData = {
    columnas: ['Nombre', 'Apellido', 'Edad', 'Ciudad', 'País', 'Teléfono', 'Correo electrónico'],
    filas: [
      { nombre: 'Juan', apellido: 'Pérez', edad: 25, ciudad: 'Madrid', pais: 'España', telefono: '912345678', correo: 'juan.perez@example.com' },
      { nombre: 'María', apellido: 'Gómez', edad: 30, ciudad: 'Barcelona', pais: 'España', telefono: '933456789', correo: 'maria.gomez@example.com' },
      { nombre: 'Pedro', apellido: 'López', edad: 35, ciudad: 'Valencia', pais: 'España', telefono: '964567890', correo: 'pedro.lopez@example.com' },
      { nombre: 'Ana', apellido: 'García', edad: 20, ciudad: 'Sevilla', pais: 'España', telefono: '955678901', correo: 'ana.garcia@example.com' },
      { nombre: 'Luis', apellido: 'Martínez', edad: 40, ciudad: 'Málaga', pais: 'España', telefono: '966789012', correo: 'luis.martinez@example.com' },
      { nombre: 'Sofía', apellido: 'Rodríguez', edad: 40, ciudad: 'Granada', pais: 'España', telefono: '98901234', correo: 'Carlos', apellido: 'Hernandez', edad: 32, pais: 'España', telefono: '988901234', correo: 'carlos.hernandez@example.com' }
    ],
    titulo: 'Tabla de ejemplo'
  };


const tabla = new Tabla(tablaData);
const tablaHTML = tabla.crearTabla();
document.body.append(tablaHTML);