import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';
import {  JElearningSharedModule } from '../../shared';
import {
    TquizResolve,
    TquizService,
    TquizPopupService,
    TquizComponent,
    QcmService,
    QcmComponent,
    TquizDetailComponent,
    TquizDialogComponent,
    TquizPopupComponent,
    TquizDeletePopupComponent,
    TquizDeleteDialogComponent,
    QcmSubmitDialogComponent,
    QcmSubmitPopupComponent,
    tquizRoute,
    tquizPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tquizRoute,
    ...tquizPopupRoute,
];

@NgModule({
    imports: [
         JElearningSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TquizComponent,
        QcmComponent,
        TquizDetailComponent,
        TquizDialogComponent,
        TquizDeleteDialogComponent,
        TquizPopupComponent,
        TquizDeletePopupComponent,
        QcmSubmitDialogComponent,
        QcmSubmitPopupComponent,
    ],
    entryComponents: [
        TquizComponent,
        QcmComponent,
        TquizDialogComponent,
        TquizPopupComponent,
        TquizDeleteDialogComponent,
        TquizDeletePopupComponent,
        QcmSubmitDialogComponent,
        QcmSubmitPopupComponent,
    ],
    providers: [
        QcmService,
        TquizService,
        TquizPopupService,
        TquizResolve,
        UserRouteAccessService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  JElearningTquizModule {}
