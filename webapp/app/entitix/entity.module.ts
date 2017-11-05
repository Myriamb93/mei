import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {  JElearningTquizModule } from './tquiz/tquiz.module';
import {  JElearningTquestionModule } from './tquestion/tquestion.module';
import {  JElearningTresultModule } from './tresult/tresult.module';
import {  JElearningTreponseModule } from './treponse/treponse.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
         JElearningTquizModule,
         JElearningTquestionModule,
         JElearningTresultModule,
         JElearningTreponseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  JElearningEntitixModule {}
