//Normalmente las clases se crean con mayuscula
export class Question{
	
	//el constructor es un objeto que se crea al momento de crear la clase
	
	constructor(text, choice, answer){
		//propiedades
		this.text = text;
		this.choice = choice;
		this.answer = answer;
	}
	//metodo
	correctAnswer(choice){
		return choice === this.answer;
	}
}

