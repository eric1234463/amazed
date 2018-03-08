import { Component } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation";
import {
    GoogleMap,
    GoogleMapOptions,
    GoogleMaps,
    GoogleMapsEvent
} from "@ionic-native/google-maps";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
    public content = 'Find Insurance';
    constructor(

    ) {}

    ionViewDidLoad() {

    }

}
