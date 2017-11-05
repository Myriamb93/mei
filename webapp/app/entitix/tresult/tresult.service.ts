import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Tresult } from './tresult.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {TreponseDetails} from '../treponse/treponse.model';

@Injectable()
export class TresultService {

    private resourceUrl = 'api/tresults';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(tresult: Tresult): Observable<Tresult> {
        const copy = this.convert(tresult);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(tresult: Tresult): Observable<Tresult> {
        const copy = this.convert(tresult);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Tresult> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    findReponses(id: number): Observable<TreponseDetails[]> {
        return this.http.get( 'api/treponsesDetails/' + id).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertDateTimeFromServer(entity.date);
    }

    private convert(tresult: Tresult): Tresult {
        const copy: Tresult = Object.assign({}, tresult);

        copy.date = this.dateUtils.toDate(tresult.date);
        return copy;
    }
}
