export class Interfaz {
	constructor(){}
	//Mostrar pregunta
	showQuestion(text){
		const questionTitle = document.getElementById('question');
		questionTitle.innerHTML = text;
	}
	//Crear botones
	showChoices(choices, callback){
		const choicesConteiner = document.getElementById('choice');
		choicesConteiner.innerHTML = '';
		for (let i = 0; i < choices.length; i++ ){
			//creamos un boton
			const boton = document.createElement('button');
			boton.innerText = choices[i];
			//Al boton ponerle una clase
			boton.className = 'button';
			choicesConteiner.append(boton);
			boton.addEventListener('click', ()=>callback(choices[i]));
			
		}
	}
	showScore(score){
		const quizEndHTML = `
			<h1>Resultado</h1>
			<h2>Your score is: ${score}</h2>
		`;
		const element = document.getElementById('quiz');
		element.innerHTML = quizEndHTML;
	}
	showProgess(currentIndex, total){
		const element = document.getElementById('progress');
		element.innerHTML = `Question ${currentIndex} of ${total}`;
	}
}