import { BaseEntity } from './../../shared';

export class Tresult implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public nbre?: number,
        public result?: number,
        public resultUserId?: number,
        public resultQuizId?: number,
        public resultReponses?: BaseEntity[],
    ) {
    }
}


