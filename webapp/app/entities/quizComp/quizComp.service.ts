/**
 * Created by Dima on 07/04/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Quiz } from '../quiz/quiz.model';
import { QuizService } from '../quiz/quiz.service';
import { Question } from '../question/question.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class QuizCompService {

    private resourceUrl = 'api/generateQuiz';

    constructor(private http: Http, private dateUtils: DateUtils, private quizService: QuizService) { }

    generateQuiz(id: Number): Observable<Question> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();

        });
    }





}
