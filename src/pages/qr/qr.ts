import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RecordService } from '../../services/record';
import { Socket } from 'ng-socket-io';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Patient } from '../../services/interface';

@IonicPage({
  name: 'qr',
  segment: 'qr'
})
@Component({ templateUrl: 'qr.html' })
export class GeneratrorPage {
  public doctorID: String;
  public connected = false;
  public loading: Loading;
  public patient: Patient;
  constructor(
    public navCtrl: NavController,
    public socket: Socket,
    public userService: UserService,
    public barcodeScanner: BarcodeScanner,
    public recordService: RecordService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.userService.getUser().then(patient => {
      this.patient = patient;
    });
    this.socket.connect();
  }

  async qrScan() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    try {
      const barcodeData = await this.barcodeScanner.scan({
        formats: 'QR_CODE'
      });
      this.doctorID = barcodeData.text;
      loading.present();
      this.socket.emit('subscribe', barcodeData.text);
      this.socket.emit('connect doctor', {
        room: barcodeData.text,
        patient: this.patient.id
      });
      this.connected = true;
      loading.dismiss();
    } catch (e) {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Scanning Error',
        subTitle: 'Please try to scan again!',
        buttons: ['Understand']
      });
      alert.present();
    }
  }

  cancel() {
    this.socket.emit('cancel connection', {
      room: this.doctorID
    });
    this.connected = false;
  }
}
