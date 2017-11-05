import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService  } from 'ng-jhipster';

import { Tquestion } from './tquestion.model';
import { TquestionPopupService } from './tquestion-popup.service';
import { TquestionService } from './tquestion.service';

@Component({
    selector: 'jhi-tquestion-delete-dialog',
    templateUrl: './tquestion-delete-dialog.component.html'
})
export class TquestionDeleteDialogComponent {

    tquestion: Tquestion;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tquestionService: TquestionService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {        this.jhiLanguageService.setLocations(['home']);

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tquestionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tquestionListModification',
                content: 'Deleted an tquestion'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('jElearningApp.tquestion.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-tquestion-delete-popup',
    template: ''
})
export class TquestionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tquestionPopupService: TquestionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.tquestionPopupService
                .open(TquestionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
