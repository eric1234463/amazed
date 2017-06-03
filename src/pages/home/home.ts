import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecordEntryInfoPage } from './recordentryinfo/recordentryinfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  recordEntryInfoClick(){
    this.navCtrl.push(RecordEntryInfoPage, {});
  }

}
