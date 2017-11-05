import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService  } from 'ng-jhipster';

import { Tquestion } from './tquestion.model';
import { TquestionPopupService } from './tquestion-popup.service';
import { TquestionService } from './tquestion.service';
import { Tquiz, TquizService } from '../tquiz';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tquestion-dialog',
    templateUrl: './tquestion-dialog.component.html'
})
export class TquestionDialogComponent implements OnInit {

    tquestion: Tquestion;
    authorities: any[];
    isSaving: boolean;

    tquizs: Tquiz[];

    constructor(
        private jhiLanguageService: JhiLanguageService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private tquestionService: TquestionService,
        private tquizService: TquizService,
        private eventManager: EventManager
    ) {        this.jhiLanguageService.setLocations(['home']);

    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.tquizService.query()
            .subscribe((res: ResponseWrapper) => { this.tquizs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tquestion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tquestionService.update(this.tquestion), false);
        } else {
            this.subscribeToSaveResponse(
                this.tquestionService.create(this.tquestion), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Tquestion>, isCreated: boolean) {
        result.subscribe((res: Tquestion) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Tquestion, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'jElearningApp.tquestion.created'
                : 'jElearningApp.tquestion.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'tquestionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackTquizById(index: number, item: Tquiz) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tquestion-popup',
    template: ''
})
export class TquestionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tquestionPopupService: TquestionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.tquestionPopupService
                    .open(TquestionDialogComponent, params['id']);
            } else {
                this.modalRef = this.tquestionPopupService
                    .open(TquestionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
