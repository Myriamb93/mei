import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Chapitre } from './chapitre.model';

import { ChapitreService } from './chapitre.service';
import {Cours} from '../cours/cours.model';

@Injectable()
export class ChapitrePopupService {
    private isOpen = false;
    private chap: Chapitre;
    private chapCour: Cours;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private chapitreService: ChapitreService

    ) {}

    open (component: Component, id?: number | any, idc?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.chapitreService.find(id).subscribe(chapitre => {
                chapitre.date = this.datePipe
                    .transform(chapitre.date, 'yyyy-MM-ddThh:mm');
                this.chapitreModalRef(component, chapitre);
            });
            } else {
            return this.chapitreModalRef(component, new Chapitre());

        }
    }


    openX (component: Component, idc?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (idc) {
            this.chap = new Chapitre();
            this.chap.cours = new Cours;


            this.chap.cours.id = idc;
            return this.chapitreModalRef(component, this.chap);


        } else {
            return this.chapitreModalRef(component, new Chapitre());

        }
    }


    chapitreModalRef(component: Component, chapitre: Chapitre): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chapitre = chapitre;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
