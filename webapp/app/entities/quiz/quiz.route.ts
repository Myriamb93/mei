import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { QuizComponent } from './quiz.component';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizPopupComponent } from './quiz-dialog.component';
import { QuizDeletePopupComponent } from './quiz-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class QuizResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }

}


@Injectable()
export class QuizResolvePagingParams implements Resolve<any> {

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

export const quizRoute: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
    resolve: {
      'pagingParams': QuizResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.quiz.home.title'
    },
      canActivate: [QuizResolve],
  }, {
    path: 'quiz/:id',
    component: QuizDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.quiz.home.title'
    },
        canActivate: [QuizResolve],
  }
];

export const quizPopupRoute: Routes = [
  {
    path: 'quiz-new',
    component: QuizPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.quiz.home.title'
    },
    outlet: 'popup',
      canActivate: [QuizResolve],
  },
  {
    path: 'quiz/:id/edit',
    component: QuizPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.quiz.home.title'
    },
    outlet: 'popup',
      canActivate: [QuizResolve],
  },
  {
    path: 'quiz/:id/delete',
    component: QuizDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jElearningApp.quiz.home.title'
    },
    outlet: 'popup',
      canActivate: [QuizResolve],
  }
];
