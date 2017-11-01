import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular';
import {UserService, User} from '../../services/user';
import {EditPage} from './editProfile/edit';
@IonicPage({
	name: 'profile',
	segment: 'profile'
})
@Component({selector: 'page-profile', templateUrl: 'profile.html'})
export class ProfilePage {
    public user:User
    constructor(public navCtrl : NavController,public userService:UserService) {
        
        this.user = this.userService.currentUser;
        console.log(this.user);
    }

    edit(){
        this.navCtrl.push(EditPage);
    }

}
