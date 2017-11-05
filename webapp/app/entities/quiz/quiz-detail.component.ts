import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Component({
    selector: 'jhi-quiz-detail',
    templateUrl: './quiz-detail.component.html'
})
export class QuizDetailComponent implements OnInit, OnDestroy {

    quiz: Quiz;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private quizService: QuizService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['quiz']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.quizService.find(id).subscribe(quiz => {
            this.quiz = quiz;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
