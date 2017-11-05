import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Tresult } from './tresult.model';
import { TresultPopupService } from './tresult-popup.service';
import { TresultService } from './tresult.service';

@Component({
    selector: 'jhi-tresult-delete-dialog',
    templateUrl: './tresult-delete-dialog.component.html'
})
export class TresultDeleteDialogComponent {

    tresult: Tresult;

    constructor(
        private tresultService: TresultService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tresultService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tresultListModification',
                content: 'Deleted an tresult'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('jElearningApp.tresult.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-tresult-delete-popup',
    template: ''
})
export class TresultDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tresultPopupService: TresultPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.tresultPopupService
                .open(TresultDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
