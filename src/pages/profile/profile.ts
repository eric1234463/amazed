import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { UserService, User } from '../../services/user';
import { Observable } from 'rxjs/Observable';

@IonicPage({
    name: 'profile',
    segment: 'profile'
})
@Component({ selector: 'page-profile', templateUrl: 'profile.html' })
export class ProfilePage {
    public user: User;
    constructor(public navCtrl: NavController, public userService: UserService, public alertCtrl: AlertController) {
        this.userService.getUser().then(user => {
            this.user = user;
        })
    }

    edit() {
        this.navCtrl.push('profile-edit');
    }
}
