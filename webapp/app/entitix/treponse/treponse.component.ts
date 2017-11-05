import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, AlertService, JhiLanguageService} from 'ng-jhipster';

import { Treponse } from './treponse.model';
import { TreponseService } from './treponse.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-treponse',
    templateUrl: './treponse.component.html'
})
export class TreponseComponent implements OnInit, OnDestroy {
treponses: Treponse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private treponseService: TreponseService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['treponse']);

    }

    loadAll() {
        this.treponseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.treponses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTreponses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Treponse) {
        return item.id;
    }
    registerChangeInTreponses() {
        this.eventSubscriber = this.eventManager.subscribe('treponseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
