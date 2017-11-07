import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {UserService, User} from '../../../services/user';

@IonicPage({
	name: 'profile-edit',
	segment: 'profile/edit'
})
@Component(
	{
		selector: 'page-edit',
		templateUrl: 'edit.html'
	}
)
export class EditPage {
	public user: User;

	constructor(public navCtrl: NavController, public userService: UserService) {
		this.user = this.userService.currentUser;
	}

	cancel() {
		this.navCtrl.pop();
	}

	save() {
		this.userService.setUser(this.user);
		this.navCtrl.pop();
	}

}
