import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { UserService, Patient } from '../../services/user';
import { Observable } from 'rxjs/Observable';

@IonicPage({
    name: 'profile',
    segment: 'profile'
})
@Component({ selector: 'page-profile', templateUrl: 'profile.html' })
export class ProfilePage {
    public user: Patient;
    constructor(public navCtrl: NavController, public userService: UserService, public alertCtrl: AlertController) {
        this.userService.getUser().then(user => {
            this.user = user;
            this.user.bmi = user.weight / Math.pow(user.height / 100, 2);
        })
    }

    edit() {
        this.navCtrl.push('profile-edit');
    }
}
