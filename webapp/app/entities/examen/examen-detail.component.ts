import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Examen } from './examen.model';
import { ExamenService } from './examen.service';

@Component({
    selector: 'jhi-examen-detail',
    templateUrl: './examen-detail.component.html'
})
export class ExamenDetailComponent implements OnInit, OnDestroy {

    examen: Examen;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private examenService: ExamenService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['examen']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.examenService.find(id).subscribe(examen => {
            this.examen = examen;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
