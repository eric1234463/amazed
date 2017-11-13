import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user';
import { TabsPage } from '../tabs/tabs'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
    name: 'login',
    segment: 'login'
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
    }

    googleLogin() {
        this.userService.googleLogin().then(success => {
            this.navCtrl.push(TabsPage);
        });
    }

}
