import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InsuranceSearch } from '../../services/interface';

/**
 * Generated class for the InsuranceModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'insurance_modal',
  segment: 'insurance_modal'
})
@Component({
  selector: 'page-insurance-modal',
  templateUrl: 'insurance-modal.html'
})
export class InsuranceModalPage {
  public searchPayload: InsuranceSearch;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.searchPayload = this.navParams.get('searchPayload');
  }

  search() {
    this.viewCtrl.dismiss(this.searchPayload);
  }
}
