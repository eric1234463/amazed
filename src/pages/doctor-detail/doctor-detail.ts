import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Doctor } from '../../services/interface';
import { DoctorService } from '../../services/doctor';
import { ImageLoaderConfig } from 'ionic-image-loader';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
/**
 * Generated class for the DoctorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'doctor-detail',
  segment: 'doctor-detail/:id'
})
@Component({
  selector: 'page-doctor-detail',
  templateUrl: 'doctor-detail.html'
})
export class DoctorDetailPage {
  public map: GoogleMap;
  public id: string;
  public doctor: Doctor;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public doctorService: DoctorService,
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController,
    public platform: Platform
  ) {}

  async ionViewDidLoad() {
    this.id = this.navParams.get('id');

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setWidth('80px');
    this.imageLoaderConfig.setHeight('80px');
    this.doctor = await this.doctorService.getDoctor(this.id);
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.loadMap(this.doctor);
    }
    loading.dismiss();
  }

  loadMap(doctor: Doctor) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: doctor.google_lat,
          lng: doctor.google_lng
        },
        zoom: 14,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.addMarker({
        title: 'Ionic',
        icon: {
          url: 'assets/map-marker.png',
          size: {
            width: 27,
            height: 43
          }
        },
        animation: 'DROP',
        position: {
          lat: doctor.google_lat,
          lng: doctor.google_lng
        }
      });
    });
  }
}
