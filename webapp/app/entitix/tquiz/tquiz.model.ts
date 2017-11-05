import { BaseEntity } from './../../shared';

export class Tquiz implements BaseEntity {
    constructor(
        public id?: number,
        public descrip?: string,
        public nbre?: number,
        public iconeContentType?: string,
        public icone?: any,
        public quizResults?: BaseEntity[],
        public questionQuizs?: BaseEntity[],
    ) {
    }
}
