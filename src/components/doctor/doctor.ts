import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor';
import { Doctor } from '../../services/interface';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { LoadingController, NavController } from 'ionic-angular';

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
  doctors: Doctor[];
  constructor(
    public doctorService: DoctorService,
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {}

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
}
