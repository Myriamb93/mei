import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { Cours } from './cours.model';
import { CoursPopupService } from './cours-popup.service';
import { CoursService } from './cours.service';
import { Chapitre } from '../';
import {  ChapitreService } from '../chapitre/chapitre.service';
@Component({
    selector: 'jhi-cours-dialog',
    templateUrl: './cours-dialog.component.html'
})
export class CoursDialogComponent implements OnInit {

    cours: Cours;
    authorities: any[];
    isSaving: boolean;

    chapitres: Chapitre[];
    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private coursService: CoursService,
        private chapitreService: ChapitreService,
        private eventManager: EventManager,
        private eventManagerC: EventManager
    ) {
        this.jhiLanguageService.setLocations(['cours']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.chapitreService.query().subscribe(
            (res: Response) => { this.chapitres = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData($event, cours, field, isImage) {
        if ($event.target.files && $event.target.files[0]) {
            let $file = $event.target.files[0];
            if (isImage && !/^image\//.test($file.type)) {
                return;
            }
            this.dataUtils.toBase64($file, (base64Data) => {
                cours[field] = base64Data;
                cours[`${field}ContentType`] = $file.type;
            });
        }
    }
    save () {
        this.isSaving = true;
        if (this.cours.id !== undefined) {
            this.coursService.update(this.cours)
                .subscribe((res: Cours) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.coursService.create(this.cours)
                .subscribe((res: Cours) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Cours) {
        this.eventManager.broadcast({ name: 'coursListModification', content: 'OK'});
        this.eventManagerC.broadcast({ name: 'chapitresListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-cours-popup',
    template: ''
})
export class CoursPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private coursPopupService: CoursPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.coursPopupService
                    .open(CoursDialogComponent, params['id']);
            } else {
                this.modalRef = this.coursPopupService
                    .open(CoursDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
