import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService, DataUtils, JhiLanguageService} from 'ng-jhipster';

import { Tquiz } from './tquiz.model';
import { TquizPopupService } from './tquiz-popup.service';
import { TquizService } from './tquiz.service';

@Component({
    selector: 'jhi-tquiz-dialog',
    templateUrl: './tquiz-dialog.component.html'
})
export class TquizDialogComponent implements OnInit {

    tquiz: Tquiz;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private tquizService: TquizService,
        private eventManager: EventManager

) {
        this.jhiLanguageService.setLocations(['tquiz']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, tquiz, field, isImage) {
        if (event && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                tquiz[field] = base64Data;
                tquiz[`${field}ContentType`] = file.type;
            });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tquiz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tquizService.update(this.tquiz), false);
        } else {
            this.subscribeToSaveResponse(
                this.tquizService.create(this.tquiz), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Tquiz>, isCreated: boolean) {
        result.subscribe((res: Tquiz) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Tquiz, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'jElearningApp.tquiz.created'
                : 'jElearningApp.tquiz.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'tquizListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-tquiz-popup',
    template: ''
})
export class TquizPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tquizPopupService: TquizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.tquizPopupService
                    .open(TquizDialogComponent, params['id']);
            } else {
                this.modalRef = this.tquizPopupService
                    .open(TquizDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
