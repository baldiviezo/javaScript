/*<<<<<<<<<<<<<<PARA IMPRIMIR LA INFORMACION EN FORMA DE CARDS>>>>>>>>>>>>>>>>>>>>*/
const product = [
	{
		id:0,
		image: 'image/gg-1.jpg',
		title: 'Z Flip Foldable Mobile',
		price: 120
	},
	{
		id:1,
		image: 'image/hh-2.jpg',
		title: 'Air Pods Pro',
		price: 60
	},
	{
		id:2,
		image: 'image/ee-3.jpg',
		title: '250D DSLR Camera',
		price: 230
	},
	{
		id:3,
		image: 'image/aa-1.jpg',
		title: 'Head Phones',
		price: 100
	}
];
//Product es un array de objeto
console.log(product);
//map recorre el array objeto por objeto item = un objeto
const categories = [...new Set(product.map((item)=>{
	return item;
}))]
console.log(categories);
let i = 0;
document.getElementById('root').innerHTML = categories.map((item)=>{
	console.log(item)
	var {image, title, price} = item;
	return (
		`<div class='box'>
			<div class='img-box'>
				<img class='images' src=${image}></img>
			</div>
			<div class='bottom'>
				<p>${title}</p>
				<h2>${price}.00</h2>`+
				"<button onclick='addtocart("+(i++)+")'>Add</button>"+
			`</div>
		</div>`
	)
}).join('')
/*
El método devuelve una matriz como una cadena.join()

El método no cambia la matriz original.join()

Se puede especificar cualquier separador. El valor predeterminado es coma (,).
*/
/*<<<<<<<<<<<<<<<<<<<<<<<<<CREAR LA CARD EN LA LISTA>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

var cart = [];

function displaycart(a) {
	let j = 0, total=0;
	//PARA QUE EL NUMERO DEL CARRITO CUENTE LOS PRODUCTOS AGRAGADOS
	document.getElementById('count').innerHTML	= cart.length;
	if(cart.length == 0 ){
		document.getElementById('cartItem').innerHTML = 'Your cart is empty'; //tu card esta vacia
		//para sumar el total
		document.getElementById('total').innerHTML	= '$ '+0+'.00'; 
	}else{
		document.getElementById('cartItem').innerHTML = cart.map((items)=>{
			var {image, title, price} = items;
			//para sumar el total
			total=total+price;
			document.getElementById('total').innerHTML	= '$ '+total+'.00';
			return (
				`<div class='cart-item'>
					<div class='row-img'>
						<img class='rowimg' src=${image}>
					</div>
					<p style='font-size:12px;'>${title}</p>
					<h2 style='font-size: 15px;'>${price}.00</h2>`+
					"<img src='trash.svg' onclick='delElement("+(j++)+")'></img></div>"
			);
		}).join('')
	}
}

/*<<<<<<<<<<<<<<<<<FUNCION AÑADIR LA CARD A LA LISTA >>>>>>>>>>>>>>.*/
function addtocart(a){
	cart.push({...categories[a]});
	displaycart();
}
/*<<<<<<<<<<<<<<<<<FUNCION ELIMINAR LAS CARD AÑADIDAS A LA LISTA>>>>>>>>>>>>>>.*/
function delElement(a){
	cart.splice	(a, 1);
	displaycart	();
}