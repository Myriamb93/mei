import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Treponse } from './treponse.model';
import { TreponseService } from './treponse.service';

@Component({
    selector: 'jhi-treponse-detail',
    templateUrl: './treponse-detail.component.html'
})
export class TreponseDetailComponent implements OnInit, OnDestroy {

    treponse: Treponse;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private treponseService: TreponseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTreponses();
    }

    load(id) {
        this.treponseService.find(id).subscribe((treponse) => {
            this.treponse = treponse;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTreponses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'treponseListModification',
            (response) => this.load(this.treponse.id)
        );
    }
}
