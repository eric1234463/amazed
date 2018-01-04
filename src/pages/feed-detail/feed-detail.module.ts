import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedDetailPage } from './feed-detail';
import { MomentModule } from 'angular2-moment';
import { DocModule } from '../../pipes/doc/doc.module'
@NgModule({
  declarations: [
    FeedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedDetailPage),
    MomentModule,
    DocModule
  ],
})
export class FeedDetailPageModule {}