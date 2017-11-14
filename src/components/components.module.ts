import { NgModule } from '@angular/core';
import { RateComponent } from './rate/rate';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
    declarations: [RateComponent],
    imports: [Ionic2RatingModule],
    exports: [RateComponent],
    entryComponents: [RateComponent]
})
export class ComponentsModule { }
