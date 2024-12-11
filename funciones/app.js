/*
El problema es que la función principal no espera a que la función secundaria termine de ejecutarse antes de imprimir el valor de x. Esto se debe a que JavaScript es un lenguaje de ejecución síncrona, lo que significa que ejecuta el código de manera secuencial, línea por línea.

Cuando la función principal llama a la función secundaria, no espera a que esta termine de ejecutarse antes de seguir adelante con la ejecución del código. Por lo tanto, cuando imprime el valor de x, todavía tiene el valor inicial de 1, porque la función secundaria todavía no ha tenido tiempo de ejecutarse y cambiar el valor de x a 2.
*/
/*
let x = 1;
principal();
function principal() {
    secundaria();
    console.log('La variable x es: ' + x);
}
function secundaria() {
    setTimeout(() => {
        x = 2;
    }, 1000);
}
*/
//EN EL ANTERIOR EJEMPLO, LA FUNCION PRINCIPAL LLAMA A LA FUNCION SECUNDARIA, PERO LA FUNCION PRINCIPAL NO ESPERA A QUE LA FUNCION SECUNDARIA TERMINE DE EJECUTARSE ANTES DE IMPRIMIR EL VALOR DE X

/*
let x = 1;
principal();

function principal() {
    secundaria(function() {
        console.log('La variable x es: ' + x);
    });
}

function secundaria(callback) {
    setTimeout(function() {
        x = 2;
        callback();
    }, 1000); // simulación de tiempo de ejecución
}


*/
/*
let x = 1;
principal();

function principal() {
    secundaria().then(() => {
        console.log(x); // imprime 2
    });
}

function secundaria() {
    return new Promise(resolve => {
        setTimeout(function () {
            x = 2;
            resolve();
        }, 1000);
    });
}

obtenerInformacionDeGitHub();

function obtenerInformacionDeGitHub() {
    const url = 'https://api.github.com/users/octocat';
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
    }).catch(error => console.error('Error:', error));
}
*/
//EN EL ANTERIOR EJEMPLO, LA FUNCION PRINCIPAL LLAMA A LA FUNCION SECUNDARIA Y LA FUNCION PRINCIPAL ESPERA A QUE LA FUNCION SECUNDARIA TERMINE DE EJECUTARSE ANTES DE IMPRIMIR EL VALOR DE X. LA FUNCION OBTENERINFORMACIONDEGITHUB SE LLAMA DESPUES DE LA FUNCION PRINCIPAL, PERO LA FUNCION OBTENERINFORMACIONDEGITHUB NO ESPERA A QUE LA FUNCION PRINCIPAL TERMINE.
/*

let x = 1;

function principal() {
    return new Promise(resolve => {
        secundaria().then(() => {
            console.log(x); // imprime 2
            resolve(); // resuelve la promesa
        });
    });
}

function secundaria() {
    return new Promise(resolve => {
        setTimeout(function () {
            x = 2;
            resolve();
        }, 1000);
    });
}

obtenerInformacionDeGitHub();

function obtenerInformacionDeGitHub() {
    const url = 'https://api.github.com/users/octocat';
    fetch(url).then(response => response.json()).then(data => {
        principal().then(() => {
            console.log(data); // ahora espera a que principal termine de ejecutarse
        });
    }).catch(error => console.error('Error:', error));
}

*/

//usand la funcion alert
let x = 1;
principal();
function principal() {
    secundaria().then(() => {
        alert('que pasara?')
    })
    
}
function secundaria() {
    return new Promise((resolve) => {
        setTimeout(() => {
            x = 2;
            alert('La variable x es: ' + x);
            resolve();
        }, 1000);
    });
}