
const enum Bon {
    'first',
    'second',
    'third',
    'fourth'

};
import { Chapitre } from '../';
export class Question {
    constructor(
        public id?: number,
        public quest?: string,
        public first?: string,
        public second?: string,
        public third?: string,
        public fourth?: string,
        public bon?: Bon,
        public chapitre?: Chapitre,
    ) {
    }
}
