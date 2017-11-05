import { User } from '../../shared';
import { Cours } from '../';
export class Examen {
    constructor(
        public id?: number,
        public date?: any,
        public result?: number,
        public examenUser?: User,
        public examenCours?: Cours,
    ) {
    }
}
