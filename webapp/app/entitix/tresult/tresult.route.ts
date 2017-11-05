import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TresultComponent } from './tresult.component';
import { TresultDetailComponent } from './tresult-detail.component';
import { TresultPopupComponent } from './tresult-dialog.component';
import { TresultDeletePopupComponent } from './tresult-delete-dialog.component';

import { Principal } from '../../shared';


@Injectable()
export class TresultResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}


export const tresultRoute: Routes = [
    {
        path: 'tresult',
        component: TresultComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'jElearningApp.tresult.home.title'
        },
        canActivate: [TresultResolve]
    }, {
        path: 'tresult/:id',
        component: TresultDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'jElearningApp.tresult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tresultPopupRoute: Routes = [
    {
        path: 'tresult-new',
        component: TresultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'jElearningApp.tresult.home.title'
        },
        canActivate: [TresultResolve],
        outlet: 'popup'
    },
    {
        path: 'tresult/:id/edit',
        component: TresultPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'jElearningApp.tresult.home.title'
        },
        canActivate: [TresultResolve],
        outlet: 'popup'
    },
    {
        path: 'tresult/:id/delete',
        component: TresultDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'jElearningApp.tresult.home.title'
        },
        canActivate: [TresultResolve],
        outlet: 'popup'
    }
];
