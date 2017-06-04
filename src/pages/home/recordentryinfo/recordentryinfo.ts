import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({selector: 'page-record-entry-info', templateUrl: 'recordentryinfo.html'})
export class RecordEntryInfoPage {
  public record : Object;
  constructor(public navCtrl : NavController, public navParams : NavParams) {
    this.record = this
      .navParams
      .get('record');
  }

}
