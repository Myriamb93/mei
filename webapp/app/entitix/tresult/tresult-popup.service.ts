import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tresult } from './tresult.model';
import { TresultService } from './tresult.service';

@Injectable()
export class TresultPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tresultService: TresultService

    ) {}

  open(component: Component, id?: number | any): NgbModalRef {
    if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.tresultService.find(id).subscribe((tresult) => {
                tresult.date = this.datePipe
                    .transform(tresult.date, 'yyyy-MM-ddThh:mm');
                this.tresultModalRef(component, tresult);
            });
        } else {
            return this.tresultModalRef(component, new Tresult());
        }

    }

    tresultModalRef(component: Component, tresult: Tresult): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tresult = tresult;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
