import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cours } from './cours.model';
import { CoursService } from './cours.service';
@Injectable()
export class CoursPopupService {
    private isOpen = false;
    public coursDesc: String;

    constructor (
        private modalService: NgbModal,
        private router: Router,
        private coursService: CoursService,


    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.coursService.find(id).subscribe(cours => {
                this.coursDesc = cours.descrip;
                this.coursModalRef(component, cours);
            });
        } else {
            return this.coursModalRef(component, new Cours());
        }
    }

    coursModalRef(component: Component, cours: Cours): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cours = cours;
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
