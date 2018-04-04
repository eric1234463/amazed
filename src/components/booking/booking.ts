import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../services/record';
import { PatientBooking } from '../../services/interface';
import { LoadingController, NavController } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';

/**
 * Generated class for the BookingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingComponent implements OnInit {
  public bookings: PatientBooking[];
  constructor(
    public recordService: RecordService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {

  }

  async ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.bookings = await this.recordService.getBookings();
    loading.dismiss();
  }

  goToDoctor(booking) {
    this.navCtrl.push('doctor-detail', {
      id: booking.Doctor.id
    });
  }
}
