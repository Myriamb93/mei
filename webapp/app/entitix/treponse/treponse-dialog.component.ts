import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Treponse } from './treponse.model';
import { TreponsePopupService } from './treponse-popup.service';
import { TreponseService } from './treponse.service';
import { Tquestion, TquestionService } from '../tquestion';
import { Tresult, TresultService } from '../tresult';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-treponse-dialog',
    templateUrl: './treponse-dialog.component.html'
})
export class TreponseDialogComponent implements OnInit {

    treponse: Treponse;
    authorities: any[];
    isSaving: boolean;

    tquestions: Tquestion[];

    tresults: Tresult[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private treponseService: TreponseService,
        private tquestionService: TquestionService,
        private tresultService: TresultService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.tquestionService.query()
            .subscribe((res: ResponseWrapper) => { this.tquestions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tresultService.query()
            .subscribe((res: ResponseWrapper) => { this.tresults = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.treponse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.treponseService.update(this.treponse), false);
        } else {
            this.subscribeToSaveResponse(
                this.treponseService.create(this.treponse), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Treponse>, isCreated: boolean) {
        result.subscribe((res: Treponse) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Treponse, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'jElearningApp.treponse.created'
                : 'jElearningApp.treponse.updated',
            { param : result.id }, null);
        this.eventManager.broadcast({ name: 'treponseListModification', content: 'OK'});
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

    trackTquestionById(index: number, item: Tquestion) {
        return item.id;
    }

    trackTresultById(index: number, item: Tresult) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-treponse-popup',
    template: ''
})
export class TreponsePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private treponsePopupService: TreponsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.treponsePopupService
                    .open(TreponseDialogComponent, params['id']);
            } else {
                this.modalRef = this.treponsePopupService
                    .open(TreponseDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
