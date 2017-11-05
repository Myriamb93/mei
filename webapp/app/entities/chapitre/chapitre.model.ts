import { Cours } from '../';
import { Question } from '../';
import { Quiz } from '../';
import { User } from '../../shared';
export class Chapitre {
    constructor(
        public id?: number,
        public descrip?: string,
        public video?: string,
        public rang?: number,
        public fichier?: any,
        public date?: any,
        public cours?: Cours,
        public chapitreQuestion?: Question,
        public chapitreQuiz?: Quiz,
        public chapitreUser?: User,
    ) {
    }
}
