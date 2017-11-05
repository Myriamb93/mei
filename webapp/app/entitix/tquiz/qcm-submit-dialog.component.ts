import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';


import { TquizPopupService } from './tquiz-popup.service';


@Component({
    selector: 'jhi-qcm-submit-dialog',
    templateUrl: './qcm-submit-dialog.component.html'
})
export class QcmSubmitDialogComponent {


    constructor(
        private eventManager: EventManager,
        public activeModal: NgbActiveModal,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirm() {
        this.eventManager.broadcast({
            name: 'validation',
            });

       this.activeModal.dismiss(true);
    }
}

@Component({
    selector: 'jhi-qcm-submit-popup',
    template: ''
})
export class QcmSubmitPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tquizPopupService: TquizPopupService
    ) {}

    ngOnInit() {
        this.modalRef = this.tquizPopupService
                .open(QcmSubmitDialogComponent);
    }

    ngOnDestroy() {

    }
}
