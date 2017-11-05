import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TquestionComponent } from './tquestion.component';
import { TquestionDetailComponent } from './tquestion-detail.component';
import { TquestionPopupComponent } from './tquestion-dialog.component';
import { TquestionDeletePopupComponent } from './tquestion-delete-dialog.component';

import { Principal } from '../../shared';


@Injectable()
export class TquestionResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

export const tquestionRoute: Routes = [
    {
        path: 'tquestion',
        component: TquestionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquestion.home.title'
        },
        canActivate: [TquestionResolve]
    }, {
        path: 'tquestion/:id',
        component: TquestionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquestion.home.title'
        },
        canActivate: [TquestionResolve]
    }
];

export const tquestionPopupRoute: Routes = [
    {
        path: 'tquestion-new',
        component: TquestionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquestion.home.title'
        },
        canActivate: [TquestionResolve],
        outlet: 'popup'
    },
    {
        path: 'tquestion/:id/edit',
        component: TquestionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquestion.home.title'
        },
        canActivate: [TquestionResolve],
        outlet: 'popup'
    },
    {
        path: 'tquestion/:id/delete',
        component: TquestionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.tquestion.home.title'
        },
        canActivate: [TquestionResolve],
        outlet: 'popup'
    }
];
