import { Component, OnInit } from "@angular/core";
import { NavController, IonicPage, AlertController } from "ionic-angular";
import { UserService } from "../../services/user";
import { Patient } from "../../services/interface";
@IonicPage({
    name: "profile",
    segment: "profile"
})
@Component({ selector: "page-profile", templateUrl: "profile.html" })
export class ProfilePage implements OnInit {
    public user: Patient;
    constructor(
        public navCtrl: NavController,
        public userService: UserService,
        public alertCtrl: AlertController
    ) {}
    async ngOnInit() {
        this.user = await this.userService.getUser();
        this.user.bmi = this.user.weight / Math.pow(this.user.height / 100, 2);
    }

    async onViewWillEnter() {
        this.user = await this.userService.getUser();
    }

    edit() {
        this.navCtrl.push("profile-edit");
    }
}
