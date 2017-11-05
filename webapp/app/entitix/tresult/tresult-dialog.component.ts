import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Tresult } from './tresult.model';
import { TresultPopupService } from './tresult-popup.service';
import { TresultService } from './tresult.service';
import { User, UserService } from '../../shared';
import { Tquiz, TquizService } from '../tquiz';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tresult-dialog',
    templateUrl: './tresult-dialog.component.html'
})
export class TresultDialogComponent implements OnInit {

    tresult: Tresult;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    tquizs: Tquiz[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private tresultService: TresultService,
        private userService: UserService,
        private tquizService: TquizService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query()
            .subscribe((res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json));

        this.tquizService.query()
            .subscribe((res: ResponseWrapper) => { this.tquizs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tresult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tresultService.update(this.tresult), false);
        } else {
            this.subscribeToSaveResponse(
                this.tresultService.create(this.tresult), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Tresult>, isCreated: boolean) {
        result.subscribe((res: Tresult) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Tresult, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'jElearningApp.tresult.created'
                : 'jElearningApp.tresult.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'tresultListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackTquizById(index: number, item: Tquiz) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tresult-popup',
    template: ''
})
export class TresultPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tresultPopupService: TresultPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.tresultPopupService
                    .open(TresultDialogComponent, params['id']);
            } else {
                this.modalRef = this.tresultPopupService
                    .open(TresultDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
