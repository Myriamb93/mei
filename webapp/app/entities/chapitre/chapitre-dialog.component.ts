import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { Chapitre } from './chapitre.model';
import { ChapitrePopupService } from './chapitre-popup.service';
import { ChapitreService } from './chapitre.service';
import { Cours } from '../';
import { Question } from '../';
import { Quiz } from '../';

import { CoursService } from '../cours/cours.service';
import { QuestionService } from '../question/question.service';
import { QuizService } from '../quiz/quiz.service';


import { User, UserService } from '../../shared';
@Component({
    selector: 'jhi-chapitre-dialog',
    templateUrl: './chapitre-dialog.component.html'
})
export class ChapitreDialogComponent implements OnInit {

    chapitre: Chapitre;
    authorities: any[];
    isSaving: boolean;

    cours: Cours[];

    questions: Question[];

    quizzes: Quiz[];

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private chapitreService: ChapitreService,
        private coursService: CoursService,
        private questionService: QuestionService,
        private quizService: QuizService,
        private userService: UserService,
        private eventManager: EventManager,
    ) {
        this.jhiLanguageService.setLocations(['chapitre']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.coursService.query().subscribe(
            (res: Response) => { this.cours = res.json(); }, (res: Response) => this.onError(res.json()));
        this.questionService.query().subscribe(
            (res: Response) => { this.questions = res.json(); }, (res: Response) => this.onError(res.json()));
        this.quizService.query().subscribe(
            (res: Response) => { this.quizzes = res.json(); }, (res: Response) => this.onError(res.json()));
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData($event, chapitre, field, isImage) {
        if ($event.target.files && $event.target.files[0]) {
            let $file = $event.target.files[0];
            if (isImage && !/^image\//.test($file.type)) {
                return;
            }
            this.dataUtils.toBase64($file, (base64Data) => {
                chapitre[field] = base64Data;
                chapitre[`${field}ContentType`] = $file.type;
            });
        }
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.chapitre.id !== undefined) {
            this.chapitreService.update(this.chapitre)
                .subscribe((res: Chapitre) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.chapitreService.create(this.chapitre)
                .subscribe((res: Chapitre) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Chapitre) {
        this.eventManager.broadcast({ name: 'chapitreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackCoursById(index: number, item: Cours) {
        return item.id;
    }

    trackQuestionById(index: number, item: Question) {
        return item.id;
    }

    trackQuizById(index: number, item: Quiz) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chapitre-popup',
    template: ''
})
export class ChapitrePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chapitrePopupService: ChapitrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.chapitrePopupService
                    .open(ChapitreDialogComponent, params['id']);
            } else {

                if (params['idc']) {
                    this.modalRef = this.chapitrePopupService
                        .openX(ChapitreDialogComponent, params['idc']);
                } else {
                    this.modalRef = this.chapitrePopupService
                        .open(ChapitreDialogComponent);
                }
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
