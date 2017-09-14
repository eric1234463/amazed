import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecordEntryInfoPage} from './recordentryinfo/recordentryinfo';
import {UserService, User} from '../../services/user';
import { AngularFireDatabase ,FirebaseListObservable } from 'angularfire2/database';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
    public records : FirebaseListObservable<any[]>;
    constructor(public navCtrl : NavController, public userService : UserService, public db: AngularFireDatabase) {
		this.records = this.db.list('/patient/-KtuIItlzBQgI3GrJnG3/records');
    }

    recordEntryInfoClick() {

    }

}
