import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Quiz } from './quiz.model';
import { QuizPopupService } from './quiz-popup.service';
import { QuizService } from './quiz.service';

@Component({
    selector: 'jhi-quiz-delete-dialog',
    templateUrl: './quiz-delete-dialog.component.html'
})
export class QuizDeleteDialogComponent {

    quiz: Quiz;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private quizService: QuizService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['quiz']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.quizService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'quizListModification',
                content: 'Deleted an quiz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quiz-delete-popup',
    template: ''
})
export class QuizDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private quizPopupService: QuizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.quizPopupService
                .open(QuizDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
