import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorDetailPage } from './doctor-detail';
import { IonicImageLoader } from "ionic-image-loader";
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    DoctorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorDetailPage),
    IonicImageLoader,
    MomentModule
  ],
})
export class DoctorDetailPageModule {}
