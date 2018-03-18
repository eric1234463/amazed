import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRPage } from './qr';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [
      QRPage,
    ],
    imports: [
        IonicPageModule.forChild(QRPage),
        MomentModule
    ],
})
export class QrPageModule { }
