import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { InsuranceService } from '../../services/insurance';
import { InsurancePlan } from '../../services/interface';

@Component({
  selector: 'page-insurance',
  templateUrl: 'insurance.html'
})

export class InsurancePage implements OnInit {
  public insurancePlans: InsurancePlan[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public insuranceService: InsuranceService,
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setHeight('70%');
    this.insurancePlans = await this.insuranceService.getInsurancePlans();
    loading.dismiss();
  }
}
