import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ChapitreComponent } from './chapitre.component';
import { ChapitreDetailComponent } from './chapitre-detail.component';
import { ChapitrePopupComponent } from './chapitre-dialog.component';
import { ChapitreDeletePopupComponent } from './chapitre-delete-dialog.component';

import { Principal } from '../../shared';


@Injectable()
export class ChapitreResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }

}

@Injectable()
export class ChapitreResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const chapitreRoute: Routes = [
  {
    path: 'chapitre',
    component: ChapitreComponent,
    resolve: {
      'pagingParams': ChapitreResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.chapitre.home.title'
    },
    canActivate: [ChapitreResolve],

  },  {
        path: 'chapitre/:id',
        component: ChapitreDetailComponent,
        data: {
          authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.chapitre.home.title'
        },
        canActivate: [UserRouteAccessService],

    }
];

export const chapitrePopupRoute: Routes = [
  {
    path: 'chapitre-new',
    component: ChapitrePopupComponent,
    data: {

        pageTitle: 'jElearningApp.chapitre.home.title'
    },
    outlet: 'popup',
      canActivate: [ChapitreResolve],
  }, {
    path: 'chapitre-new/:idc/cours',
    component: ChapitrePopupComponent,
    data: {

        pageTitle: 'jElearningApp.chapitre.home.title'
    },
    outlet: 'popup',
        canActivate: [ChapitreResolve],
  },
  {
    path: 'chapitre/:id/edit',
    component: ChapitrePopupComponent,
    data: {
        pageTitle: 'jElearningApp.chapitre.home.title'
    },
    outlet: 'popup',
      canActivate: [ChapitreResolve]
  },
  {
    path: 'chapitre/:id/delete',
    component: ChapitreDeletePopupComponent,
    data: {
          pageTitle: 'jElearningApp.chapitre.home.title'
    },
    outlet: 'popup',
      canActivate: [ChapitreResolve],
  }
];
