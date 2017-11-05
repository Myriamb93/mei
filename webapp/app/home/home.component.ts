import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';
import { Cours } from '../entities/cours/cours.model';
import { CoursService } from '../entities/cours/cours.service';
import { Tquiz } from '../entitix/tquiz/tquiz.model';
import { TquizService } from '../entitix/tquiz/tquiz.service';


import { Account, LoginModalService, Principal } from '../shared';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    cours: Cours[];
    tquiz: Tquiz[];

    constructor(
        private coursService: CoursService,
        private tquizService: TquizService,
        private domSanitazer: DomSanitizer,
        private jhiLanguageService: JhiLanguageService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['home']);
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.load();
    }

    load () {
        this.coursService.getAll().subscribe(cours => {
            this.cours = cours;
        });
        this.tquizService.query().subscribe(tquiz => {
            this.tquiz = tquiz.json;
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
           this.load();
        });
    }

    safeURL(type: string, data: string): String {
        this.domSanitazer.bypassSecurityTrustResourceUrl('data:' + type + ';base64,' + data);
        return 'data:' + type + ';base64,' + data;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
