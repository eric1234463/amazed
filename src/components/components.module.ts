import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FeedPage } from './feed/feed';
import { HealthPage } from './health/health';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { IonicImageLoader } from "ionic-image-loader";
import { MomentModule } from 'angular2-moment';
import { ChartsModule } from "ng2-charts";
import { UserService } from "../services/user";
import { FeedService } from "../services/feed";

@NgModule({
  declarations: [
    FeedPage,
    HealthPage,
    ProgressBarComponent,
  ],
  imports: [
    IonicModule,
    IonicImageLoader.forRoot(),
    MomentModule,
    ChartsModule
  ],
  exports:[
    FeedPage,
    HealthPage,
    ProgressBarComponent,
  ],
  providers: [
    FeedService,
    UserService,
  ]
})
export class ComponentModule {}
