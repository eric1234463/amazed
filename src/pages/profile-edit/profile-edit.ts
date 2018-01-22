import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UserService, Patient } from '../../services/user';

@IonicPage({
    name: 'profile-edit',
    segment: 'profile/edit'
})
@Component(
    {
        selector: 'page-profile-edit',
        templateUrl: 'profile-edit.html'
    }
)
export class ProfileEditPage {
    public user: Patient;

    constructor(public navCtrl: NavController, public userService: UserService) {

    }
    ionViewWillEnter(){
        console.log(this.user);
        this.userService.getUser().then(user => {
            this.user = user;
        })
    }
    save() {
        console.log(this.user);
        this.userService.updateUserData(this.user);
        this.navCtrl.pop();
    }

}
