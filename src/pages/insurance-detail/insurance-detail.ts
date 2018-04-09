import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { InsurancePlan } from '../../services/interface';
import { InsuranceService } from '../../services/insurance';

/**
 * Generated class for the InsuranceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'insurance-detail',
  segment: 'insurance/:id'
})
@Component({
  selector: 'page-insurance-detail',
  templateUrl: 'insurance-detail.html'
})
export class InsuranceDetailPage {
  public insurancePlan: InsurancePlan;
  constructor(
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public insuranceService: InsuranceService
  ) {
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setHeight('250px');
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    const id = this.navParams.get('id');
    this.insurancePlan = await this.insuranceService.getInsurancePlan(id);
    loading.dismiss();
  }
}
