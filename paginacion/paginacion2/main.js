const ul = document.querySelector('.wrapper ul');
let allPages = 15;
function paginacion(allPages, page){
	let li = '';
	let beforePages = page-1;
	let afterPages = page +1;
	let liActive;
	totalPaginas(page);
	if(page > 1){
		li+= `<li class="btn" onclick="paginacion(allPages, ${page-1})"><img src="arowLeft.svg"></li>`;
	}
	for(let pageLength = beforePages; pageLength <= afterPages; pageLength++){
		if(pageLength > allPages){
			continue;
		}
		if(pageLength == 0){
			pageLength = pageLength +1;
		}
		if(page == pageLength){
			liActive = 'active';
		}else{
			liActive = '';
		}
		li+= `<li class="numb ${liActive}" onclick="paginacion(allPages, ${pageLength})"><span>${pageLength}</span></li>`;
	}
	if(page < allPages){
		li += `<li class="btn" onclick="paginacion(allPages, ${page+1})"><img src="arowRight.svg"></li>`;
	}
	ul.innerHTML = li;

}
paginacion(allPages,1);
function totalPaginas(page){
	const h2= document.querySelector('.showPage h2');
	h2.innerHTML =`Pagina ${page}/${allPages}, 100 Productos`;

}
