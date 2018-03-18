import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { InsuranceService } from '../../services/insurance';
import { InsurancePlan, InsuranceSearch } from '../../services/interface';

@Component({
  selector: 'page-insurance',
  templateUrl: 'insurance.html'
})
export class InsurancePage implements OnInit {
  public insurancePlans: InsurancePlan[];
  public searchPayload: InsuranceSearch;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public insuranceService: InsuranceService,
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.searchPayload = {
      provider: null,
      surgery_cover: null,
      daliy_cover: null
    };
  }

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

  showSearchModal() {
    let searchModal = this.modalCtrl.create('insurance_modal', {
      searchPayload: this.searchPayload
    });
    searchModal.onDidDismiss((searchPayload: InsuranceSearch) => {
      if (!!searchPayload) {
        this.searchPayload = searchPayload;
        this.performSearch(searchPayload);
      }
    });
    searchModal.present();
  }

  async performSearch(search: InsuranceSearch) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.insurancePlans = await this.insuranceService.searchInsurancePlans(search);
    loading.dismiss();
  }
}