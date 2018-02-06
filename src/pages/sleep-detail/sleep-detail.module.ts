import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SleepDetailPage } from './sleep-detail';
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    SleepDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SleepDetailPage),
    ChartsModule
  ],
})
export class SleepDetailPageModule {}
