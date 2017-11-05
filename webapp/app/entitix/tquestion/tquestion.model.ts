import { BaseEntity } from './../../shared';

const enum Level {
    'EASY',
    'MEDIUM',
    'HARD'
}

export class Tquestion implements BaseEntity {
    constructor(
        public id?: number,
        public quest?: string,
        public first?: string,
        public second?: string,
        public third?: string,
        public fourth?: string,
        public vfirst?: boolean,
        public vsecond?: boolean,
        public vthird?: boolean,
        public vfourth?: boolean,
        public level?: Level,
        public protect?: boolean,
        public activation?: boolean,
        public questionQuizId?: number,
        public qestionReponses?: BaseEntity[],
    ) {
        this.vfirst = false;
        this.vsecond = false;
        this.vthird = false;
        this.vfourth = false;
        this.protect = false;
        this.activation = false;
    }
}
