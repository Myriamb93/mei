import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { QuestionComponent } from './question.component';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionPopupComponent } from './question-dialog.component';
import { QuestionDeletePopupComponent } from './question-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class QuestionResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }

}



@Injectable()
export class QuestionResolvePagingParams implements Resolve<any> {

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

export const questionRoute: Routes = [
  {
    path: 'question',
    component: QuestionComponent,
    resolve: {
      'pagingParams': QuestionResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.question.home.title'
    },
      canActivate: [QuestionResolve],
  },

    {
    path: 'question/:id',
    component: QuestionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.question.home.title'
    },
        canActivate: [QuestionResolve],
  }
];

export const questionPopupRoute: Routes = [
  {
    path: 'question-new',
    component: QuestionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.question.home.title'
    },
    outlet: 'popup',
      canActivate: [QuestionResolve],
  },
  {
    path: 'question/:id/edit',
    component: QuestionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.question.home.title'
    },
    outlet: 'popup',
      canActivate: [QuestionResolve],
  },
  {
    path: 'question/:id/delete',
    component: QuestionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.question.home.title'
    },
    outlet: 'popup',
      canActivate: [QuestionResolve],
  }
];
