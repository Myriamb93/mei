import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { TreponseDetails } from '../treponse/treponse.model';
// import { Tresult } from './tresult.model';
import { TresultService } from './tresult.service';

@Component({
    selector: 'jhi-tresult-detail',
    templateUrl: './tresult-detail.component.html'
})
export class TresultDetailComponent implements OnInit, OnDestroy {

    tresult = new Array<TreponseDetails>();
    private subscription: Subscription;
    // private eventSubscriber: Subscription;

    constructor(
       //  private eventManager: EventManager,
        private tresultService: TresultService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        // this.registerChangeInTresults();
    }

    load(id) {
        this.tresultService.findReponses(id).subscribe((tresult) => {
            this.tresult = tresult;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
      //  this.eventManager.destroy(this.eventSubscriber);
    }

    /* registerChangeInTresults() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tresultListModification',
            (response) => this.load(this.tresult.id)
        );
    }
        */
}
