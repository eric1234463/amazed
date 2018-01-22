import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClockModalPage } from './clock-modal';

@NgModule({
  declarations: [
    ClockModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ClockModalPage),
  ],
})
export class ClockModalPageModule {}
