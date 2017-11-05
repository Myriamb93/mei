/**
 * Created by Dima on 07/04/2017.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import {QuizCompService} from './quizComp.service';
import {QuizService} from '../quiz/quiz.service';
import {QuizComponent} from '../quiz/quiz.component';
import {Quiz} from '../quiz/quiz.model';
import { Response } from '@angular/http';
import { Chapitre, ChapitreService } from '../';
import { User, UserService } from '../../shared';


@Component({
    selector: 'jhi-quiz-comp',
    templateUrl: './quizComp.component.html'
})


export class QuizCompComponent implements OnInit, OnDestroy {
    isSaving: any;
    mode = 'quiz';
    currentAccount: any;
    error: any;
    quiz: any;
    verify: any ;
    score: any ;
    success: any;
    chapitre: any;
    routeData: any;
    sub = 'false';
    answers: any;
    youranswer: any;
    lesQuestions: any;
    totalItems: any;
    queryCount: any;
    occ: any ;
    itemsPerPage: any;
    page: any;
    predicate: any;
    theID: any ;
    previousPage: any;
    reverse: any;
    private subscription: any;
    chapitreX: Chapitre;
    xId: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private quizCompService: QuizCompService,
        private alertService: AlertService,
        private principal: Principal,
        private quizService: QuizService,
        private activatedRoute: ActivatedRoute,
        private chapitreService: ChapitreService,

        private route: ActivatedRoute
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.jhiLanguageService.setLocations(['quizComp']);
    }


    ngOnInit() {
        // sachant que 10 devrait etre parametrable
        this.youranswer = new Array(10);
        this.answers = new Array(10);
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.subscription = this.route.params.subscribe(params => {
            this.generate(params['id']);
           this.theID = params['id'] ;
        });

        this.load(this.theID);
    }

    generate (id: number) {
        this.quizCompService.generateQuiz(id).subscribe(response => {
            this.lesQuestions = response ;
        });



    }

    check_answer (bon: String, rep: string, youranswer: string, i: number) {

        this.youranswer[i]  = youranswer ;
        if (bon === rep) {
            this.answers[i] = 1 ;
        }else {
            this.answers[i] = 0 ;

          }

    }


    submit_quiz() {
        if ( confirm (' Etes-vous sur de valider vos réponses ? ') === true ) {
            this.mode = 'resultat' ;

            this.occ = this.answers.filter(function(val){
                return val === 1;
            }).length;

            this.score = this.occ * 10 ;


            this.quiz = new Quiz();
            this.quiz.result = this.occ * 10;
            this.quiz.chapitre = this.chapitreX ;
            this.quiz.quizUser = JSON.parse('{"id":null,' +
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
            this.save();

        } else {
            this.mode = 'quiz' ;
        }

   }
    save () {
        this.isSaving = true;
        if (this.quiz.id !== undefined) {
            this.quizService.update(this.quiz)
                .subscribe((res: Quiz) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.quizService.create(this.quiz)
                .subscribe((res: Quiz) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }
    private onSaveSuccess (result: Quiz) {

        this.isSaving = false;

    }



    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    load (id: number) {
        this.chapitreService.find(id).subscribe(chapitre => {
            this.chapitre = chapitre.descrip;
            this.chapitreX = chapitre;
            this.xId = chapitre.id;
        });
    }

    previousState() {
        window.history.back();
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

}
