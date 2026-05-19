//Normalmente el nombre de las clases se inicia con mayuscula
export class Question{
	//El constructor es un objeto que se crea al momento de crear la clase
	constructor(text, choice, answer){
		//propiedades
		this.text = text;
		this.choice = choice;
		this.answer = answer;
	}
	//Metodo que devuelve true or false
	correctAnswer(choice){
		return choice === this.answer;
	}
}

