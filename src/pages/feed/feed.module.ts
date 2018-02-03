import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FeedPage } from "./feed";
import { MomentModule } from "angular2-moment";
import { IonicImageLoader } from "ionic-image-loader";
import { ChartsModule } from "ng2-charts";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [FeedPage],
    imports: [
        IonicPageModule.forChild(FeedPage),
        MomentModule,
        IonicImageLoader,
        ComponentsModule,
        ChartsModule
    ]
})
export class FeedPageModule {}
