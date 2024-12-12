/*
//----Promesas
//Tiene dos funciones asincronas resolve y reject
let nombre = "Jhonatan";
const promesa = new Promise((resolve, reject) => {
    if (nombre === "Jhonatan") {
        resolve("El nombre es Jhonatan");
    } else {
        reject("El nombre no es Jhonatan");
    }
})
//----then es un metodo que nos devuelve el resultado de la promesa y catch es un metodo que nos devuelve el error
promesa
    .then((mensaje) => console.log(mensaje))
    .catch((mensaje) => console.log(mensaje))

//Las promesas son funciones asincronas, es decir, esperan a recibir la informacion para luego ejecutar el codigo que se encuentra dentro de la promesa
let objeto = {
    propiedad1: "valor1",
    propiedad2: "valor2",
    propiedad3: "valor3"
}
const obtenerObjeto = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(objeto)
    }, 1000)
})

obtenerObjeto
    .then((resultado) => console.log(resultado))

//----Otra froma de escribir promesas
const obtenerInformacion = (texto) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(texto)
        }, Math.random() * 1000)
    })
}

//----No se ejecutan las promesas de forma secuencial
obtenerInformacion("Hola")
    .then((resultado) => console.log(resultado))
obtenerInformacion("Adios")
    .then((resultado) => console.log(resultado))
obtenerInformacion("Chau")
    .then((resultado) => console.log(resultado))
*/
//----Async & Await
/*
const obtenerInformacion = (texto) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(texto)
        }, Math.random() * 1000)
    })
}
console.log(obtenerInformacion("Hola"));
const mostrarInformacion = async () => {
    try {
        const dato1 = await obtenerInformacion("Hola");
        console.log(dato1);
        const dato2 = await obtenerInformacion("Adios");
        console.log(dato2);
        const dato3 = await obtenerInformacion("Chau");
        console.log(dato3);
    } catch (error) {
        console.log(error)
    }
}

//Se ejecutan las promesas de forma secuencial
mostrarInformacion();
*/
//----Fetch con async & await
/*
const obtenerNombre = async () => {
    const response = await fetch("./informacion.txt");
    const informacion = await response.json();
    console.log(informacion.nombre);
}

obtenerNombre();
*/


/*
async function funcion1(texto) {

      setTimeout(() => {
        console.log(texto);
      }, Math.random() * 1000);

  }

async function funcion2 () {
    await funcion1 ("Hola")
    await funcion1 ("Adios")
    await funcion1 ("Chau")
}
//La funcion1 imprime los tres mensajes, imprime los mensajes de uan forma desordenada. 
funcion2();
*/
/*
async function funcion1(texto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(texto);
   
          }, Math.random() * 1000);
    })   
}

async function funcion2 () {
  await funcion1 ("Hola")
  await funcion1 ("Adios")
  await funcion1 ("Chau")
}

funcion2();

//sin solve solo imrime hola 
*/
async function funcion1(texto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(texto);
          }, Math.random() * 1000);
    })   
}

async function funcion2 () {
funcion1 ("Hola").then(() => {
    console.log("Hola")
})
  await funcion1 ("Adios")
  await funcion1 ("Chau")
  console.log(await funcion1 ("Chau"))
  console.log(funcion1 ("Chau"))
}

funcion2();
//Imprime los tres en orden correcto