import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { MomentModule } from 'angular2-moment';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    MomentModule,
    IonicImageLoader
  ],
})
export class FeedPageModule {}
