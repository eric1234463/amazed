import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedDetailPage } from './feed-detail';
import { MomentModule } from 'angular2-moment';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    FeedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedDetailPage),
    MomentModule,
    IonicImageLoader
  ],
})
export class FeedDetailPageModule {}
