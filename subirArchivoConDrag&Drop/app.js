const dropArea = document.querySelector('.drop__area');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#inputFile');
let files;
button.addEventListener('click', ()=>{
	//llamamos al evento click del input
	input.click();
})
//cada vez que cambie los archivos del input file
input.addEventListener('change', ()=>{
	//this es input
	files = this.files;
	dropArea.classList.add('active');
	showFiles(files);
	dropArea.classList.remove('active');

})
/*Cuando tenemos elementos q se estan arraztrando se activa*/
dropArea.addEventListener('dragover', (e)=>{
	//Se necesita poner el preventDefault
	e.preventDefault();
	dropArea.classList.add('active');
	dragText.textContent = 'Suelta para subir los archivos';

});
/*Cunado estemos arrastrando pero no estamos dentro de la zona*/
dropArea.addEventListener('dragleave', (e)=>{
	//Se necesita poner el preventDefault
	e.preventDefault();
	dropArea.classList.remove('active');
	dragText.textContent = 'Arrastra y suelta imágenes';
});
/*Cuando soltamos el archivo q estamos arrastrando dentro de la zona*/
dropArea.addEventListener('drop', (e)=>{
	//Se necesita poner el preventDefault para que al momento de soltar no abra la imagen en el navegador
	e.preventDefault();
	files = e.dataTransfer.files;
	showFiles(files);
	dropArea.classList.remove('active');
	dragText.textContent = 'Arrastra y suelta imágenes';
});
function showFiles(file){
	//Validar la cantidad de imagenes q se esta subiendo
	//files,length se no es definido quiere decir q solo es una archivo
	if(files.length === undefined){
		processFile(files);
	}else{
		for(const file of files){
			processFile(file);
		}
	}
}
function processFile(file){
	const docType = file.type;
	const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
	if(validExtensions.includes(docType)){
		//archivo valido
		const fileReader = new FileReader();
		const id = `file-${Math.random().toString(32).substring(7)}`;
		fileReader.addEventListener('load', e=>{
			const fileUrl = fileReader.result;
			const image =`
				<div id='${id} class='file__container'>
					<img src='${fileUrl}' alt='${file.name}' width='50px'>
					<div class='status'>
						<span>${file.name}</span>
						<span class='status__text'>
							Loading...
						</span>
					</div>
				</div>
			`;
			const html = document.querySelector('#preview').innerHTML
			document.querySelector('#preview').innerHTML = image + html;
		});
		fileReader.readAsDataURL(file);
		//uploadFile(file, id);
	}else{
		//archivo no valido
		alert('No es una archivo valido');
	}
}
function uploadFIle(file){

}