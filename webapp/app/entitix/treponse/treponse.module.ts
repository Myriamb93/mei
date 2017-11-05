import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';

import {  JElearningSharedModule } from '../../shared';
import {
    TreponseResolve,
    TreponseService,
    TreponsePopupService,
    TreponseComponent,
    TreponseDetailComponent,
    TreponseDialogComponent,
    TreponsePopupComponent,
    TreponseDeletePopupComponent,
    TreponseDeleteDialogComponent,
    treponseRoute,
    treponsePopupRoute,
} from './';

const ENTITY_STATES = [
    ...treponseRoute,
    ...treponsePopupRoute,
];

@NgModule({
    imports: [
         JElearningSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TreponseComponent,
        TreponseDetailComponent,
        TreponseDialogComponent,
        TreponseDeleteDialogComponent,
        TreponsePopupComponent,
        TreponseDeletePopupComponent,
    ],
    entryComponents: [
        TreponseComponent,
        TreponseDialogComponent,
        TreponsePopupComponent,
        TreponseDeleteDialogComponent,
        TreponseDeletePopupComponent,
    ],
    providers: [
        TreponseService,
        TreponsePopupService,
        TreponseResolve,
        UserRouteAccessService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  JElearningTreponseModule {}
