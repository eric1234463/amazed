import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { MomentModule } from 'angular2-moment';
import { DocModule } from '../../pipes/doc/doc.module'
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    DocModule,
    MomentModule,
    IonicImageLoader
  ],
})
export class FeedPageModule {}
