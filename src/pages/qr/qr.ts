import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {QRCodeComponent} from 'angular2-qrcode';
import {UserService, User} from '../../services/user';

@Component({ templateUrl: 'qr.html'})
export class GeneratrorPage {
    public user:String
    constructor(public navCtrl : NavController,public userService:UserService) {
        this.user = "" + this.userService.currentUser;
        console.log(this.user);
    }
}
