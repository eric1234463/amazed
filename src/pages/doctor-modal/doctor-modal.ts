import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { DoctorService } from '../../services/doctor';
import { District, SearchDoctor } from '../../services/interface';

/**
 * Generated class for the DoctorModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'doctor-modal',
  segment: 'doctor-modal'
})
@Component({
  selector: 'page-doctor-modal',
  templateUrl: 'doctor-modal.html'
})
export class DoctorModalPage {
  public districts: District[];
  public searchPayload: SearchDoctor;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public doctorService: DoctorService,
    public loadingCtrl: LoadingController
  ) {
    this.searchPayload = this.navParams.get('searchPayload');
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.districts = await this.doctorService.getDistricts();
    loading.dismiss();
  }

  search() {
    this.viewCtrl.dismiss(this.searchPayload);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
