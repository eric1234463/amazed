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
        this.user = this.userService.getUser();
    }

    edit() {
        this.navCtrl.push('profile-edit');
    }
    logout() {
        let alert = this.alertCtrl.create({
            title: 'Confirm Logout',
            message: 'Do you want to logout this Account?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Logout',
                    handler: () => {
                        this.userService.logout();
                    }
                }
            ]

        });
        alert.present();
    }
}
