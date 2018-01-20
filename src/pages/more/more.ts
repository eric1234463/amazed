import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, App } from 'ionic-angular';
import { UserService, Patient } from '../../services/user';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'more',
    segment: 'more'
})
@Component({
    selector: 'page-more',
    templateUrl: 'more.html',
})
export class MorePage {
    public user: Patient;
    constructor(public navCtrl: NavController, public userService: UserService, public alertCtrl: AlertController, public app: App) {
        this.userService.getUser().then(user => {
            this.user = user
        });
    }

    goToProfile() {
        this.navCtrl.push('profile');
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
                        this.app.getRootNav().setRoot('login');
                    }
                }
            ]

        });
        alert.present();
    }

}
