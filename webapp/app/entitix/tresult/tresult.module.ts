import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import {  JElearningSharedModule } from '../../shared';
import {  JElearningAdminModule } from '../../admin/admin.module';
import {
    TresultResolve,
    TresultService,
    TresultPopupService,
    TresultComponent,
    TresultDetailComponent,
    TresultDialogComponent,
    TresultPopupComponent,
    TresultDeletePopupComponent,
    TresultDeleteDialogComponent,
    tresultRoute,
    tresultPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tresultRoute,
    ...tresultPopupRoute,
];

@NgModule({
    imports: [
         JElearningSharedModule,
         JElearningAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TresultComponent,
        TresultDetailComponent,
        TresultDialogComponent,
        TresultDeleteDialogComponent,
        TresultPopupComponent,
        TresultDeletePopupComponent,
    ],
    entryComponents: [
        TresultComponent,
        TresultDialogComponent,
        TresultPopupComponent,
        TresultDeleteDialogComponent,
        TresultDeletePopupComponent,
    ],
    providers: [
        TresultService,
        TresultPopupService,
        UserRouteAccessService,
        TresultResolve
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  JElearningTresultModule {}
