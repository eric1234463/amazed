import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientMedicinePage } from './patient-medicine';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    PatientMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientMedicinePage),
    MomentModule
  ],
})
export class PatientMedicinePageModule {}
