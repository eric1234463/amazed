import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordPage } from './record';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MomentModule } from 'angular2-moment';
import { DocModule } from '../../pipes/doc/doc.module'
@NgModule({
    declarations: [
        RecordPage
    ],
    imports: [
        IonicPageModule.forChild(RecordPage),
        Ionic2RatingModule,
        MomentModule,
        DocModule
    ],
})
export class HomePageModule { }
