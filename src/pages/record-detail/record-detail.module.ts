import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordDetailPage } from './record-detail';
import { MomentModule } from 'angular2-moment';
@NgModule({
    declarations: [
        RecordDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(RecordDetailPage),
        MomentModule,
    ],
})
export class RecordDetailModule { }
