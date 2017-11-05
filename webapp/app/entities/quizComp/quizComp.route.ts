import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';
import { QuizCompComponent } from './quizComp.component';


import { Principal } from '../../shared';

@Injectable()
export class QuizCompResolvePagingParams implements Resolve<any> {

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

export const quizCompRoute: Routes = [
    {
        path: 'quizComp/:id',
        component: QuizCompComponent,
        resolve: {
            'pagingParams': QuizCompResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.quizComp.home.title'
        }
    },
    {
        path: 'quizComp',
        component: QuizCompComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jElearningApp.quizComp.home.title'
        }
    }
];


