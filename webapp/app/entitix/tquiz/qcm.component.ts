import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Tquiz } from './tquiz.model';
import { Tquestion } from '../tquestion/tquestion.model';
import { Treponse } from '../treponse/treponse.model';

import { TquizService } from './tquiz.service';

import {QcmService} from './qcm.service';
import { EventManager } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import {Tresult} from '../tresult/tresult.model';

@Component({
    selector: 'jhi-qcm',
    templateUrl: './qcm.component.html'
})
export class QcmComponent implements OnInit, OnDestroy {
    id: number;
    tquiz: Tquiz;
    tresult: Tresult;
    tquestions: Tquestion[];
    treponses = new Array<Treponse>();
    treponse: Treponse;
    nbre: number;
    eventSubscriber: Subscription;


    private subscription: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private eventManager: EventManager,
        private tquizService: TquizService,
        private route: ActivatedRoute,
        private qcmService: QcmService,
    ) {
        this.jhiLanguageService.setLocations(['tquiz']);

    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.loadQuiz(params['id']);
            this.loadQuest(params['id']);
            this.id = params['id'];
        });
        this.registerChangeValidation();

    }
    loadQuiz(id) {
        this.tquizService.find(id).subscribe((tquiz) => {
            this.tquiz = tquiz;
          });
    }
    loadQuest(id) {
        this.qcmService.generateQcm(id).subscribe(
            (tquestions) => {
                this.tquestions = tquestions;
                this.nbre = this.tquestions.length;
                let x = 0;
                while ( x < this.nbre) {
                    this.treponse = new Treponse;
                    this.treponse.reponseQuestionId = this.tquestions[x].id;
                    this.treponses.push(this.treponse);
                    x++;
                };
            });
    }

    check_answer(id: number, rang: String ) {

        this.treponse = this.treponses.find((item) => item.reponseQuestionId === id);
        this.treponses.splice(this.treponses.indexOf(this.treponse), 1);

        switch (rang) {
            case 'first':
                this.treponse.rfirst = !this.treponse.rfirst;
                break;
            case 'second':
                this.treponse.rsecond = !this.treponse.rsecond;
                break;
            case 'third':
                this.treponse.rthird = !this.treponse.rthird;
                break;
            case 'fourth':
                this.treponse.rfourth = !this.treponse.rfourth;
                break;
             }
        this.treponses.push(this.treponse);
    }

    submit_quiz(T: Treponse[]) {
        this.qcmService.saveQcm(this.id, T).subscribe((tresult) => {
            this.tresult = tresult;
        });
    }

    registerChangeValidation() {
        this.eventSubscriber = this.eventManager.subscribe('validation', (response) => this.submit_quiz(this.treponses));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
}
