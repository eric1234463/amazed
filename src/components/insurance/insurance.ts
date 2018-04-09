import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
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
  public sortPayload: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public insuranceService: InsuranceService,
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
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
        this.performSearch(searchPayload, this.sortPayload);
      }
    });
    searchModal.present();
  }

  showSort(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort insurance',
      buttons: [
        {
          text: 'Sort By Price - High',
          handler: () => {
            this.sortPayload = ['daliy_cover','DESC']
            this.performSearch(this.searchPayload, this.sortPayload);
          }
        },
        {
          text: 'Sort By Price - Low',
          handler: () => {
            this.sortPayload = ['daliy_cover','ASC']
            this.performSearch(this.searchPayload, this.sortPayload);
          }
        },
        {
          text: 'Sort By Company',
          handler: () => {
            this.sortPayload = ['name','ASC']
            this.performSearch(this.searchPayload, this.sortPayload);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  async performSearch(search: InsuranceSearch, sort) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.insurancePlans = await this.insuranceService.searchInsurancePlans(search, sort);
    loading.dismiss();
  }

  goToDetail(insurancePlan: InsurancePlan) {
    this.navCtrl.push('insurance-detail', {
      id: insurancePlan.id
    });
  }
}
