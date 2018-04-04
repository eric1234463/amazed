import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsuranceDetailPage } from './insurance-detail';
import { IonicImageLoader } from "ionic-image-loader";

@NgModule({
  declarations: [
    InsuranceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InsuranceDetailPage),
    IonicImageLoader
  ],
})
export class InsuranceDetailPageModule {}
