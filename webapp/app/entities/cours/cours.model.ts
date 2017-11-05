import { Chapitre } from '../';
export class Cours {
    constructor(
        public id?: number,
        public descrip?: string,
        public icone?: any,
        public coursChapitre?: Chapitre,
    ) {
    }
}
