import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, AlertService, JhiLanguageService} from 'ng-jhipster';

import { Tresult } from './tresult.model';
import { TresultService } from './tresult.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tresult',
    templateUrl: './tresult.component.html'
})
export class TresultComponent implements OnInit, OnDestroy {
tresults: Tresult[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tresultService: TresultService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['tresult']);

    }

    loadAll() {
        this.tresultService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tresults = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTresults();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tresult) {
        return item.id;
    }
    registerChangeInTresults() {
        this.eventSubscriber = this.eventManager.subscribe('tresultListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
