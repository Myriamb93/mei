import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Quiz } from './quiz.model';
import { QuizPopupService } from './quiz-popup.service';
import { QuizService } from './quiz.service';
import { Chapitre, ChapitreService } from '../';
import { User, UserService } from '../../shared';
@Component({
    selector: 'jhi-quiz-dialog',
    templateUrl: './quiz-dialog.component.html'
})
export class QuizDialogComponent implements OnInit {

    quiz: Quiz;
    authorities: any[];
    isSaving: boolean;

    chapitres: Chapitre[];

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private quizService: QuizService,
        private chapitreService: ChapitreService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['quiz']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.chapitreService.query().subscribe(
            (res: Response) => { this.chapitres = res.json(); }, (res: Response) => this.onError(res.json()));
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
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
        this.eventManager.broadcast({ name: 'quizListModification', content: 'OK'});
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

    trackChapitreById(index: number, item: Chapitre) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-quiz-popup',
    template: ''
})
export class QuizPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private quizPopupService: QuizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.quizPopupService
                    .open(QuizDialogComponent, params['id']);
            } else {
                this.modalRef = this.quizPopupService
                    .open(QuizDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
