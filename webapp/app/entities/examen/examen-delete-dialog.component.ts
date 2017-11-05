import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Examen } from './examen.model';
import { ExamenPopupService } from './examen-popup.service';
import { ExamenService } from './examen.service';

@Component({
    selector: 'jhi-examen-delete-dialog',
    templateUrl: './examen-delete-dialog.component.html'
})
export class ExamenDeleteDialogComponent {

    examen: Examen;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private examenService: ExamenService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['examen']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.examenService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'examenListModification',
                content: 'Deleted an examen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-examen-delete-popup',
    template: ''
})
export class ExamenDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private examenPopupService: ExamenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.examenPopupService
                .open(ExamenDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
