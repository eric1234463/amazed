import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RecordService } from '../../services/record';
import { Socket } from 'ng-socket-io';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Patient, Doctor } from '../../services/interface';
import { DoctorService } from '../../services/doctor';
import {
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsEvent
} from '@ionic-native/google-maps';

@IonicPage({
  name: 'qr',
  segment: 'qr'
})
@Component({ templateUrl: 'qr.html', selector: 'page-qr' })
export class GeneratrorPage {
  public doctorID: string;
  public connected = false;
  public loading: Loading;
  public patient: Patient;
  public doctor: Doctor;
  public map: GoogleMap;
  constructor(
    public navCtrl: NavController,
    public socket: Socket,
    public userService: UserService,
    public barcodeScanner: BarcodeScanner,
    public recordService: RecordService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public googleMaps: GoogleMaps,
    public doctorService: DoctorService
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
      this.doctor = await this.doctorService.getDoctor(this.doctorID);
      this.loadMap(this.doctor);
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

  async loadMap(doctor: Doctor) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: doctor.google_lat,
          lng: doctor.google_lng
        },
        zoom: 16,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    await this.map.one(GoogleMapsEvent.MAP_READY);
    this.map.addMarker({
      icon: {
        url: 'assets/map-marker.png',
        size: {
          width: 40,
          height: 40
        }
      },
      animation: 'DROP',
      position: {
        lat: doctor.google_lat,
        lng: doctor.google_lng
      }
    });
  }

  cancel() {
    this.socket.emit('cancel connection', {
      room: this.doctorID
    });
    this.connected = false;
  }
}
