import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalkDetailPage } from './walk-detail';
import { MomentModule } from 'angular2-moment';
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WalkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WalkDetailPage),
    MomentModule,
    ComponentModule
  ],
})
export class WalkDetailPageModule {}
