import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FeedPage } from './feed/feed';
import { HealthPage } from './health/health';
import { InsurancePage } from './insurance/insurance';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { IonicImageLoader } from "ionic-image-loader";
import { MomentModule } from 'angular2-moment';
import { ChartsModule } from "ng2-charts";
import { UserService } from "../services/user";
import { FeedService } from "../services/feed";
import { InsuranceService } from "../services/insurance";
import { DoctorComponent } from './doctor/doctor';
import { BookingComponent } from './booking/booking';

@NgModule({
  declarations: [
    FeedPage,
    HealthPage,
    ProgressBarComponent,
    InsurancePage,
    DoctorComponent,
    BookingComponent
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
    InsurancePage,
    ProgressBarComponent,
    DoctorComponent,
    BookingComponent
  ],
  providers: [
    FeedService,
    UserService,
    InsuranceService
  ]
})
export class ComponentModule {}
