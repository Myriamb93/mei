import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TreponseComponent } from './treponse.component';
import { TreponseDetailComponent } from './treponse-detail.component';
import { TreponsePopupComponent } from './treponse-dialog.component';
import { TreponseDeletePopupComponent } from './treponse-delete-dialog.component';

import { Principal } from '../../shared';



@Injectable()
export class TreponseResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

export const treponseRoute: Routes = [
    {
        path: 'treponse',
        component: TreponseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.treponse.home.title'
        },
        canActivate: [TreponseResolve]
    }, {
        path: 'treponse/:id',
        component: TreponseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.treponse.home.title'
        },
        canActivate: [TreponseResolve]
    }
];

export const treponsePopupRoute: Routes = [
    {
        path: 'treponse-new',
        component: TreponsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.treponse.home.title'
        },
        canActivate: [TreponseResolve],
        outlet: 'popup'
    },
    {
        path: 'treponse/:id/edit',
        component: TreponsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.treponse.home.title'
        },
        canActivate: [TreponseResolve],
        outlet: 'popup'
    },
    {
        path: 'treponse/:id/delete',
        component: TreponseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.treponse.home.title'
        },
        canActivate: [TreponseResolve],
        outlet: 'popup'
    }
];
