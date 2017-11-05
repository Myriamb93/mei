import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { Tquiz } from './tquiz.model';
import { TquizService } from './tquiz.service';

@Component({
    selector: 'jhi-tquiz-detail',
    templateUrl: './tquiz-detail.component.html'
})
export class TquizDetailComponent implements OnInit, OnDestroy {

    tquiz: Tquiz;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private tquizService: TquizService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTquizs();
    }

    load(id) {
        this.tquizService.find(id).subscribe((tquiz) => {
            this.tquiz = tquiz;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTquizs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tquizListModification',
            (response) => this.load(this.tquiz.id)
        );
    }
}
