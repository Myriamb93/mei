import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tquestion } from '../tquestion/tquestion.model';
import { Treponse } from '../treponse/treponse.model';

import {Tresult} from '../tresult/tresult.model';





@Injectable()
export class QcmService {

    private resourceUrl = 'api/tquestions/qcm';
    private qcmResourceUrl = 'api/treponses/qcm';
    constructor(private http: Http) { }

    generateQcm(id: Number): Observable<Tquestion[]> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    saveQcm(id: number, T: Array<Treponse>): Observable<Tresult> {
      // const copy = this.convert(T);
        return this.http.post(this.qcmResourceUrl + '/' + id, T).map((res: Response) => {
            return res.json();
        });
    }

    private convert(T: Treponse[]): Treponse[] {
        const copy: Treponse[] = Object.assign({}, T);
        return copy;
    }






}
