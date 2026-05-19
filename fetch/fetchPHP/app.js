var formulario = document.getElementById('formulario')
formulario.addEventListener('submit', () => {
	event.preventDefault();
	var datos = new FormData(formulario)
/*	let usuario = datos.get('usuario')
	let pass = datos.get('pass')*/
	fetch ('post.php',{
		method: 'POST',
		body: datos
	}).then(res=>res.json()).then(data => console.log (data))
})