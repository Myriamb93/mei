import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';
import {  JElearningSharedModule } from '../../shared';
import {
    TquestionService,
    TquestionPopupService,
    TquestionComponent,
    TquestionDetailComponent,
    TquestionDialogComponent,
    TquestionPopupComponent,
    TquestionDeletePopupComponent,
    TquestionDeleteDialogComponent,
    TquestionResolve,
    tquestionRoute,
    tquestionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tquestionRoute,
    ...tquestionPopupRoute,
];

@NgModule({
    imports: [
         JElearningSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TquestionComponent,
        TquestionDetailComponent,
        TquestionDialogComponent,
        TquestionDeleteDialogComponent,
        TquestionPopupComponent,
        TquestionDeletePopupComponent,
    ],
    entryComponents: [
        TquestionComponent,
        TquestionDialogComponent,
        TquestionPopupComponent,
        TquestionDeleteDialogComponent,
        TquestionDeletePopupComponent,
    ],
    providers: [
        TquestionService,
        TquestionPopupService,
        TquestionResolve,
        UserRouteAccessService

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  JElearningTquestionModule {}
