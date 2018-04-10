import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user';
import { PatientMedicine } from '../../services/interface';

/**
 * Generated class for the PatientMedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'patient-medicine',
  name: 'patient-medicine'
})
@Component({
  selector: 'page-patient-medicine',
  templateUrl: 'patient-medicine.html'
})
export class PatientMedicinePage {
  public patientMedicines: PatientMedicine[];
  public remove = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public loadingCtrl: LoadingController,
  ) {}

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.patientMedicines = await this.userService.getPatientMedicines();
    loading.dismiss();
  }

  async removeMedicine(medicine) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    try {
      const result = await this.userService.removePatientMedicine(medicine.id);
      if (result) {
        this.patientMedicines = await this.userService.getPatientMedicines();
      }
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();

    }
  }

  editMode() {
    this.remove = this.remove ? false : true;
  }
}
