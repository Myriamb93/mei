import { Routes, CanActivate } from '@angular/router';

import {
    coursRoute,
    coursPopupRoute,
    chapitreRoute,
    chapitrePopupRoute,
    quizCompRoute,
    quizPopupRoute,
    quizRoute,
    questionRoute,
    questionPopupRoute,
    examenPopupRoute,
    examenRoute

} from './';

import { UserRouteAccessService } from '../shared';

let ENTITY_ROUTES = [
    ...chapitreRoute,
    ...coursRoute,
    ...quizCompRoute,
    ...quizRoute,
    ...questionRoute,
    ...examenRoute
];


export const entityState: Routes = [{
    path: '',
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: ENTITY_ROUTES
},
    ...chapitrePopupRoute,
    ...coursPopupRoute,
    ...examenPopupRoute,
    ...questionPopupRoute,
    ...quizPopupRoute,
];
