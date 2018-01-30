import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
} from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { DoctorService } from "../../services/doctor";
import { Doctor } from "../../services/interface";
/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: "explore",
    segment: "explore"
})
@Component({
    selector: "page-explore",
    templateUrl: "explore.html"
})
export class ExplorePage {
    public map: GoogleMap;
    public doctors: Doctor[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public googleMaps: GoogleMaps,
        public geolocation: Geolocation,
        public doctorService: DoctorService
    ) {}

    ionViewDidLoad() {
        this.loadMap();
    }
    async loadMap() {
        const resp = await this.geolocation.getCurrentPosition();
        let mapOptions: GoogleMapOptions = {
            controls: {
                compass: true,
                myLocationButton: true,
                indoorPicker: true,
                zoom: true
            },
            camera: {
                target: {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude
                },
                zoom: 16,
                tilt: 30
            },
            gestures: {
                scroll: true,
                tilt: true,
                rotate: true,
                zoom: true
            }
        };
        this.doctors = await this.doctorService.getDoctorLocation(
            resp.coords.latitude,
            resp.coords.longitude
        );

        this.map = GoogleMaps.create("map_canvas", mapOptions);
        // Wait the MAP_READY before using any methods.
        await this.map.one(GoogleMapsEvent.MAP_READY);
        // Now you can use all methods safely.
        this.doctors.forEach(doctor => {
            this.map
                .addMarker({
                    doctorId: doctor.id,
                    title: doctor.displayName,
                    icon: "blue",
                    animation: "DROP",
                    position: {
                        lat: doctor.google_lat,
                        lng: doctor.google_lng
                    }
                })
                .then(marker => {
                    console.log(marker);
                    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(data => {
                        //Your code for navigation.
                        console.log(data);
                        let doctorId = data[1].get("doctorId");
                        console.log(doctorId);
                        this.navCtrl.push("doctor-detail", {
                            id: doctorId
                        });
                    });
                });
        });
    }
}
