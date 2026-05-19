function loadDoc() {
  const xhttp = new XMLHttpRequest();
//Abre una peticion, Especifica la solicitus (metodo de peticion, url)
  xhttp.open("GET", "ajax_info.txt");
//envia la peticion al servidor
  xhttp.send();
//onload define la funcion que se llamara cunado se reciba la solicitud
   xhttp.onload = function() {
//'response' Devuelve los datos de respuesta
//-responseText.-Devuelve los datos de respuesta como una cadena
//-responseXML.-Devuelve los datos de respuesta como datos XML
    document.getElementById("demo").innerHTML = this.response;
  }
}