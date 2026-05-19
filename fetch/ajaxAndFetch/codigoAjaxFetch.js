function loadDoc() {
//Dentro de fetch va el url, fetch tiene el metodo get por defecto,no hace falta ponerlo
//peticion HTTP
fetch ("ajax_info.txt")
//se convierte la peticion recivida a tipo text
	.then(res=>res.text())
//ejecutamos la funcion
	.then(res=>document.getElementById("demo").innerHTML = res);
}

