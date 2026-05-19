//Importamos la clase Question del archivo question.js
import {Question} from './question.js';
import {data} from './data.js';
//map recore todos los areglos luego retorna un nuevo areglo
//newquestion es un arreglo de clases
export const newquestion = data.map(question => new Question(question.question, question.choices, question.answer));
