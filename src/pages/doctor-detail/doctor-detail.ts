import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DoctorService } from "../../services/doctor";
import { Doctor } from "../../services/interface";
/**
 * Generated class for the DoctorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: "doctor-detail",
    segment: "doctor/:id"
})
@Component({
    selector: "page-doctor-detail",
    templateUrl: "doctor-detail.html"
})
export class DoctorDetailPage implements OnInit {
    public doctor: Doctor;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public doctorService: DoctorService
    ) {}
    async ngOnInit() {
        const id = this.navParams.get("id");
        this.doctor = await this.doctorService.getDoctor(id);
    }
}
