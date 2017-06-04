import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecordEntryInfoPage} from './recordentryinfo/recordentryinfo';
import {UserService, User} from '../../services/user';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
    public user : User;
    constructor(public navCtrl : NavController, public userService : UserService) {
        this.user = this.userService.currentUser;

    }

    recordEntryInfoClick() {
        this
            .navCtrl
            .push(RecordEntryInfoPage, {record: this.user.record});
    }

}
