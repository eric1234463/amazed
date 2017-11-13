import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneratrorPage } from './qr';

@NgModule({
    declarations: [
        GeneratrorPage,
    ],
    imports: [
        IonicPageModule.forChild(GeneratrorPage),
    ],
})
export class QrPageModule { }
