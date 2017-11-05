import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';
@Injectable()
export class QuizPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private quizService: QuizService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.quizService.find(id).subscribe(quiz => {
                quiz.date = this.datePipe
                    .transform(quiz.date, 'yyyy-MM-ddThh:mm');
                this.quizModalRef(component, quiz);
            });
        } else {
            return this.quizModalRef(component, new Quiz());
        }
    }

    quizModalRef(component: Component, quiz: Quiz): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.quiz = quiz;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
