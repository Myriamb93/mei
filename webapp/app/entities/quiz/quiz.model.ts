import { Chapitre } from '../';
import { User } from '../../shared';
export class Quiz {
    constructor(
        public id?: number,
        public date?: any,
        public result?: number,
        public chapitre?: Chapitre,
        public quizUser?: User,
    ) {
    }
}
