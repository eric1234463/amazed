import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor';
import { Doctor, SearchDoctor } from '../../services/interface';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { LoadingController, NavController, ModalController, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the DoctorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html'
})
export class DoctorComponent implements OnInit {
  public doctors: Doctor[];
  public searchPayload: SearchDoctor;
  public sortPayload: Array<any>;;
  constructor(
    public doctorService: DoctorService,
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.searchPayload = {
      district_id: null
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
    this.imageLoaderConfig.setWidth('80px');
    this.imageLoaderConfig.setHeight('80px');
    this.doctors = await this.doctorService.getDoctors();
    loading.dismiss();
  }

  goToDetail(doctor) {
    this.navCtrl.push('doctor-detail', {
      id: doctor.id
    });
  }

  showSearchModal() {
    let searchModal = this.modalCtrl.create('doctor-modal', {
      searchPayload: this.searchPayload
    });
    searchModal.onDidDismiss((searchPayload: SearchDoctor) => {
      if (!!searchPayload) {
        this.searchPayload = searchPayload;
        this.performSearch(this.searchPayload, this.sortPayload);
      }
    });
    searchModal.present();
  }

  async performSearch(search: SearchDoctor, sort) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.doctors = await this.doctorService.searchDoctors(search, sort);
    loading.dismiss();
  }

  async showSort() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort doctor',
      buttons: [
        {
          text: 'Sort By Location',
          handler: () => {
            this.sortPayload = ['district_id','DESC']
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
}
