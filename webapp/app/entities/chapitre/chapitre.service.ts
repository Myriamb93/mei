import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Chapitre } from './chapitre.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class ChapitreService {

    private resourceUrl = 'api/chapitres';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(chapitre: Chapitre): Observable<Chapitre> {
        chapitre.date = '2017-01-01T00:00';
        chapitre.chapitreUser = JSON.parse('{"id":null,' +
            '"login":"",' +
            '"firstName":"",' +
            '"lastName":"",' +
            '"email":"",' +
            '"activated":true,' +
            '"langKey":"fr",' +
            '"imageUrl":null,' +
            '"resetKey":null,' +
            '"resetDate":null}'
        );
        let copy: Chapitre = Object.assign({}, chapitre);
        copy.date = this.dateUtils.toDate(chapitre.date);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(chapitre: Chapitre): Observable<Chapitre> {
        let copy: Chapitre = Object.assign({}, chapitre);
        copy.date = this.dateUtils.toDate(chapitre.date);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Chapitre> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.date = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.date);
            return jsonResponse;
        });
    }

    findx(id: number): Observable<Chapitre> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }



    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].date = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].date);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
