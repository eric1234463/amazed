import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ComponentModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        ComponentModule
    ],
})
export class ProfileModule { }
