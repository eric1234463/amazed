import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {UserService} from '../../services/user';

@IonicPage({
	name: 'qr',
	segment: 'qr'
})
@Component({templateUrl: 'qr.html'})
export class GeneratrorPage {
	public user: String;

	constructor(public navCtrl: NavController, public userService: UserService) {
		this.user = "" + JSON.stringify(this.userService.currentUser);
		console.log(this.user);
	}
}
