import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Tquiz } from './tquiz.model';
import { TquizPopupService } from './tquiz-popup.service';
import { TquizService } from './tquiz.service';

@Component({
    selector: 'jhi-tquiz-delete-dialog',
    templateUrl: './tquiz-delete-dialog.component.html'
})
export class TquizDeleteDialogComponent {

    tquiz: Tquiz;

    constructor(
        private tquizService: TquizService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tquizService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tquizListModification',
                content: 'Deleted an tquiz'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('jElearningApp.tquiz.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-tquiz-delete-popup',
    template: ''
})
export class TquizDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tquizPopupService: TquizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.tquizPopupService
                .open(TquizDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
