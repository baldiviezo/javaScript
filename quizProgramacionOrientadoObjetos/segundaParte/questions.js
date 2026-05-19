
import {Question} from './question.js';
import {data} from './data.js';

//map recore todos los areglos luego retorna un nuevo areglo
//newquestion es un arreglo de clases, Las clases creadas tienen las propiedades y metodos de la clase
//las clases no tienen nombre solo estan guardados en el array 
export const newquestion = data.map(question => new Question(question.question, question.choice, question.answer));
