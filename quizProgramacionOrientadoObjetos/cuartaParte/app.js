//importamos la variable constante data
import {newquestion} from './questions.js';
import {Quiz} from	'./quiz.js';
import {Interfaz} from './interfaz.js';

const rederPage =(quiz, interfaz) =>{
	if(quiz.isEnded()){
		interfaz.showScore(quiz.score);
	}else{
		interfaz.showQuestion(quiz.getQuestionIndex().text);
		interfaz.showChoices(quiz.getQuestionIndex().choice, (a)=>{
			quiz.guess(a);
			rederPage(quiz, interfaz);
			}
		);
	interfaz.showProgess(quiz.questionIndex + 1, quiz.questions.length);
	}
}

function main(){
	const quiz = new Quiz(newquestion);
	const interfaz = new Interfaz();
	rederPage(quiz, interfaz);
	
}
main();