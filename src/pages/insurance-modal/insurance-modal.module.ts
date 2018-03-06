import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsuranceModalPage } from './insurance-modal';

@NgModule({
  declarations: [
    InsuranceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(InsuranceModalPage),
  ],
})
export class InsuranceModalPageModule {}
