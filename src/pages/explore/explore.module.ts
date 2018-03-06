import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorePage } from './explore';
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ExplorePage,
  ],
  imports: [
    IonicPageModule.forChild(ExplorePage),
    ComponentModule
  ]
})
export class ExplorePageModule {}
