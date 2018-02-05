import { Component } from "@angular/core";
import { NavController, IonicPage, AlertController } from "ionic-angular";
import { UserService } from "../../services/user";
import { Patient } from "../../services/interface";
@IonicPage({
    name: "profile",
    segment: "profile"
})
@Component({ selector: "page-profile", templateUrl: "profile.html" })
export class ProfilePage {
    public user: Patient;
    public bmiProgress : number;
    constructor(
        public navCtrl: NavController,
        public userService: UserService,
        public alertCtrl: AlertController
    ) {}

    async ionViewDidLoad() {
      this.user = await this.userService.getUser();
      this.user.bmi = this.user.weight / Math.pow(this.user.height / 100, 2);
      this.bmiProgress = this.user.bmi / 40 * 100;
    }

    edit() {
        this.navCtrl.push("profile-edit");
    }
}
