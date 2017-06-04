import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService, User} from '../../services/user';
import {EditPage} from './editProfile/edit';

@Component({selector: 'page-contact', templateUrl: 'profile.html'})
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
