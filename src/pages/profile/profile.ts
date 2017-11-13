import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UserService, User } from '../../services/user';
import { Observable } from 'rxjs/Observable';

@IonicPage({
    name: 'profile',
    segment: 'profile'
})
@Component({ selector: 'page-profile', templateUrl: 'profile.html' })
export class ProfilePage {
    public userDoc: Observable<User>;
    constructor(public navCtrl: NavController, public userService: UserService) {
        this.userDoc = this.userService.user
    }

    edit() {
        this.navCtrl.push('profile-edit');
    }
    logout() {
        this.userService.logout();
    }
}
