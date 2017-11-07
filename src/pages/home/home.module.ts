import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MomentModule } from 'angular2-moment';

@NgModule({
	declarations: [
		HomePage,
	],
	imports: [
		IonicPageModule.forChild(HomePage),
		Ionic2RatingModule,
	MomentModule,
	],
})
export class HomePageModule {}