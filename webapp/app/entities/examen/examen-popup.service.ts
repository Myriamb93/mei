import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Examen } from './examen.model';
import { ExamenService } from './examen.service';
@Injectable()
export class ExamenPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private examenService: ExamenService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.examenService.find(id).subscribe(examen => {
                examen.date = this.datePipe
                    .transform(examen.date, 'yyyy-MM-ddThh:mm');
                this.examenModalRef(component, examen);
            });
        } else {
            return this.examenModalRef(component, new Examen());
        }
    }

    examenModalRef(component: Component, examen: Examen): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.examen = examen;
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
