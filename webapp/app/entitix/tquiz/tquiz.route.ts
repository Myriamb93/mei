import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';
import { QcmComponent } from './qcm.component';
import { TquizComponent } from './tquiz.component';
import { TquizDetailComponent } from './tquiz-detail.component';
import { TquizPopupComponent } from './tquiz-dialog.component';
import { TquizDeletePopupComponent } from './tquiz-delete-dialog.component';
import { QcmSubmitPopupComponent } from './qcm-submit-dialog.component';

import { Principal } from '../../shared';


@Injectable()
export class TquizResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

export const tquizRoute: Routes = [
    {
        path: 'tquiz',
        component: TquizComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [TquizResolve]
    }, {
        path: 'tquiz/:id',
        component: TquizDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [TquizResolve]
    }, {
        path: 'tquiz/:id/qcm',
        component: QcmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tquizPopupRoute: Routes = [
    {
        path: 'tquiz-new',
        component: TquizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [TquizResolve],
        outlet: 'popup'
    },
    {
        path: 'tquiz/:id/edit',
        component: TquizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [TquizResolve],
        outlet: 'popup'
    },
    {
        path: 'tquiz/:id/delete',
        component: TquizDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [TquizResolve],
        outlet: 'popup'
    } ,
    {
        path: 'tquiz-validation',
        component: QcmSubmitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
