import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Tquestion } from './tquestion.model';
import { TquestionService } from './tquestion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tquestion',
    templateUrl: './tquestion.component.html'
})
export class TquestionComponent implements OnInit, OnDestroy {
tquestions: Tquestion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tquestionService: TquestionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['tquestion']);

    }

    loadAll() {
        this.tquestionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tquestions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
              });
        this.registerChangeInTquestions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tquestion) {
        return item.id;
    }
    registerChangeInTquestions() {
        this.eventSubscriber = this.eventManager.subscribe('tquestionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
