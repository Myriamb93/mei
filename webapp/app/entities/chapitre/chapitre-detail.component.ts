import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService, DataUtils } from 'ng-jhipster';
import { Chapitre } from './chapitre.model';
import { ChapitreService } from './chapitre.service';
import { QuizService } from '../quiz/quiz.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'jhi-chapitre-detail',
    templateUrl: './chapitre-detail.component.html'
})
export class ChapitreDetailComponent implements OnInit, OnDestroy {

    chapitre: Chapitre;
    private subscription: any;
    page = 1;
    url: SafeResourceUrl;
    data ;
    zoom;
    rotation = 0;

    totalPages: number;
    originalSize = false;
    showAll = false;

    constructor(
        private domSanitazer: DomSanitizer,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private chapitreService: ChapitreService,
        private quizService: QuizService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['chapitre']);
        this.zoom = 1.2999999999999998;

    }

    callBackFn( pdf: PDFDocumentProxy ) {
        this.totalPages = pdf.numPages;
    }

    incrementPage(amount: number) {

        if ( amount > 0 && this.page < this.totalPages ) {
            this.page += amount;
        }
        if ( amount < 0 && this.page > 1 ) {
            this.page += amount;
        }
    }

    incrementZoom(amount: number) {
        if ( amount > 0 && this.zoom < 2) {
            this.zoom += amount;

        }
        if ( amount < 0 && this.zoom > 1 ) {
            this.zoom += amount;
        }
    }

    rotate(angle: number) {
        this.rotation += angle;
    }



    pagecount(xx) {

        if ( xx === 0 || xx === null ) {
            this.page = this.page ;
        }
        this.page = Number(xx);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });


    }

    load (id) {
        this.chapitreService.find(id).subscribe(chapitre => {
            this.chapitre = chapitre;
            this.url = this.domSanitazer.bypassSecurityTrustResourceUrl(this.chapitre.video);
            this.data = 'data: application/pdf;base64,' + this.chapitre.fichier ;
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
    }

}
