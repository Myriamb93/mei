import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Treponse } from './treponse.model';
import { TreponsePopupService } from './treponse-popup.service';
import { TreponseService } from './treponse.service';

@Component({
    selector: 'jhi-treponse-delete-dialog',
    templateUrl: './treponse-delete-dialog.component.html'
})
export class TreponseDeleteDialogComponent {

    treponse: Treponse;

    constructor(
        private treponseService: TreponseService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.treponseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'treponseListModification',
                content: 'Deleted an treponse'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('jElearningApp.treponse.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-treponse-delete-popup',
    template: ''
})
export class TreponseDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private treponsePopupService: TreponsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.treponsePopupService
                .open(TreponseDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
