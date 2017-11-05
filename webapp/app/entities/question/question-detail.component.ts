import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
    selector: 'jhi-question-detail',
    templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

    question: Question;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private questionService: QuestionService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['question', 'bon']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.questionService.find(id).subscribe(question => {
            this.question = question;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
