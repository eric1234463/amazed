import { Component, OnInit } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { UserService } from "../../services/user";
import { Patient } from "../../services/interface";

@IonicPage({
    name: "profile-edit",
    segment: "profile/edit"
})
@Component({
    selector: "page-profile-edit",
    templateUrl: "profile-edit.html"
})
export class ProfileEditPage implements OnInit {
    public user: Patient;

    constructor(
        public navCtrl: NavController,
        public userService: UserService
    ) {}

    async ngOnInit() {
        this.user = await this.userService.getUser();
    }

    async onViewWillEnter() {
        this.user = await this.userService.getUser();
    }
    save() {
        console.log(this.user);
        this.userService.updateUserData(this.user);
        this.navCtrl.pop();
    }
}
