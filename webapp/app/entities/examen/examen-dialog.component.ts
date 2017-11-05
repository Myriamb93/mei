import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Examen } from './examen.model';
import { ExamenPopupService } from './examen-popup.service';
import { ExamenService } from './examen.service';
import { User, UserService } from '../../shared';
import { Cours, CoursService } from '../';
@Component({
    selector: 'jhi-examen-dialog',
    templateUrl: './examen-dialog.component.html'
})
export class ExamenDialogComponent implements OnInit {

    examen: Examen;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    cours: Cours[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private examenService: ExamenService,
        private userService: UserService,
        private coursService: CoursService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['examen']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.coursService.query().subscribe(
            (res: Response) => { this.cours = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.examen.id !== undefined) {
            this.examenService.update(this.examen)
                .subscribe((res: Examen) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.examenService.create(this.examen)
                .subscribe((res: Examen) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Examen) {
        this.eventManager.broadcast({ name: 'examenListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCoursById(index: number, item: Cours) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-examen-popup',
    template: ''
})
export class ExamenPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private examenPopupService: ExamenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.examenPopupService
                    .open(ExamenDialogComponent, params['id']);
            } else {
                this.modalRef = this.examenPopupService
                    .open(ExamenDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
