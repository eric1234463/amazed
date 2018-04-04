import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import moment, { months } from 'moment';
import { Doctor } from '../../services/interface';
import { RecordService } from '../../services/record';

/**
 * Generated class for the BookingModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'booking-modal',
  segment: 'booking-modal'
})
@Component({
  selector: 'page-booking-modal',
  templateUrl: 'booking-modal.html'
})
export class BookingModalPage {
  public doctor: Doctor;
  public appointmentTime: string;
  public appointmentDate: string;
  public timeslots: Date[];
  public dates: Date[];
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public recordService: RecordService
  ) {
    this.doctor = this.navParams.get('doctor');
    this.timeslots = this.generateTimeSlot(this.doctor.open_time, this.doctor.close_time);
    this.dates = this.getDates();
  }

  generateTimeSlot(start: Date, end: Date): Date[] {
    let timeArray = [];
    const start_moment = moment(start, 'HH:mm A');
    const end_moment = moment(end, 'HH:mm A');
    let current = start_moment;
    while (current <= end_moment) {
      timeArray.push(current.format('HH:mm a'));
      current = current.add(30, 'minutes');
    }
    return timeArray;
  }

  getDates() {
    let dateArray = [];
    let current = moment();
    let end_moment = moment().add(7, 'days');
    while (current <= end_moment) {
      dateArray.push(current.format('YYYY-MM-DD'));
      current = current.add(1, 'days');
    }
    return dateArray;
  }

  async booking() {
    try {
      const booking = await this.recordService.createBooking(this.doctor.id, this.appointmentTime, this.appointmentDate);
      if (booking) {
        this.viewCtrl.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
