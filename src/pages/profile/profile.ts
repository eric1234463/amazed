import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular';
import {UserService, User} from '../../services/user';
@IonicPage({
	name: 'profile',
	segment: 'profile'
})
@Component({selector: 'page-profile', templateUrl: 'profile.html'})
export class ProfilePage {
    public user:User;
    constructor(public navCtrl : NavController,public userService:UserService) {

	    this.user = this.userService.currentUser;

    }

    edit(){
        this.navCtrl.push('profile-edit');
    }

}
