import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {}

  async ionViewDidLoad() {
    this.patientMedicines = await this.userService.getPatientMedicines();
  }
}
