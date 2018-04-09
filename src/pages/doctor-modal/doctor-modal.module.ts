import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorModalPage } from './doctor-modal';

@NgModule({
  declarations: [
    DoctorModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorModalPage),
  ],
})
export class DoctorModalPageModule {}
