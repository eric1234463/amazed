import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRPage } from './qr';

@NgModule({
    declarations: [
      QRPage,
    ],
    imports: [
        IonicPageModule.forChild(QRPage),
    ],
})
export class QrPageModule { }
