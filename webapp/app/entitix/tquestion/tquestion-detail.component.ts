import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, JhiLanguageService   } from 'ng-jhipster';

import { Tquestion } from './tquestion.model';
import { TquestionService } from './tquestion.service';

@Component({
    selector: 'jhi-tquestion-detail',
    templateUrl: './tquestion-detail.component.html'
})
export class TquestionDetailComponent implements OnInit, OnDestroy {

    tquestion: Tquestion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private eventManager: EventManager,
        private tquestionService: TquestionService,
        private route: ActivatedRoute
    ) {        this.jhiLanguageService.setLocations(['home']);

    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTquestions();
    }

    load(id) {
        this.tquestionService.find(id).subscribe((tquestion) => {
            this.tquestion = tquestion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTquestions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tquestionListModification',
            (response) => this.load(this.tquestion.id)
        );
    }
}
