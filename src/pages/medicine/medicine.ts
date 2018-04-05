import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user';
import { PatientMedicine } from '../../services/interface';

/**
 * Generated class for the MedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'medicine/:id',
  name: 'medicine-detail'
})
@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html'
})
export class MedicinePage {
  public patientMedicine: PatientMedicine;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public loadingCtrl: LoadingController
  ) {}

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    const id = this.navParams.get('id');
    this.patientMedicine = await this.userService.getPatientMedicine(id);
    loading.dismiss();
  }

  async ban() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    const id = this.navParams.get('id');
    try {
      const patientMedicine = await this.userService.createPatientMedicine(id);
      this.patientMedicine = await this.userService.getPatientMedicine(id);
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }
}
