import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'explore',
    segment: 'explore'
})
@Component({
    selector: 'page-explore',
    templateUrl: 'explore.html',
})
export class ExplorePage {
    public map: GoogleMap;
    constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps: GoogleMaps) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExplorePage');
        this.loadMap();
    }
    loadMap() {
        let mapOptions: GoogleMapOptions = {
            controls:{
                compass: true,
                myLocationButton: true,
                indoorPicker: true,
                zoom: true
            },
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            },
            gestures: {
                scroll: true,
                tilt: true,
                rotate: true,
                zoom: true
            },
        };

        this.map = this.googleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');

                // Now you can use all methods safely.
                this.map.addMarker({
                    title: 'Ionic',
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                        lat: 43.0741904,
                        lng: -89.3809802
                    }
                })
                    .then(marker => {
                        marker.on(GoogleMapsEvent.MARKER_CLICK)
                            .subscribe(() => {
                                alert('clicked');
                            });
                    });

            });
    }

}
