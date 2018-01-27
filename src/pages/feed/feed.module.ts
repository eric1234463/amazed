import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FeedPage } from "./feed";
import { MomentModule } from "angular2-moment";
import { IonicImageLoader } from "ionic-image-loader";
import { ChartsModule } from "ng2-charts";
import { NgCircleProgressModule } from "ng-circle-progress";

@NgModule({
    declarations: [FeedPage],
    imports: [
        IonicPageModule.forChild(FeedPage),
        MomentModule,
        IonicImageLoader,
        NgCircleProgressModule.forRoot({
            subtitle: "",
            units: "Step",
            outerStrokeWidth: 10,
            innerStrokeWidth: 5,
            outerStrokeColor: "#64b5f6",
            innerStrokeColor: "#01579B",
            showBackground: false
        }),
        ChartsModule
    ]
})
export class FeedPageModule {}
