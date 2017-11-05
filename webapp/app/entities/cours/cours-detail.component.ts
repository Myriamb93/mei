import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils} from 'ng-jhipster';
import { Cours } from './cours.model';
import { CoursService } from './cours.service';
import {ChapitreService} from '../chapitre/chapitre.service';
import {Chapitre} from '../chapitre/chapitre.model';
import { Response } from '@angular/http';

@Component({
    selector: 'jhi-cours-detail',
    templateUrl: './cours-detail.component.html'
})
export class CoursDetailComponent implements OnInit, OnDestroy {

    cours: Cours;
    chapitres: Chapitre[];
    private subscription: any;
    eventSubscriber: Subscription;

    currentAccount: any;
    coursChapitre: any;

    error: any;
    success: any;
    id: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private parseLinks: ParseLinks,
        private jhiLanguageService: JhiLanguageService,
        private coursService: CoursService,
        private domSanitazer: DomSanitizer,
        private chapitreService: ChapitreService,
        private route: ActivatedRoute,
        private eventManager: EventManager,
        private dataUtils: DataUtils,
    private alertService: AlertService


) {
        this.jhiLanguageService.setLocations(['cours']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
            this.id = params['id'];
        });
        this.registerChangeInCours();
        this.registerChangeInChapitres();
    }

    load (id) {
        this.chapitreService.query(
            {page: 0,
                size: 100,
                sort: ['rang', 'asc']}
        ).subscribe(
            (res: Response) => { this.chapitres = res.json(); }, (res: Response) => this.onError(res.json()));
        this.coursService.find(id).subscribe(cours => {
            this.cours = cours;

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
    onClickCreateChapter(x) {
        this.coursChapitre = x;
    }

    private onSuccess (data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.cours = data;
    }
    safeURL(type: string, data: string): String {
        this.domSanitazer.bypassSecurityTrustResourceUrl('data:' + type + ';base64,' + data);
        return 'data:' + type + ';base64,' + data;
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    registerChangeInCours() {
        this.eventSubscriber = this.eventManager.subscribe('coursListModification', (response) => this.load(this.id));
    }

    registerChangeInChapitres() {
        this.eventSubscriber = this.eventManager.subscribe('chapitreListModification', (response) => this.load(this.id));
    }

}
