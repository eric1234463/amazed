import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordDetailPage } from './record-detail';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MomentModule } from 'angular2-moment';
import { DocModule } from '../../../pipes/doc/doc.module';
@NgModule({
    declarations: [
        RecordDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(RecordDetailPage),
        Ionic2RatingModule,
        MomentModule,
        DocModule
    ],
})
export class RecordDetailModule { }
