import { NgModule } from '@angular/core';
import { RateComponent } from './rate/rate';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
    declarations: [ProgressBarComponent],
    imports: [Ionic2RatingModule],
    exports: [ProgressBarComponent],
    entryComponents: []
})
export class ComponentsModule { }
