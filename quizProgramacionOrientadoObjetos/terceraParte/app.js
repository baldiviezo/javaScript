//importamos la variable constante data
import {newquestion} from './questions.js';
import {Quiz} from	'./quiz.js';
main();
function main(){
	const quiz = new Quiz(newquestion);
	quiz.guess('dfsf');
	console.log(quiz);
	console.log(quiz.getQuestionIndex());
}