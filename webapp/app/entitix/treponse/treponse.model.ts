import { BaseEntity } from './../../shared';
import {Tquestion} from '../tquestion/tquestion.model';
import {Tresult} from '../tresult/tresult.model';

export class Treponse implements BaseEntity {
    constructor(
        public id?: number,
        public rfirst?: boolean,
        public rsecond?: boolean,
        public rthird?: boolean,
        public rfourth?: boolean,
        public reponseQuestionId?: number,
        public reponseResultId?: number,
    ) {
        this.rfirst = false;
        this.rsecond = false;
        this.rthird = false;
        this.rfourth = false;
    }
}

export class TreponseDetails implements BaseEntity {
    constructor(
        public id?: number,
        public rfirst?: boolean,
        public rsecond?: boolean,
        public rthird?: boolean,
        public rfourth?: boolean,
        public reponseQuestionId?: Tquestion,
        public reponseResultId?: Tresult,
    ) {

    }
}

