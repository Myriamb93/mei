import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ExamenComponent } from './examen.component';
import { ExamenDetailComponent } from './examen-detail.component';
import { ExamenPopupComponent } from './examen-dialog.component';
import { ExamenDeletePopupComponent } from './examen-delete-dialog.component';

import { Principal } from '../../shared';



@Injectable()
export class ExamenResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }

}


@Injectable()
export class ExamenResolvePagingParams implements Resolve<any> {

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

export const examenRoute: Routes = [
  {
    path: 'examen',
    component: ExamenComponent,
    resolve: {
      'pagingParams': ExamenResolvePagingParams
    },
    data: {
        pageTitle: 'jElearningApp.examen.home.title',
        authorities: ['ROLE_ADMIN']
    },
    canActivate: [ExamenResolve],
  }, {
    path: 'examen/:id',
    component: ExamenDetailComponent,
    data: {
        pageTitle: 'jElearningApp.examen.home.title',
        authorities: ['ROLE_ADMIN']
    },
    canActivate: [ExamenResolve],
  }
];

export const examenPopupRoute: Routes = [
  {
    path: 'examen-new',
    component: ExamenPopupComponent,
    data: {
        pageTitle: 'jElearningApp.examen.home.title'
    },
    outlet: 'popup',
      canActivate: [ExamenResolve],
  },
  {
    path: 'examen/:id/edit',
    component: ExamenPopupComponent,
    data: {
        pageTitle: 'jElearningApp.examen.home.title'
    },
    outlet: 'popup',
      canActivate: [ExamenResolve],
  },
  {
    path: 'examen/:id/delete',
    component: ExamenDeletePopupComponent,
    data: {
        pageTitle: 'jElearningApp.examen.home.title'
    },
    outlet: 'popup',
      canActivate: [ExamenResolve],
  }
];
