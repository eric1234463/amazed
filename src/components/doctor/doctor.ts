import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor';
import { Doctor } from '../../services/interface';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { LoadingController } from 'ionic-angular';

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
    this.imageLoaderConfig.setHeight('100%');
    this.doctors = await this.doctorService.getDoctors();
    loading.dismiss();
  }
}
